import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Flame, BookOpen, 
  CheckCircle2, Bell, Share2, Mic, Info
} from 'lucide-react';
import { AGENDA_HAUL } from '../data/haulData.ts';
import { AgendaAcara } from '../types.ts';

interface JadwalAcaraSectionProps {
  onAskKhadimAbout: (topic: string) => void;
}

export const JadwalAcaraSection: React.FC<JadwalAcaraSectionProps> = ({
  onAskKhadimAbout,
}) => {
  const [filter, setFilter] = useState<string>('semua');
  const [savedAgendas, setSavedAgendas] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleSaveAgenda = (id: string) => {
    if (savedAgendas.includes(id)) {
      setSavedAgendas(savedAgendas.filter(item => item !== id));
    } else {
      setSavedAgendas([...savedAgendas, id]);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredList = filter === 'semua' 
    ? AGENDA_HAUL 
    : AGENDA_HAUL.filter(item => item.kategori === filter);

  return (
    <section id="jadwal" className="py-20 bg-islamic-pattern border-t border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Agenda & Rangkaian Ibadah</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Rangkaian Acara Haul Akbar <br />
            <span className="text-gold-gradient">Desa Bangeran Lebak</span>
          </h2>
          <p className="mt-3 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Dari fajar lantunan Khotmil Qur'an hingga gema shalawat malam puncak. Mari bersama-sama meraih rida Allah dan syafaat Baginda Rasulullah SAW.
          </p>
        </div>

        {/* Special Banner for Perantau */}
        <div className="max-w-4xl mx-auto mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0d3324] via-[#09261a] to-[#0d3324] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mx-auto sm:mx-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-amber-200">
                Sugeng Rawuh Para Sedulur Perantauan
              </h4>
              <p className="text-xs text-emerald-200/90 font-sans mt-0.5">
                Bagi warga Bangeran Lebak di Surabaya, Jabodetabek, luar pulau, maupun mancanegara—jadikan momentum ini pengikat rasa dan sambung silaturahmi.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{copiedLink ? 'Tautan Disalin!' : 'Bagikan Jadwal'}</span>
            </button>
            <button
              onClick={() => onAskKhadimAbout('Jelaskan detail susunan acara dan jam pelaksanaan Haul Akbar Desa Bangeran Lebak')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Tanya Khadim</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          {[
            { id: 'semua', label: 'Semua Rangkaian' },
            { id: 'quran', label: 'Khotmil Qur\'an' },
            { id: 'ziarah', label: 'Ziarah Makam' },
            { id: 'dapur', label: 'Dapur Ambeng Berkat' },
            { id: 'pawai', label: 'Kirab Obor Santri' },
            { id: 'pengajian', label: 'Malam Puncak & Shalawat' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === tab.id
                  ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                  : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredList.map((agenda, index) => {
            const isSaved = savedAgendas.includes(agenda.id);
            return (
              <div
                key={agenda.id}
                className="relative bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/50 hover:border-amber-400/40 rounded-3xl p-6 sm:p-7 transition-all shadow-md group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left Column: Number & Time */}
                  <div className="sm:w-52 shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/70 border border-emerald-700/40 text-amber-300 text-xs font-bold mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{agenda.waktu}</span>
                    </div>
                    <div className="text-sm font-semibold text-emerald-300">
                      {agenda.tanggal}
                    </div>
                    <div className="text-xs text-emerald-400/70 flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-2">{agenda.tempat}</span>
                    </div>
                  </div>

                  {/* Middle Column: Event Title & Details */}
                  <div className="flex-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-emerald-100 group-hover:text-amber-200 transition-colors">
                      {agenda.namaAcara}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-sans">
                      {agenda.deskripsi}
                    </p>

                    {agenda.pengisiAcara && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-800/50 text-xs text-amber-300/90 font-medium">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{agenda.pengisiAcara}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Actions */}
                  <div className="shrink-0 flex items-center sm:flex-col gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-800/30">
                    <button
                      onClick={() => toggleSaveAgenda(agenda.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        isSaved
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300 hover:border-amber-400/50'
                      }`}
                      title={isSaved ? "Tersimpan di daftar pengingat Anda" : "Simpan pengingat agenda ini"}
                    >
                      <Bell className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span className="sm:hidden">{isSaved ? 'Tersimpan' : 'Ingatkan'}</span>
                    </button>

                    <button
                      onClick={() => onAskKhadimAbout(`Berapa rute atau informasi detail mengenai acara ${agenda.namaAcara}?`)}
                      className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800/80 text-amber-300 hover:bg-emerald-900 transition-colors"
                      title="Tanya Khadim tentang acara ini"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
