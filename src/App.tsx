import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { SejarahLeluhurSection } from './components/SejarahLeluhurSection.tsx';
import { JadwalAcaraSection } from './components/JadwalAcaraSection.tsx';
import { KitabTahlilSection } from './components/KitabTahlilSection.tsx';
import { TitipDoaSection } from './components/TitipDoaSection.tsx';
import { PanduanZiarahSection } from './components/PanduanZiarahSection.tsx';
import { VoiceAssistantModal } from './components/VoiceAssistantModal.tsx';
import { Footer } from './components/Footer.tsx';
import { LELUHUR_LIST, INITIAL_TITIP_DOA } from './data/haulData.ts';
import { SesepuhLeluhur, TitipDoaArwah } from './types.ts';
import { Mic, Sparkles } from 'lucide-react';

export default function App() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  // Leluhur state with local storage cache
  const [leluhurData, setLeluhurData] = useState<SesepuhLeluhur[]>(() => {
    try {
      const saved = localStorage.getItem('bangeran_leluhur_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return LELUHUR_LIST;
  });

  // Titip Doa state with local storage cache
  const [doaList, setDoaList] = useState<TitipDoaArwah[]>(() => {
    try {
      const saved = localStorage.getItem('bangeran_titip_doa_list');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_TITIP_DOA;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bangeran_leluhur_data', JSON.stringify(leluhurData));
    } catch (e) {
      // ignore
    }
  }, [leluhurData]);

  useEffect(() => {
    try {
      localStorage.setItem('bangeran_titip_doa_list', JSON.stringify(doaList));
    } catch (e) {
      // ignore
    }
  }, [doaList]);

  // Handle adding new titip doa
  const handleAddDoa = (newEntry: Omit<TitipDoaArwah, 'id' | 'waktu' | 'fatihahHadiahCount'>) => {
    const item: TitipDoaArwah = {
      ...newEntry,
      id: 'doa-' + Date.now(),
      waktu: 'Baru saja',
      fatihahHadiahCount: 1,
    };
    setDoaList(prev => [item, ...prev]);
  };

  // Handle Fatihah to Sesepuh
  const handleSendFatihahToLeluhur = (id: string) => {
    setLeluhurData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, fatihahCount: item.fatihahCount + 1 };
      }
      return item;
    }));
  };

  // Handle Fatihah to Titip Doa entry
  const handleSendFatihahToDoa = (id: string) => {
    setDoaList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, fatihahHadiahCount: item.fatihahHadiahCount + 1 };
      }
      return item;
    }));
  };

  // Open Voice Modal with contextual prompt
  const handleAskKhadimAbout = (topic: string) => {
    setIsVoiceModalOpen(true);
  };

  const handleNavigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate statistics
  const totalFatihahLeluhur = leluhurData.reduce((acc, curr) => acc + curr.fatihahCount, 0);
  const totalFatihahWarga = doaList.reduce((acc, curr) => acc + curr.fatihahHadiahCount, 0);
  const grandTotalFatihah = totalFatihahLeluhur + totalFatihahWarga;

  const totalArwahListed = doaList.reduce((acc, curr) => acc + curr.namaArwah.length, 0);

  return (
    <div className="min-h-screen bg-[#061510] text-[#f1f5f3] flex flex-col selection:bg-amber-500 selection:text-emerald-950">
      
      {/* Navigation */}
      <Navbar
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          onNavigateTo={handleNavigateTo}
          totalFatihah={grandTotalFatihah}
          totalArwah={totalArwahListed}
        />

        {/* Sejarah & Leluhur Section */}
        <SejarahLeluhurSection
          leluhurData={leluhurData}
          onAskKhadimAbout={handleAskKhadimAbout}
          onSendFatihahToLeluhur={handleSendFatihahToLeluhur}
        />

        {/* Jadwal Rangkaian Acara Section */}
        <JadwalAcaraSection
          onAskKhadimAbout={handleAskKhadimAbout}
        />

        {/* Kitab Tahlil & Doa Section */}
        <KitabTahlilSection
          onAskKhadimAbout={handleAskKhadimAbout}
        />

        {/* Titip Doa & Arwah Jama'ah Section */}
        <TitipDoaSection
          doaList={doaList}
          onAddDoa={handleAddDoa}
          onSendFatihahToDoa={handleSendFatihahToDoa}
          onAskKhadimAbout={handleAskKhadimAbout}
        />

        {/* Panduan Ziarah & Fasilitas Section */}
        <PanduanZiarahSection
          onAskKhadimAbout={handleAskKhadimAbout}
        />

      </main>

      {/* Footer */}
      <Footer onOpenVoiceModal={() => setIsVoiceModalOpen(true)} />

      {/* Dedicated Gemini 3.8 Live Voice Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      {/* Floating Voice Dialog Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-emerald-950 font-bold text-xs tracking-wide shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          title="Buka Dialog Suara Khadim Haul (Gemini Live)"
        >
          <div className="relative">
            <Mic className="w-4 h-4 text-emerald-950 font-bold" />
            <span className="animate-ping absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-emerald-950 opacity-75"></span>
          </div>
          <span className="hidden sm:inline">Dialog Suara Khadim</span>
          <span className="sm:hidden">Suara</span>
        </button>
      </div>

    </div>
  );
}
