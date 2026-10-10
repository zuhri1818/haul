import React from 'react';
import { 
  Compass, MapPin, Phone, ShieldCheck, Heart, 
  HelpCircle, CheckCircle2, Mic, AlertTriangle 
} from 'lucide-react';
import { ADAB_ZIARAH, INFO_LOKASI } from '../data/haulData.ts';

interface PanduanZiarahSectionProps {
  onAskKhadimAbout: (topic: string) => void;
}

export const PanduanZiarahSection: React.FC<PanduanZiarahSectionProps> = ({
  onAskKhadimAbout,
}) => {
  return (
    <section id="panduan" className="py-20 bg-[#071911] border-t border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Tata Krama & Fasilitas Jamaah</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Adab Ziarah & Panduan Jamaah <br />
            <span className="text-gold-gradient">Desa Bangeran Lebak</span>
          </h2>
          <p className="mt-3 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Menjaga kesucian niat, menghormati pesarean para auliya dan orang tua, serta informasi pelayanan jamaah Haul Akbar.
          </p>
        </div>

        {/* 5 Adab Ziarah Cards */}
        <div className="mb-16">
          <h3 className="font-heading text-xl font-bold text-emerald-100 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>5 Adab Ziarah Kubur Menurut Ulama Salaf</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ADAB_ZIARAH.map((adab) => (
              <div
                key={adab.nomor}
                className="bg-emerald-950/50 border border-emerald-800/50 hover:border-amber-400/40 rounded-2xl p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="font-heading text-2xl font-bold text-amber-400/80 mb-2">
                    {adab.nomor}
                  </div>
                  <h4 className="font-heading text-sm font-bold text-emerald-100 mb-2">
                    {adab.judul}
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                    {adab.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Facilities and Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Facilities Column */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/50 rounded-3xl p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-amber-200 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Lokasi & Fasilitas Pelayanan Jamaah</span>
            </h3>
            <p className="text-xs text-emerald-300/80 mb-6">
              {INFO_LOKASI.namaTempat} • {INFO_LOKASI.alamat}
            </p>

            <div className="space-y-4">
              {INFO_LOKASI.fasilitas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-emerald-100">
                      {f.nama}
                    </h5>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      {f.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-emerald-800/40 flex items-center justify-between">
              <span className="text-xs text-emerald-400/80">
                Peta parkir & dapur umum dipandu relawan pemuda di setiap pertigaan desa.
              </span>
              <button
                onClick={() => onAskKhadimAbout('Bagaimana petunjuk arah jalan dan lokasi parkir Haul Bangeran Lebak?')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Tanya Petunjuk</span>
              </button>
            </div>
          </div>

          {/* Contact & Panitia Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold text-amber-200 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Layanan & Sekretariat Panitia</span>
              </h3>
              <p className="text-xs text-emerald-300/80 mb-6">
                Silakan menghubungi panitia bila membutuhkan konfirmasi rombongan peziarah atau penyerahan sedekah ambeng.
              </p>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                  <div className="text-emerald-400 font-semibold mb-1">Ketua Panitia Haul:</div>
                  <div className="text-sm font-bold text-emerald-100">{INFO_LOKASI.kontakPanitia.ketua}</div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                  <div className="text-emerald-400 font-semibold mb-1">Sekretariat & Tenda Tamu:</div>
                  <div className="text-sm font-bold text-emerald-100">{INFO_LOKASI.kontakPanitia.sekretariat}</div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                  <div className="text-emerald-400 font-semibold mb-1">Koordinator Arwah Jama'ah:</div>
                  <div className="text-sm font-bold text-emerald-100">{INFO_LOKASI.kontakPanitia.layananArwah}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-emerald-800/40 text-center">
              <p className="text-xs text-amber-300/90 font-serif italic">
                "Barangsiapa memuliakan orang tuanya dan para sesepuh, niscaya Allah panjangkan umurnya dalam keberkahan."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
