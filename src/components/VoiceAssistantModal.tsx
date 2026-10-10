import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Send, Sparkles, X, 
  MessageSquare, Radio, BookOpen, Heart, RefreshCw, AlertCircle
} from 'lucide-react';
import { ChatMessage } from '../types.ts';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Convert Float32 audio samples to 16-bit PCM Base64 string
function floatTo16BitPCM(input: Float32Array): string {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  let binary = '';
  const bytes = new Uint8Array(output.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'khadim',
      text: 'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Sugeng rawuh wonten Portal Haul Akbar Desa Bangeran Lebak. Kula Khadim Haul, siap mbiyantu panjenengan babagan sejarah leluhur, bacaan tahlil & donga arwah, adab ziarah, ugi agenda berkah silaturahmi punika. Monggo kersa nyuwun pirsa utawi ngobrol langsung kaliyan swanten.',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [audioMuted, setAudioMuted] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript]);

  // Connect WebSocket when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopRecording();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/live`;
    
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Voice WS connection opened');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'status') {
            console.log('WS status:', data);
          } else if (data.type === 'text') {
            setLiveTranscript(prev => prev + data.text);
            setIsSpeaking(true);
          } else if (data.type === 'audio' && data.audio && !audioMuted) {
            playRawPcmChunk(data.audio);
            setIsSpeaking(true);
          } else if (data.type === 'interrupted') {
            stopAllAudioPlayback();
            setIsSpeaking(false);
          }
        } catch (e) {
          console.error('Error parsing WS message:', e);
        }
      };

      ws.onerror = (err) => {
        console.warn('WS error (falling back to REST mode):', err);
      };

      ws.onclose = () => {
        console.log('Voice WS connection closed');
        setIsConnected(false);
      };
    } catch (e) {
      console.warn('Could not establish WS connection:', e);
    }

    return () => {
      stopRecording();
      stopAllAudioPlayback();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isOpen]);

  // Stop queued audio playback
  const stopAllAudioPlayback = () => {
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch (e) { /* ignore */ }
    });
    audioQueueRef.current = [];
    setIsSpeaking(false);
  };

  // Play PCM 24kHz audio from Gemini Live
  const playRawPcmChunk = (base64Audio: string) => {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000
        });
      }
      const ctx = outputAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const binary = atob(base64Audio);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
        if (audioQueueRef.current.length === 0) {
          setIsSpeaking(false);
        }
      };

      audioQueueRef.current.push(source);
      source.start();
      setIsSpeaking(true);
    } catch (e) {
      console.error('Audio chunk playback error:', e);
    }
  };

  // Play WAV base64 from TTS
  const playWavAudio = (base64Wav: string) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Wav}`);
      setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      audio.play().catch(e => console.error('Audio play error:', e));
    } catch (e) {
      console.error('Play WAV error:', e);
      setIsSpeaking(false);
    }
  };

  // Start Mic Recording
  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      mediaStreamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });
      inputAudioCtxRef.current = inputCtx;
      if (inputCtx.state === 'suspended') {
        await inputCtx.resume();
      }

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = processor;

      source.connect(processor);
      processor.connect(inputCtx.destination);

      processor.onaudioprocess = (e) => {
        if (!isRecording) return;
        const channelData = e.inputBuffer.getChannelData(0);
        const pcmBase64 = floatTo16BitPCM(channelData);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'audio',
            audio: pcmBase64
          }));
        }
      };

      setIsRecording(true);
    } catch (err: any) {
      console.error('Mic access error:', err);
      setMicError('Izin mikrofon belum diberikan atau tidak didukung di peramban ini. Anda tetap dapat berdialog melalui teks di bawah.');
      setIsRecording(false);
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
    setIsRecording(false);
    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) { /* ignore */ }
      scriptProcessorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      try {
        inputAudioCtxRef.current.close();
      } catch (e) { /* ignore */ }
      inputAudioCtxRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Toggle Recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Send Text Message
  const handleSendText = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Baru saja'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    // If WS is open and live session is active, also notify live WS
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({
          type: 'text',
          text: text.trim()
        }));
      } catch (e) {
        // ignore
      }
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-5).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await response.json();
      const replyText = data.reply || data.fallbackReply || 'Alhamdulillah, mugi keberkahan lumintu dumateng kita sedoyo.';

      const khadimMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'khadim',
        text: replyText,
        timestamp: 'Baru saja'
      };

      setMessages(prev => [...prev, khadimMsg]);

      // Speak answer using TTS if not muted
      if (!audioMuted) {
        try {
          const ttsRes = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: replyText.slice(0, 320),
              voiceName: 'Zephyr'
            })
          });
          if (ttsRes.ok) {
            const ttsData = await ttsRes.json();
            if (ttsData.audio) {
              playWavAudio(ttsData.audio);
            }
          }
        } catch (ttsErr) {
          console.warn('TTS fetch failed:', ttsErr);
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        id: 'msg-' + Date.now(),
        sender: 'khadim',
        text: 'Nyuwun sewu, jaringan radi kendala. Nanging doa panjenengan kagem leluhur Desa Bangeran Lebak insyaAllah tansah katampi dening Gusti Allah SWT.',
        timestamp: 'Baru saja'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = async (text: string) => {
    try {
      setIsSpeaking(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 320),
          voiceName: 'Zephyr'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          playWavAudio(data.audio);
        }
      }
    } catch (e) {
      console.error('Failed to speak text:', e);
      setIsSpeaking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091f16] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-emerald-50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-800/40 bg-[#071911]">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-emerald-900/60 border border-amber-400/40 text-amber-300">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-bold text-amber-200 tracking-wide">
                  Khadim Haul Virtual
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40">
                  <Radio className={`w-2.5 h-2.5 ${isConnected ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
                  Live API 3.8
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 font-sans">
                Dialog Suara & Tuntunan Spiritual Desa Bangeran Lebak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              title={audioMuted ? "Bunyikan Suara" : "Bisukan Suara"}
              className="p-2 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-700/40 text-amber-300/90 transition-colors"
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-700/40 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Speaking / Audio Status Banner */}
        <div className="px-5 py-2.5 bg-emerald-950/60 border-b border-emerald-800/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            {isRecording ? (
              <span className="flex items-center gap-1.5 text-red-400 font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Mendengarkan suara panjenengan (Mic aktif)...
              </span>
            ) : isSpeaking ? (
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Khadim sedang bertutur & melantunkan jawaban...
              </span>
            ) : isLoading ? (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                Merenungkan doa & jawaban...
              </span>
            ) : (
              <span className="text-emerald-400/80">
                Klik tombol mikrofon untuk bicara langsung atau ketik pertanyaan di bawah.
              </span>
            )}
          </div>
          {isSpeaking && (
            <button
              onClick={stopAllAudioPlayback}
              className="px-2 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 text-xs border border-amber-400/30"
            >
              Hentikan Suara
            </button>
          )}
        </div>

        {micError && (
          <div className="mx-4 mt-3 p-3 bg-red-950/70 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{micError}</span>
          </div>
        )}

        {/* Chat History & Transcripts */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[11px] text-emerald-400/60 mb-1 px-1 font-sans">
                {msg.sender === 'user' ? 'Panjenengan' : 'Khadim Haul Bangeran Lebak'}
              </div>
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-600/30 border border-amber-500/40 text-amber-100 rounded-tr-none'
                    : 'bg-emerald-900/50 border border-emerald-700/40 text-emerald-100 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.sender === 'khadim' && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-700/30 flex items-center justify-between text-xs text-emerald-400/70">
                    <button
                      onClick={() => speakMessage(msg.text)}
                      className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
                      title="Dengarkan lantunan suara"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dengarkan Suara</span>
                    </button>
                    <span className="text-[10px] text-emerald-500">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Live partial stream transcript if any */}
          {liveTranscript && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="text-[11px] text-amber-400/70 mb-1 px-1">Khadim Haul (Langsung)</div>
              <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-emerald-900/40 border border-amber-500/30 text-amber-200">
                {liveTranscript}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-emerald-950/40 border-t border-emerald-800/30 overflow-x-auto flex gap-2 no-scrollbar text-xs">
          <button
            onClick={() => handleSendText('Ceritakan sejarah babat alas Desa Bangeran Lebak dan Kyai Ageng Bangeran.')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/40 text-emerald-200 hover:text-amber-300 transition-all"
          >
            📜 Sejarah Babat Alas
          </button>
          <button
            onClick={() => handleSendText('Apa saja adab ziarah kubur yang diajarkan para sesepuh Bangeran Lebak?')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/40 text-emerald-200 hover:text-amber-300 transition-all"
          >
            🕌 Adab Ziarah Kubur
          </button>
          <button
            onClick={() => handleSendText('Mohon lantunkan doa arwah singkat untuk kedua orang tua kami yang telah berpulang.')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/40 text-emerald-200 hover:text-amber-300 transition-all"
          >
            🤲 Doa Arwah Orang Tua
          </button>
          <button
            onClick={() => handleSendText('Apa makna tradisi 2.000 nasi ambeng berkat di Haul Akbar Desa?')}
            className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/40 text-emerald-200 hover:text-amber-300 transition-all"
          >
            🍱 Makna Ambeng Berkat
          </button>
        </div>

        {/* Interactive Voice & Text Input Bar */}
        <div className="p-4 bg-[#071911] border-t border-emerald-800/40">
          <div className="flex items-center gap-2">
            {/* Big Live Voice Mic Button */}
            <button
              onClick={toggleRecording}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all shrink-0 ${
                isRecording
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/50 scale-105 animate-pulse'
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 text-emerald-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
              }`}
              title={isRecording ? "Klik untuk mengakhiri rekaman suara" : "Klik untuk bicara langsung dengan Khadim Haul"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 font-bold" />}
              {isRecording && (
                <span className="absolute -inset-1 rounded-full border-2 border-red-400 animate-ping"></span>
              )}
            </button>

            {/* Input field */}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendText();
                }}
                placeholder={isRecording ? "Mendengarkan suara panjenengan..." : "Tulis pertanyaan, silsilah, atau doa arwah..."}
                disabled={isRecording}
                className="w-full px-4 py-3 bg-emerald-950/70 border border-emerald-700/50 rounded-xl text-sm text-emerald-100 placeholder-emerald-400/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Send button */}
            <button
              onClick={() => handleSendText()}
              disabled={!inputText.trim() || isLoading}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-800 text-amber-300 border border-emerald-600/40 transition-colors shrink-0"
              title="Kirim pesan"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <span className="text-[11px] text-emerald-400/60 font-sans">
              Didukung model cerdas Gemini 3.8 Live & Flash dengan adab kesantunan santri
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
