import React from 'react';
import { HeartPulse, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'ホーム' },
    { id: 'products', label: '商品分類・お薬一覧' },
    { id: 'intro', label: '店舗・薬剤師紹介' },
    { id: 'compliance', label: '特定販売公示' },
    { id: 'news', label: '新着情報' },
    { id: 'contact', label: 'お問合せ・AI相談' }
  ];

  return (
    <nav id="kyohe-navbar text-slate-800 bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-sm" className="bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => setActiveSection('home')} 
              className="flex items-center space-x-3 text-emerald-800 hover:opacity-90 transition cursor-pointer"
              id="navbar-brand-btn"
            >
              <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-md shadow-emerald-200/50 flex items-center justify-center">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-emerald-500 uppercase tracking-widest">KYOHE PHARMACY</span>
                <span className="block text-xl font-extrabold text-slate-900 leading-tight">京和薬局株式会社</span>
              </div>
            </button>
          </div>

          {/* Desktop navbar */}
          <div className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.id === 'contact' && (
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white" id="mobile-nav-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}-btn`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left block px-3 py-3 rounded-lg text-base font-medium transition cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.id === 'contact' && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 animate-pulse">
                      <Sparkles className="h-2.5 w-2.5" /> AI相談
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
