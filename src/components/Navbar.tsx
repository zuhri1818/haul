import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Mic, BookOpen, Heart, Calendar, 
  MapPin, Menu, X, Compass, Volume2, VolumeX 
} from 'lucide-react';

interface NavbarProps {
  onOpenVoiceModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenVoiceModal, 
  activeSection, 
  setActiveSection 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAmbience, setIsPlayingAmbience] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'sejarah', label: 'Sejarah & Leluhur' },
    { id: 'jadwal', label: 'Rangkaian Acara' },
    { id: 'tahlil', label: 'Kitab Tahlil' },
    { id: 'titip-doa', label: 'Titip Doa Arwah' },
    { id: 'panduan', label: 'Panduan Ziarah' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061510]/95 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#061510]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md group-hover:border-amber-400 transition-colors">
              <span className="font-arabic text-xl font-bold leading-none select-none">ب</span>
            </div>
            <div>
              <div className="font-heading text-base sm:text-lg font-bold tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors">
                HAUL AKBAR
              </div>
              <div className="text-[10px] sm:text-xs text-emerald-300/80 tracking-widest uppercase font-semibold">
                Desa Bangeran Lebak
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 bg-emerald-950/60 p-1 rounded-full border border-emerald-800/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-emerald-950 font-semibold shadow-sm'
                      : 'text-emerald-200/80 hover:text-amber-200 hover:bg-emerald-900/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Voice Assistant CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenVoiceModal}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-emerald-950 font-semibold text-xs tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Dialog Suara Khadim</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-950"></span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenVoiceModal}
              className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300"
              title="Dialog Suara Khadim"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900/50 border border-emerald-800 text-emerald-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071911] border-b border-emerald-800/60 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-amber-500 text-emerald-950 font-semibold'
                  : 'text-emerald-200 hover:bg-emerald-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoiceModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-emerald-950 font-bold text-sm shadow-md"
            >
              <Mic className="w-4 h-4" />
              Dialog Suara Khadim Haul (Gemini Live)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
