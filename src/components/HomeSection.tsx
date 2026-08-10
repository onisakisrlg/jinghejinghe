import React from 'react';
import { COMPLIANCE_INFO } from '../data';
import { Clock, MapPin, Shield, HelpCircle, FileText, Scale, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomeSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTokusho, setShowTokusho] = React.useState(false);
  const { t } = useLanguage();

  return (
    <div id="home-section" className="space-y-12 animate-fade-in">
      {/* Hero Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-radial from-emerald-850 to-teal-950 text-white py-16 px-6 sm:px-12 text-center shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>大阪市中央区島之内の地域密着型薬局</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight whitespace-pre-line">
            {t('home.hero.title')}
          </h1>
          <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveSection('products')}
              id="hero-products-btn"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/20 transition-all duration-200 cursor-pointer text-sm"
            >
              {t('home.hero.btn.products')}
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              id="hero-contact-btn"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition duration-200 cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <span>{t('home.hero.btn.contact')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Basic Shop Information */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address and Contact info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between" id="info-address-card">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-emerald-800">
              <div className="bg-emerald-50 p-2.5 rounded-lg">
                <MapPin className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t('home.info.address')}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              〒542-0082<br />
              <strong className="text-slate-950">{t('home.info.address.detail')}</strong>
            </p>
            <p className="text-xs text-slate-500">
              ※長堀橋駅出口から徒歩すぐ、交通アクセスの良い長堀小谷マンションの1階です。気軽にお立ち寄りください。
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">店舗直通電話</div>
                <div className="text-lg font-black text-emerald-805" id="store-phone-display">{COMPLIANCE_INFO.tel}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-505 font-bold uppercase tracking-wider">FAX番号</div>
                <div className="text-sm font-bold text-slate-700" id="store-fax-display">{COMPLIANCE_INFO.fax}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between" id="info-hours-card">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-emerald-800">
              <div className="bg-emerald-50 p-2.5 rounded-lg">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t('home.info.hours')}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-slate-100 last:border-none">
                <span className="text-slate-600 font-medium">{t('home.info.hours.detail')}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 leading-normal">
            ※営業時間外のご相談はメールまたはお問い合わせフォームよりご連絡ください。
          </p>
        </div>

        {/* PMDA救済制度 */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between" id="info-pmda-card">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-teal-800">
              <div className="bg-teal-100 text-teal-800 p-2 rounded-lg">
                <Shield className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-base text-teal-950">救済制度 (PMDA)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-normal">
              {COMPLIANCE_INFO.pmda.description}
            </p>
            <div className="bg-white/80 rounded-xl p-3 border border-teal-100 space-y-1">
              <div className="text-[10px] font-bold text-teal-800 uppercase tracking-widest">医薬品副作用被害救済制度</div>
              <div className="text-base font-black text-teal-900 text-center">{COMPLIANCE_INFO.pmda.hotline}</div>
              <div className="text-[9px] text-slate-500 text-center">受付: {COMPLIANCE_INFO.pmda.hours}</div>
            </div>
          </div>
          <div className="text-[10px] text-teal-700/80 mt-2 font-medium">※詳しくは店内の提示、または薬剤師へお尋ねください。</div>
        </div>
      </section>

      {/* Compliance / Accordions Controls for Policy and Act details */}
      <section className="space-y-4">
        {/* Privacy Policy Toggle Button */}
        <div className="border border-slate-100 bg-white rounded-xl shadow-xs overflow-hidden">
          <button
            onClick={() => setShowPrivacy(!showPrivacy)}
            id="privacy-toggle-btn"
            className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              個人情報保護方針（プライバシーポリシー）
            </span>
            <span className="text-xs text-slate-400">{showPrivacy ? '閉じる ▲' : '展開する ▼'}</span>
          </button>
          
          {showPrivacy && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line" id="privacy-policy-text">
              {COMPLIANCE_INFO.privacyPolicy}
            </div>
          )}
        </div>

        {/* Designated Abuse Prevention Medicine Notice Box */}
        <div className="border border-slate-100 bg-white rounded-xl shadow-xs p-5 flex items-center space-x-3" id="designated-abuse-prevention-notice">
          <div className="bg-amber-100 text-amber-800 p-2 rounded-lg shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">
            指定濫用防止医薬品の特定販売を取り扱わない。
          </div>
        </div>

        {/* Specified Commercial Transaction Act Toggle Button */}
        <div className="border border-slate-100 bg-white rounded-xl shadow-xs overflow-hidden">
          <button
            onClick={() => setShowTokusho(!showTokusho)}
            id="tokusho-toggle-btn"
            className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-emerald-600" />
              特定商取引法に基づく表示
            </span>
            <span className="text-xs text-slate-400">{showTokusho ? '閉じる ▲' : '展開する ▼'}</span>
          </button>
          
          {showTokusho && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm" id="tokusho-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMPLIANCE_INFO.tokushoho.map((item, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-2">
                    <div className="font-extrabold text-slate-900 mb-0.5">{item.label}</div>
                    <div className="text-slate-600">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
