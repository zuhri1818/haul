import React, { useState } from 'react';
import { 
  BookOpen, Volume2, Copy, Check, Type, 
  Sparkles, Eye, EyeOff, Mic, Share2 
} from 'lucide-react';
import { TAHLIL_DATA } from '../data/haulData.ts';
import { TahlilItem } from '../types.ts';

interface KitabTahlilSectionProps {
  onAskKhadimAbout: (topic: string) => void;
}

export const KitabTahlilSection: React.FC<KitabTahlilSectionProps> = ({
  onAskKhadimAbout,
}) => {
  const [arabicSize, setArabicSize] = useState<'text-xl' | 'text-2xl' | 'text-3xl'>('text-2xl');
  const [showLatin, setShowLatin] = useState(true);
  const [showArti, setShowArti] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const currentAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleCopy = (item: TahlilItem) => {
    const fullText = `${item.judul}\n\n${item.arab}\n\n${item.latin}\n\nArtinya:\n${item.arti}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePlayAudio = async (item: TahlilItem) => {
    if (playingId === item.id) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      setPlayingId(null);
      return;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    setPlayingId(item.id);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: item.latin.slice(0, 300),
          voiceName: 'Zephyr'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
          currentAudioRef.current = audio;
          audio.onended = () => setPlayingId(null);
          audio.onerror = () => setPlayingId(null);
          audio.play();
        } else {
          setPlayingId(null);
        }
      } else {
        setPlayingId(null);
      }
    } catch (e) {
      console.error('Audio recitation error:', e);
      setPlayingId(null);
    }
  };

  return (
    <section id="tahlil" className="py-20 bg-[#071911] border-t border-emerald-900/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Kitab Tahlil & Doa Arwah Digital</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Panduan Tahlil & Doa Haul Akbar <br />
            <span className="text-gold-gradient">Desa Bangeran Lebak</span>
          </h2>
          <p className="mt-3 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Lengkap dengan Tawassul khusus cikal bakal Desa Bangeran Lebak, dzikir tahlil, serta doa arwah jama'ah agar memudahkan peziarah membaca bersama.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          
          {/* Arabic Font Size Picker */}
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <Type className="w-4 h-4 text-amber-400" />
            <span>Ukuran Tulisan Arab:</span>
            <div className="inline-flex rounded-lg bg-emerald-900/80 p-0.5 border border-emerald-700/50">
              <button
                onClick={() => setArabicSize('text-xl')}
                className={`px-2.5 py-1 rounded text-xs ${arabicSize === 'text-xl' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200'}`}
              >
                Kecil
              </button>
              <button
                onClick={() => setArabicSize('text-2xl')}
                className={`px-2.5 py-1 rounded text-xs ${arabicSize === 'text-2xl' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200'}`}
              >
                Sedang
              </button>
              <button
                onClick={() => setArabicSize('text-3xl')}
                className={`px-2.5 py-1 rounded text-xs ${arabicSize === 'text-3xl' ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-200'}`}
              >
                Besar
              </button>
            </div>
          </div>

          {/* Toggle Latin & Meaning */}
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowLatin(!showLatin)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showLatin
                  ? 'bg-emerald-900 border-amber-400/50 text-amber-200'
                  : 'bg-emerald-950 border-emerald-800 text-emerald-400'
              }`}
            >
              {showLatin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Latin</span>
            </button>

            <button
              onClick={() => setShowArti(!showArti)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showArti
                  ? 'bg-emerald-900 border-amber-400/50 text-amber-200'
                  : 'bg-emerald-950 border-emerald-800 text-emerald-400'
              }`}
            >
              {showArti ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Arti</span>
            </button>

            <button
              onClick={() => onAskKhadimAbout('Mohon bimbingan urutan membaca tahlil yang benar dan adabnya')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-emerald-950 font-medium transition-colors flex items-center gap-1"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Tanya Khadim</span>
            </button>
          </div>

        </div>

        {/* Tahlil Items Cards */}
        <div className="space-y-8">
          {TAHLIL_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/40 mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-amber-300">
                    {item.judul}
                  </h3>
                  {item.jumlahBacaan && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-[11px] font-semibold text-emerald-300 border border-emerald-700/50">
                      {item.jumlahBacaan}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayAudio(item)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                      playingId === item.id
                        ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold'
                        : 'bg-emerald-900/50 border-emerald-700 text-amber-300 hover:bg-emerald-800'
                    }`}
                    title={playingId === item.id ? "Hentikan lantunan" : "Dengarkan lantunan"}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {playingId === item.id ? 'Memutar...' : 'Suara'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-xl bg-emerald-900/50 border border-emerald-700 text-emerald-300 hover:text-amber-200 transition-colors"
                    title="Salin teks doa"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <div 
                dir="rtl"
                className={`font-arabic text-amber-100 leading-[2.5] tracking-wide mb-6 text-right whitespace-pre-line ${arabicSize}`}
              >
                {item.arab}
              </div>

              {/* Latin Text */}
              {showLatin && (
                <div className="mb-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 text-xs sm:text-sm text-emerald-300 leading-relaxed italic font-serif">
                  <span className="font-semibold text-amber-400 not-italic block mb-1 text-[11px] uppercase tracking-wider">
                    Transliterasi Latin:
                  </span>
                  <p className="whitespace-pre-line">{item.latin}</p>
                </div>
              )}

              {/* Meaning */}
              {showArti && (
                <div className="p-4 rounded-2xl bg-emerald-900/20 border border-emerald-800/30 text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-sans">
                  <span className="font-semibold text-amber-300 block mb-1 text-[11px] uppercase tracking-wider">
                    Terjemahan:
                  </span>
                  <p className="whitespace-pre-line">{item.arti}</p>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
