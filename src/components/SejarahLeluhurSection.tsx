import React, { useState } from 'react';
import { 
  Sparkles, Heart, MapPin, Mic, BookOpen, 
  Quote, Shield, Award, ChevronRight 
} from 'lucide-react';
import { SEJARAH_DESA, LELUHUR_LIST } from '../data/haulData.ts';
import { SesepuhLeluhur } from '../types.ts';

interface SejarahLeluhurSectionProps {
  onAskKhadimAbout: (topic: string) => void;
  onSendFatihahToLeluhur: (id: string) => void;
  leluhurData: SesepuhLeluhur[];
}

export const SejarahLeluhurSection: React.FC<SejarahLeluhurSectionProps> = ({
  onAskKhadimAbout,
  onSendFatihahToLeluhur,
  leluhurData,
}) => {
  const [selectedLeluhur, setSelectedLeluhur] = useState<SesepuhLeluhur | null>(null);

  return (
    <section id="sejarah" className="py-20 bg-[#071911] border-t border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mengenang Jasa Para Leluhur</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Jejak Keberkahan & Manakib Sesepuh <br />
            <span className="text-gold-gradient">Desa Bangeran Lebak</span>
          </h2>
          <p className="mt-4 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Menghidupkan kenangan para cikal bakal, pejuang dakwah, dan sesepuh yang telah menanamkan pohon iman serta merawat persaudaraan di tanah penuh kenangan ini.
          </p>
        </div>

        {/* Narrative Grid of Sejarah & 4 Makna Haul */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
                <BookOpen className="w-4 h-4" />
                <span>Babat Alas & Peradaban Santri</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-emerald-100 mb-4">
                {SEJARAH_DESA.judul}
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-emerald-200/90 leading-relaxed font-sans">
                {SEJARAH_DESA.narasi.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-emerald-800/40 flex items-center justify-between">
              <span className="text-xs text-emerald-400/80 italic font-serif">
                "Wong agung Bangeran Lebak, nandur kabecikan kinaryo payung anak-putu."
              </span>
              <button
                onClick={() => onAskKhadimAbout('Ceritakan lebih dalam kisah babat alas Desa Bangeran Lebak')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Tanya Khadim</span>
              </button>
            </div>
          </div>

          {/* 4 Pilar Makna Haul */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SEJARAH_DESA.maknaHaul.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-900/30 border border-emerald-700/30 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center text-xs font-bold font-heading mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="font-heading text-sm font-bold text-amber-200 mb-2">
                    {item.poin}
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sesepuh Cards Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Daftar Manakib Sesepuh & Muassis Desa
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
                Kirimkan hadiah Al-Fatihah untuk para sesepuh yang makamnya menjadi saksi sejarah desa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leluhurData.map((leluhur) => (
              <div
                key={leluhur.id}
                className="bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/50 hover:border-amber-400/50 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  {/* Badge & Era */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 text-amber-300 font-semibold border border-amber-400/20 text-[11px]">
                      {leluhur.era}
                    </span>
                    <span className="text-emerald-400/70 text-[11px] flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      {leluhur.fatihahCount.toLocaleString()} Fatihah
                    </span>
                  </div>

                  {/* Name & Title */}
                  <h4 className="font-heading text-lg font-bold text-emerald-100 group-hover:text-amber-200 transition-colors">
                    {leluhur.nama}
                  </h4>
                  <div className="text-xs font-semibold text-amber-400/90 mb-3">
                    {leluhur.gelar}
                  </div>

                  {/* Peran & Kisah */}
                  <p className="text-xs text-emerald-200/80 leading-relaxed line-clamp-4 font-sans mb-4">
                    {leluhur.kisah}
                  </p>

                  {/* Wasiat Kutipan */}
                  <div className="bg-emerald-950/60 rounded-xl p-3 border border-emerald-800/40 text-xs italic text-amber-200/90 font-serif mb-4 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>"{leluhur.wasiat}"</span>
                  </div>

                  {/* Lokasi Makam */}
                  <div className="text-[11px] text-emerald-300/70 flex items-center gap-1.5 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{leluhur.lokasiMakam}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-emerald-800/40 flex items-center gap-2">
                  <button
                    onClick={() => onSendFatihahToLeluhur(leluhur.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-amber-200 text-xs font-bold border border-emerald-500/40 active:scale-95 transition-transform"
                    title="Hadiahkan 1x Al-Fatihah"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-400" />
                    <span>Kirim Al-Fatihah</span>
                  </button>

                  <button
                    onClick={() => onAskKhadimAbout(`Ceritakan kisah dan wasiat dari ${leluhur.nama} di Bangeran Lebak`)}
                    className="p-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-emerald-800/80 transition-colors"
                    title="Tanya Khadim tentang Beliau"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
