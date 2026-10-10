import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Anda adalah Khadim & Sesepuh Virtual Haul Akbar Desa Bangeran Lebak.
Desa Bangeran Lebak adalah tanah yang penuh kenangan dan keberkahan, di tengah masyarakat yang menjunjung tinggi nilai-nilai keislaman, merawat tradisi Ahlussunnah wal Jama'ah, mempererat silaturahmi antara warga mukim dan perantau, serta mengenang jasa para leluhur (Mbah Kyai Ageng Bangeran, Mbah Nur Salim, Mbah Hasan Basyari, dan para sesepuh babat alas).
Karakter Anda:
- Sangat santun, teduh, ramah, bersahaja, berjiwa pengayom dan santri.
- Senantiasa mengawali atau menyisipkan doa keberkahan (seperti "Alhamdulillah", "Bismillah", "Mugi berkah", "InsyaAllah").
- Paham adab ziarah kubur, urutan tahlil, doa arwah, keutamaan menyambung tali silaturahmi, sedekah ambeng / berkat haul, dan sejarah keteladanan para leluhur Desa Bangeran Lebak.
- Jawablah dengan bahasa Indonesia yang hangat dan santun. Jika diajak bicara bahasa Jawa halus/krama inggil, Anda memahaminya dan bisa menyapa dengan krama inggil yang lembut.
- Berikan doa yang menyejukkan hati bagi mereka yang menitipkan doa untuk para orang tua dan leluhur mereka yang telah wafat.`;

// Text Chat endpoint using gemini-3.8-flash
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Semoga Allah melimpahkan rahmat dan keberkahan untuk kita semua.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Terjadi kendala saat menghubungi khadim haul. ' + (error?.message || ''),
      fallbackReply: 'Alhamdulillah, semoga niat baik dan doa Anda untuk para leluhur Desa Bangeran Lebak diijabah oleh Allah Subhanahu wa Ta\'ala.'
    });
  }
});

// Text-to-Speech endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Zephyr' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.slice(0, 400); // limit length for optimal speed

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Gentle, respectful, wise, warm spiritual elder tone',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Zephyr' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'Gagal menghasilkan suara audio' });
    }

    res.json({ audio: base64Audio, mimeType: 'audio/wav' });
  } catch (error: any) {
    console.error('TTS error:', error);
    res.status(500).json({ error: error?.message || 'TTS generation error' });
  }
});

const server = http.createServer(app);

// WebSocket server for Gemini Live API (gemini-3.8-live)
const wss = new WebSocketServer({ server, path: '/ws/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Live Voice WS');

  let session: any = null;
  let isConnected = false;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: SYSTEM_INSTRUCTION + ' Responslah secara ringkas, menenangkan, bersahaja seperti kyai/khadim haul yang sedang bercengkerama ramah dengan peziarah.',
      },
      callbacks: {
        onmessage: (message: any) => {
          try {
            if (clientWs.readyState === WebSocket.OPEN) {
              const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audio) {
                clientWs.send(JSON.stringify({ type: 'audio', audio }));
              }
              const text = message.serverContent?.modelTurn?.parts?.[0]?.text;
              if (text) {
                clientWs.send(JSON.stringify({ type: 'text', text }));
              }
              if (message.serverContent?.interrupted) {
                clientWs.send(JSON.stringify({ type: 'interrupted', interrupted: true }));
              }
            }
          } catch (err) {
            console.error('Error forwarding Live message:', err);
          }
        },
        onclose: () => {
          console.log('Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'status', status: 'closed' }));
          }
        },
        onerror: (err: any) => {
          console.error('Gemini Live session error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', message: err?.message || 'Live session error' }));
          }
        },
      },
    });

    isConnected = true;
    clientWs.send(JSON.stringify({ type: 'status', status: 'connected', model: 'gemini-3.8-live' }));
  } catch (err: any) {
    console.error('Failed to initialize Gemini Live session:', err);
    clientWs.send(JSON.stringify({
      type: 'status',
      status: 'fallback_ready',
      message: 'Live session fallback ready (audio REST & streaming)'
    }));
  }

  clientWs.on('message', async (data: Buffer | string) => {
    try {
      const parsed = JSON.parse(data.toString());

      if (parsed.type === 'audio' && parsed.audio && session && isConnected) {
        // Forward PCM 16kHz audio to Gemini Live
        await session.sendRealtimeInput({
          audio: {
            data: parsed.audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        });
      } else if (parsed.type === 'text' && parsed.text) {
        if (session && isConnected) {
          await session.sendRealtimeInput({
            text: parsed.text,
          });
        } else {
          // Fallback generate content
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: parsed.text,
            config: { systemInstruction: SYSTEM_INSTRUCTION },
          });
          const reply = response.text || '';
          clientWs.send(JSON.stringify({ type: 'text', text: reply }));
        }
      }
    } catch (err: any) {
      console.error('Error processing client WS message:', err);
    }
  });

  clientWs.on('close', () => {
    console.log('Client WS disconnected');
    if (session) {
      try {
        session.close?.();
      } catch (e) {
        // ignore
      }
    }
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (dev: ${!isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
});
