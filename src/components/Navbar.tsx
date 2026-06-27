import React from 'react';
import { HeartPulse, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'products', label: t('nav.products') },
    { id: 'intro', label: t('nav.intro') },
    { id: 'compliance', label: t('nav.compliance') },
    { id: 'news', label: t('nav.news') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLangChange = (lang: 'ja' | 'en' | 'zh') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

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
                </span>
              </button>
            ))}
            
            {/* Language Switcher Desktop */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg transition duration-200 cursor-pointer hover:bg-slate-50"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 overflow-hidden">
                  <button onClick={() => handleLangChange('ja')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">日本語 (JA)</button>
                  <button onClick={() => handleLangChange('en')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">English (EN)</button>
                  <button onClick={() => handleLangChange('zh')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">简体中文 (ZH)</button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Language Switcher Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer flex items-center"
              >
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-xs font-bold uppercase">{language}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 overflow-hidden">
                  <button onClick={() => handleLangChange('ja')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">日本語 (JA)</button>
                  <button onClick={() => handleLangChange('en')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">English (EN)</button>
                  <button onClick={() => handleLangChange('zh')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer">简体中文 (ZH)</button>
                </div>
              )}
            </div>
            
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
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
