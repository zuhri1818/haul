import React, { useState } from 'react';
import { 
  Sparkles, Mic, Heart, BookOpen, Calendar, 
  MapPin, Users, Flame, Volume2, ShieldCheck, ArrowRight
} from 'lucide-react';
import { SEJARAH_DESA } from '../data/haulData.ts';

interface HeroSectionProps {
  onOpenVoiceModal: () => void;
  onNavigateTo: (sectionId: string) => void;
  totalFatihah: number;
  totalArwah: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenVoiceModal,
  onNavigateTo,
  totalFatihah,
  totalArwah,
}) => {
  const [isPlayingAudioQuote, setIsPlayingAudioQuote] = useState(false);

  const playQuoteSpeech = async () => {
    try {
      setIsPlayingAudioQuote(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: SEJARAH_DESA.kutipanUtama,
          voiceName: 'Zephyr'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
          audio.onended = () => setIsPlayingAudioQuote(false);
          audio.onerror = () => setIsPlayingAudioQuote(false);
          audio.play();
        } else {
          setIsPlayingAudioQuote(false);
        }
      } else {
        setIsPlayingAudioQuote(false);
      }
    } catch (e) {
      console.error(e);
      setIsPlayingAudioQuote(false);
    }
  };

  return (
    <section id="beranda" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-islamic-pattern">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Islamic Greeting & Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium mb-4 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Majelis Tahunan Kirim Doa & Silaturahmi Akbar</span>
            <span className="text-emerald-400">•</span>
            <span className="font-semibold text-emerald-200">Ahlussunnah wal Jama'ah</span>
          </div>

          <div className="font-arabic text-2xl sm:text-3xl text-amber-300/90 tracking-wide mb-2 select-none">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.15]">
            HAUL AKBAR <br />
            <span className="text-gold-gradient">DESA BANGERAN LEBAK</span>
          </h1>

          <p className="mt-4 text-emerald-300/90 text-sm sm:text-base font-medium tracking-wide uppercase">
            Merawat Tradisi • Mempererat Silaturahmi • Mengenang Jasa Para Leluhur
          </p>
        </div>

        {/* Central Poetic Narrative Card */}
        <div className="max-w-4xl mx-auto my-8 relative">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0a271c] to-[#071911] border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-3 text-amber-500/30 text-xl font-serif">❖</div>
            <div className="absolute top-2 right-3 text-amber-500/30 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 left-3 text-amber-500/30 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 right-3 text-amber-500/30 text-xl font-serif">❖</div>

            <div className="relative z-10 text-center">
              <blockquote className="text-lg sm:text-xl md:text-2xl text-emerald-100 font-serif leading-relaxed italic">
                "{SEJARAH_DESA.kutipanUtama}"
              </blockquote>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={playQuoteSpeech}
                  disabled={isPlayingAudioQuote}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-medium transition-all shadow-sm"
                  title="Dengarkan lantunan suara pesan ini"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudioQuote ? 'text-amber-400 animate-bounce' : 'text-amber-300'}`} />
                  <span>{isPlayingAudioQuote ? 'Mendengarkan Lantunan...' : 'Dengarkan Lantunan Suara Khadim'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          
          {/* Main Voice Dialog Button */}
          <button
            onClick={onOpenVoiceModal}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-emerald-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-950/20 flex items-center justify-center text-emerald-950 group-hover:rotate-12 transition-transform">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-emerald-900 font-extrabold leading-none">
                Fitur Suara Interaktif
              </div>
              <div className="text-base font-bold leading-tight">
                Dialog dengan Khadim Haul
              </div>
            </div>
          </button>

          {/* Titip Doa Arwah CTA */}
          <button
            onClick={() => onNavigateTo('titip-doa')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-100 font-semibold text-sm hover:border-amber-400/50 transition-all shadow-lg"
          >
            <Heart className="w-4 h-4 text-red-400" />
            <span>Kirim Doa & Nama Arwah Keluarga</span>
          </button>

          {/* Baca Tahlil CTA */}
          <button
            onClick={() => onNavigateTo('tahlil')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-200 text-sm font-medium transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Buka Kitab Tahlil & Doa</span>
          </button>

        </div>

        {/* Live Counters & Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-xl bg-amber-500/10 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-amber-200">
              {totalFatihah.toLocaleString()}x
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              Hadiah Fatihah Terkumpul
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-500/10 text-emerald-300">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-emerald-200">
              3.500+
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              Jamaah Mukim & Perantau
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-xl bg-amber-500/10 text-amber-300">
              <Flame className="w-4 h-4" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-amber-200">
              2.000
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              Ambeng Berkat Sedekah
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-500/10 text-emerald-300">
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-emerald-200">
              {totalArwah}
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              Keluarga & Arwah Didoakan
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
