import React from 'react';
import { Sparkles, Heart, Mic, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenVoiceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVoiceModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040e0b] border-t border-emerald-900/60 pt-16 pb-12 text-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto mb-4 font-arabic text-2xl font-bold shadow-lg">
            ب
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold text-amber-200 tracking-wider">
            HAUL AKBAR DESA BANGERAN LEBAK
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-emerald-300/80 uppercase tracking-widest font-medium">
            Merawat Tradisi • Mempererat Silaturahmi • Mengenang Jasa Para Leluhur
          </p>

          <p className="mt-4 text-xs sm:text-sm text-emerald-300/90 font-serif italic max-w-2xl mx-auto">
            "Di tanah yang penuh kenangan, di tengah masyarakat yang menjunjung tinggi nilai-nilai keislaman... Semoga kebersamaan ini membawa keberkahan dan senantiasa dalam rida Allah Subhanahu wa Ta'ala."
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onOpenVoiceModal}
              className="px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Dialog Suara Khadim Haul (Gemini Live)</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-800 text-emerald-300 transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/70 gap-4">
          <div>
            © {new Date().getFullYear()} Panitia Haul Akbar Desa Bangeran Lebak. Berkhidmat untuk Ummat & Bangsa.
          </div>
          <div className="flex items-center gap-1 text-emerald-400/80">
            <span>Dihidupkan dengan rasa cinta kepada leluhur</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400/40 inline" />
            <span>& Nilai Keislaman Nusantara</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
