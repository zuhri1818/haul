import React, { useState } from 'react';
import { 
  Heart, Plus, Trash2, Send, Search, Sparkles, 
  User, MapPin, CheckCircle, Clock, Mic, MessageSquare 
} from 'lucide-react';
import { TitipDoaArwah } from '../types.ts';

interface TitipDoaSectionProps {
  doaList: TitipDoaArwah[];
  onAddDoa: (newDoa: Omit<TitipDoaArwah, 'id' | 'waktu' | 'fatihahHadiahCount'>) => void;
  onSendFatihahToDoa: (id: string) => void;
  onAskKhadimAbout: (topic: string) => void;
}

export const TitipDoaSection: React.FC<TitipDoaSectionProps> = ({
  doaList,
  onAddDoa,
  onSendFatihahToDoa,
  onAskKhadimAbout,
}) => {
  const [pengirim, setPengirim] = useState('');
  const [asal, setAsal] = useState('');
  const [namaArwahInputs, setNamaArwahInputs] = useState<string[]>(['']);
  const [doaKhusus, setDoaKhusus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddArwahInput = () => {
    if (namaArwahInputs.length < 8) {
      setNamaArwahInputs([...namaArwahInputs, '']);
    }
  };

  const handleRemoveArwahInput = (index: number) => {
    if (namaArwahInputs.length > 1) {
      setNamaArwahInputs(namaArwahInputs.filter((_, i) => i !== index));
    }
  };

  const handleArwahInputChange = (index: number, value: string) => {
    const updated = [...namaArwahInputs];
    updated[index] = value;
    setNamaArwahInputs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validArwah = namaArwahInputs.map(s => s.trim()).filter(Boolean);

    if (!pengirim.trim()) {
      setErrorMsg('Mohon isi nama pengirim atau nama keluarga');
      return;
    }
    if (!asal.trim()) {
      setErrorMsg('Mohon isi asal domisili (RT/Dusun atau kota perantauan)');
      return;
    }
    if (validArwah.length === 0) {
      setErrorMsg('Mohon cantumkan minimal satu nama almarhum/almarhumah');
      return;
    }

    onAddDoa({
      pengirim: pengirim.trim(),
      asal: asal.trim(),
      namaArwah: validArwah,
      doaKhusus: doaKhusus.trim() || 'Mugi sedaya amal ibadah katampi lan pinaringan jembar kuburipun dening Allah SWT. Aamiin.',
    });

    setPengirim('');
    setAsal('');
    setNamaArwahInputs(['']);
    setDoaKhusus('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const filteredDoaList = doaList.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchPengirim = item.pengirim.toLowerCase().includes(query);
    const matchAsal = item.asal.toLowerCase().includes(query);
    const matchArwah = item.namaArwah.some(nama => nama.toLowerCase().includes(query));
    return matchPengirim || matchAsal || matchArwah;
  });

  return (
    <section id="titip-doa" className="py-20 bg-islamic-pattern border-t border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            <span>Birrul Walidain & Silaturahmi Rohani</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Buku Tamu & Dinding Doa Arwah <br />
            <span className="text-gold-gradient">Desa Bangeran Lebak</span>
          </h2>
          <p className="mt-3 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Wadah bagi segenap warga mukim dan sedulur perantau untuk menitipkan nama-nama orang tua dan leluhur tercinta agar dibacakan fatihah bersama dalam Majelis Haul Akbar.
          </p>
        </div>

        {/* 2-Column Layout: Form on Left, Wall on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/40 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading text-lg font-bold text-amber-200">
                  Formulir Titip Doa Arwah
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-medium">
                Arwah Jama'ah
              </span>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-900/80 border border-emerald-500/50 text-emerald-100 flex items-start gap-3 animate-in fade-in duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-amber-300">Alhamdulillah, Nama Arwah Telah Tercatat!</div>
                  <p className="mt-0.5 text-emerald-200">
                    InsyaAllah akan disertakan dalam lantunan tahlil jama'i dan doa arwah Haul Akbar Desa Bangeran Lebak.
                  </p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                  Nama Pengirim / Keluarga
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={pengirim}
                    onChange={(e) => setPengirim(e.target.value)}
                    placeholder="Contoh: Haji Syamsul & Keluarga"
                    className="w-full pl-10 pr-4 py-2.5 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                  Asal / Domisili
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={asal}
                    onChange={(e) => setAsal(e.target.value)}
                    placeholder="Contoh: Bangeran Lebak RT 03 / Perantauan Surabaya"
                    className="w-full pl-10 pr-4 py-2.5 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-emerald-300">
                    Nama-nama Almarhum / Almarhumah
                  </label>
                  <button
                    type="button"
                    onClick={handleAddArwahInput}
                    className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Nama</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {namaArwahInputs.map((val, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleArwahInputChange(idx, e.target.value)}
                        placeholder={`Nama Arwah ${idx + 1} (Contoh: Alm. Bapak H. Mustari)`}
                        className="flex-1 px-3.5 py-2 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-amber-400"
                      />
                      {namaArwahInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArwahInput(idx)}
                          className="p-2 text-emerald-500 hover:text-red-400 rounded-lg hover:bg-emerald-900/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                  Untaian Doa Khusus
                </label>
                <textarea
                  rows={3}
                  value={doaKhusus}
                  onChange={(e) => setDoaKhusus(e.target.value)}
                  placeholder="Tuliskan doa atau permohonan ampunan khusus untuk almarhum/almarhumah..."
                  className="w-full px-3.5 py-2.5 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-emerald-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan Doa ke Majelis Haul</span>
              </button>

            </form>
          </div>

          {/* Wall Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search Bar & Total Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-950/50 border border-emerald-800/40 p-4 rounded-2xl">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama keluarga / arwah..."
                  className="w-full pl-10 pr-4 py-2 bg-emerald-900/60 border border-emerald-700/50 rounded-xl text-xs sm:text-sm text-emerald-100 placeholder-emerald-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="text-xs text-emerald-300/80 font-medium shrink-0">
                Menampilkan <span className="text-amber-300 font-bold">{filteredDoaList.length}</span> titipan doa keluarga
              </div>
            </div>

            {/* Prayer Submissions Cards List */}
            <div className="space-y-4">
              {filteredDoaList.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-b from-[#0a271c] to-[#071911] border border-emerald-800/50 hover:border-amber-400/30 rounded-3xl p-5 sm:p-6 transition-all shadow-md group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-heading text-base font-bold text-amber-200">
                        {item.pengirim}
                      </div>
                      <div className="text-xs text-emerald-400/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{item.asal}</span>
                        <span>•</span>
                        <span className="text-emerald-500">{item.waktu}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSendFatihahToDoa(item.id)}
                      className="px-3 py-1.5 rounded-full bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 text-xs font-bold text-amber-300 flex items-center gap-1.5 active:scale-95 transition-transform"
                      title="Hadiahkan Al-Fatihah untuk arwah ini"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/30" />
                      <span>{item.fatihahHadiahCount}x Fatihah</span>
                    </button>
                  </div>

                  {/* Arwah Names Badges */}
                  <div className="mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1.5">
                      Arwah Khususon:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.namaArwah.map((nama, nIdx) => (
                        <span
                          key={nIdx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-700/40 text-xs font-medium text-emerald-100"
                        >
                          🌿 {nama}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prayer Text */}
                  <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed italic font-serif bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30">
                    "{item.doaKhusus}"
                  </p>

                  <div className="mt-3 pt-3 border-t border-emerald-800/30 flex items-center justify-between text-xs text-emerald-400/70">
                    <button
                      onClick={() => onAskKhadimAbout(`Mohon lantunkan doa arwah untuk keluarga ${item.pengirim} terkhusus ${item.namaArwah.join(', ')}`)}
                      className="inline-flex items-center gap-1 text-amber-300/80 hover:text-amber-200"
                    >
                      <Mic className="w-3 h-3 text-amber-400" />
                      <span>Doakan via Khadim Suara</span>
                    </button>
                    <span className="font-arabic text-sm text-amber-400/80">
                      غَفَرَ اللَّهُ لَهُمْ
                    </span>
                  </div>
                </div>
              ))}

              {filteredDoaList.length === 0 && (
                <div className="p-12 text-center bg-emerald-950/30 border border-emerald-800/30 rounded-3xl text-emerald-300/80">
                  <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm">Tidak ditemukan nama arwah dengan kata kunci tersebut.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
