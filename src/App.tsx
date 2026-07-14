import { useState } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import ProductSection from './components/ProductSection';
import IntroSection from './components/IntroSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import ComplianceSection from './components/ComplianceSection';
import PaymentShippingSection from './components/PaymentShippingSection';
import { HeartPulse, MapPin, Phone, Scale, ShieldAlert } from 'lucide-react';
import { COMPLIANCE_INFO } from './data';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection setActiveSection={setActiveSection} />;
      case 'products':
        return <ProductSection setActiveSection={setActiveSection} />;
      case 'intro':
        return <IntroSection />;
      case 'compliance':
        return <ComplianceSection />;
      case 'news':
        return <NewsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div id="kyohe-root-container" className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Upper Announcement Compliance Ticker */}
      <div className="bg-emerald-900 text-white text-xs py-2.5 px-4 text-center font-medium border-b border-emerald-950/20" id="top-announcement-ticker">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4">
          <span className="bg-emerald-500 text-[10px] tracking-wide font-extrabold px-2 py-0.5 rounded-sm uppercase inline-block">法律省令順守</span>
          <p className="leading-none text-[11px]">
            当店は大阪市認可の「店舗販売業許可（第20V00088号）」に基づき、法令を遵守して医薬品を適正に販売しております。
          </p>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderSection()}
      </main>

      {/* Payment & Shipping Guidelines Section */}
      <PaymentShippingSection />

      {/* Deep compliance legal Footer wrapper */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-950 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs leading-relaxed" id="kyohe-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          
          {/* Company identity card */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-emerald-400">
              <HeartPulse className="h-6 w-6" />
              <span className="text-lg font-bold text-white">京和薬局株式会社</span>
            </div>
            <p className="text-slate-400">
              地域の皆様の健やかな毎日のために、安心と信頼のお薬相談を。一般用医薬品のセルフケア情報の配信・指導に力を入れております。
            </p>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{COMPLIANCE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>店舗電話 : {COMPLIANCE_INFO.tel}</span>
              </div>
            </div>
          </div>

          {/* Licenses checklist */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-emerald-500" />
              薬局店舗情報に関する法規表示
            </h4>
            <div className="space-y-2 text-slate-400">
              <p>・<strong>許可の区分：</strong>店舗販売業（医薬品のインターネット販売を含む）</p>
              <p>・<strong>所管：</strong>大阪市（指令大保 第20V00088号）</p>
              <p>・<strong>店舗の管理者：</strong>管理薬剤師 村上 恵子</p>
              <p>・<strong>取扱い区分：</strong>指定第2類医薬品・第2類医薬品・第3類医薬品</p>
            </div>
          </div>

          {/* Quick legal warnings info */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-emerald-500" />
              お薬に関する重要な注意事項
            </h4>
            <p className="text-slate-400 leading-normal">
              一般用医薬品の服用・使用前の安全管理として、お薬パッケージに同梱の添付文書（説明書）の禁忌項目（してはいけないこと、相談すること）を必ずご確認ください。指定第2類、第2類、第3類に関する注意喚起は、実地薬剤師へお問い合わせください。
            </p>
          </div>
        </div>

        {/* Copy guidelines credit */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px]">
          <p>© 2026 京和薬局株式会社. All Rights Reserved. (Kyohe Pharmacy Co., Ltd. Osaka Japan)</p>
          <div className="flex gap-4">
            <button onClick={() => setActiveSection('home')} className="hover:text-emerald-450 cursor-pointer">{t('nav.home')}</button>
            <button onClick={() => setActiveSection('products')} className="hover:text-emerald-450 cursor-pointer">{t('nav.products')}</button>
            <button onClick={() => setActiveSection('intro')} className="hover:text-emerald-450 cursor-pointer">{t('nav.intro')}</button>
            <button onClick={() => setActiveSection('compliance')} className="hover:text-emerald-450 cursor-pointer">{t('nav.compliance')}</button>
            <button onClick={() => setActiveSection('contact')} className="hover:text-emerald-450 cursor-pointer">{t('nav.contact')}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
