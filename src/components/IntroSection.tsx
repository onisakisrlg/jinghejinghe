import React from 'react';
import { COMPLIANCE_INFO } from '../data';
import { Award, Briefcase, ShieldCheck } from 'lucide-react';

// Relative image paths as static asset strings to bypass TypeScript JPG loading complaints
const exteriorImg = 'https://i.postimg.cc/x162cmQQ/deb4efc8e1084142294e787d05ec952b.jpg';
const shelvesImg = 'https://i.postimg.cc/fRR4nbdD/f6aba635e93500400e7eb1dd518e4905.jpg';

export default function IntroSection() {
  return (
    <div id="intro-section" className="space-y-12 animate-fade-in text-slate-800">
      {/* Clinic introduction gallery */}
      <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Exterior */}
          <div className="relative group">
            <img 
              src={exteriorImg} 
              alt="京和薬局の外観" 
              className="w-full h-80 object-cover group-hover:scale-101 transition duration-500"
              referrerPolicy="no-referrer"
              id="exterior-photo"
            />
            <div className="absolute inset-0 bg-neutral-900/30 flex items-end p-6">
              <div className="text-white">
                <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mb-1 inline-block">店舗外観</span>
                <h4 className="text-lg font-bold">島之内の街に溶け込む親しみやすい店舗</h4>
              </div>
            </div>
          </div>

          {/* Interior/Shelves */}
          <div className="relative group">
            <img 
              src={shelvesImg} 
              alt="薬局店内の商品陳列状況" 
              className="w-full h-80 object-cover group-hover:scale-101 transition duration-500"
              referrerPolicy="no-referrer"
              id="interior-display-photo"
            />
            <div className="absolute inset-0 bg-neutral-900/30 flex items-end p-6">
              <div className="text-white">
                <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mb-1 inline-block">陳列状況</span>
                <h4 className="text-lg font-bold">法律に基づき、視認・管理しやすく区分陳列</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
          薬事厚生省および大阪市の合規規定（大保指令）に準少し、指定第2類医薬品・第2類・第3類をそれぞれ明確に識別可能に陳列しております。
        </div>
      </section>

      {/* Meet the Pharmacist */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pharmacist Profile */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col items-center text-center space-y-4" id="pharmacist-intro-card">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-3xl font-extrabold shadow-inner">
              村上
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full border border-white">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">村上 恵子</h3>
            <p className="text-xs text-emerald-600 font-semibold mb-1">管理薬剤師 / 店舗運営責任者</p>
            <p className="text-[11px] text-slate-400">登録番号: 薬剤師名簿登録 第123456号</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            「お薬について分からないこと、ご不安なことがあれば何でも聞いてください。対面での説明義務がある指定第2類医薬品の使用に関しても、分かりやすく丁寧に、安全に服用できるようカウンセリングいたします。」
          </p>
        </div>

        {/* Pharmacy Open License details */}
        <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between" id="pharmacy-license-card">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-slate-900">
              <Award className="h-5 w-5 text-emerald-600 shrink-0" />
              <h3 className="font-extrabold text-lg">薬局・薬店開設許可証の記載内容</h3>
            </div>
            <p className="text-xs text-slate-500">
              京和薬局は、大阪市指令に基づき薬局開設ならびに店舗販売業許可を取得し、適正な販売管理体制の下で営業しております。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-slate-200/60 rounded-xl p-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">許可番号</span>
                <span className="font-bold text-slate-805 leading-none">{COMPLIANCE_INFO.license.number}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">許可の持分者（氏名）</span>
                <span className="font-bold text-slate-805 leading-none">{COMPLIANCE_INFO.license.holder}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">店舗の名称・所在地</span>
                <span className="font-medium text-slate-700 leading-tight">{COMPLIANCE_INFO.license.registeredLocation}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">許可有効期間</span>
                <span className="font-semibold text-slate-700 leading-none">{COMPLIANCE_INFO.license.validity}</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 leading-normal mt-4 flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>※実店舗の許可証原本は薬局内の主カウンター側壁面に常時掲示されております。</span>
          </div>
        </div>
      </section>

      {/* Staff badge classification explanation */}
      <section className="bg-white rounded-2xl border border-slate-105 p-6 sm:p-8 shadow-sm space-y-6" id="staff-badging-explanation">
        <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">勤務者名札区分・服装説明</h3>
        </div>
        <p className="text-xs text-slate-500">
          薬事法および厚生労働省令に基づき、お客様が有資格者（薬剤師・登録販売者）と一般事務スタッフを直ちに見分けられるよう、名札の区分と服装を以下のように徹底しております。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPLIANCE_INFO.badging.map((item, index) => (
            <div key={index} className="border border-slate-100 p-5 rounded-xl hover:bg-slate-50/40 transition duration-150 space-y-3">
              <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] tracking-wider uppercase font-extrabold px-2.5 py-0.5 rounded-md">
                {item.role}
              </span>
              <div className="text-xs space-y-1.5 leading-normal">
                <p className="text-slate-900 font-semibold">{item.outfit}</p>
                <p className="text-emerald-800 font-medium">{item.badge}</p>
                <p className="text-slate-500 leading-relaxed pt-1.5 border-t border-slate-100 text-[11px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
