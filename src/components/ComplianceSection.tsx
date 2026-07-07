import React, { useState } from 'react';
import { COMPLIANCE_INFO, SAMPLE_DRUGS } from '../data';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  FileText, 
  Printer, 
  Search, 
  Eye, 
  AlertTriangle, 
  Info, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Camera,
  Image
} from 'lucide-react';

export default function ComplianceSection() {
  // Simulator State for specific medicine display page / search query checking
  const [selectedDemoDrug, setSelectedDemoDrug] = useState(SAMPLE_DRUGS[0]);
  const [demoSearchTerm, setDemoSearchTerm] = useState('');
  const [demoFilterCategory, setDemoFilterCategory] = useState<'すべて' | '指定第2類医薬品' | '第2類医薬品' | '第3類医薬品'>('すべて');
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const filteredDemoDrugs = SAMPLE_DRUGS.filter(d => {
    const matchCat = demoFilterCategory === 'すべて' || d.category === demoFilterCategory;
    const matchText = d.name.includes(demoSearchTerm) || d.effects.includes(demoSearchTerm) || d.description.includes(demoSearchTerm);
    return matchCat && matchText;
  });

  return (
    <div id="compliance-section-root" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Upper Warning banner explaining government certification compliance */}
      <section className="bg-emerald-550 bg-slate-900 border border-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg" id="compliance-top-hero">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-emerald-500/10 blur-xl"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] tracking-widest px-2.5 py-1 rounded-sm uppercase inline-block leading-none">
              薬機法省令完全順守
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] tracking-wide px-2.5 py-1 rounded-sm inline-block leading-none">
              特定販売（インターネット広告・販売）適合公示
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            特定販売に関する法定公示・店舗の管理及び運営に関する事項
          </h2>
          <p className="text-slate-350 text-xs sm:text-sm max-w-4xl leading-relaxed">
            この公示は、医薬品医療機器等法（旧薬事法）施行規則第15条の15の別表第1第2号「特定販売を行うことについてインターネットを利用して広告する場合」に基づき、
            主たるホームページの構成概要、店舗の外観・陳列状態、各種管理情報、ならびに医薬品の販売制度に関する事項を一覧公開する認定届出台帳のデジタルツイン版です。
          </p>
        </div>
      </section>

      {/* Grid Layout containing Main Official Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Pharmacy Info Sheets & Compliance Checkmarks (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Statutory Document Card: 店舗の管理及び運営に関する事項 */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" id="statutory-license-record">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-emerald-300" />
                <div>
                  <h3 className="font-extrabold text-base">薬局（店舗）の管理及び運営に関する事項</h3>
                  <p className="text-[10.5px] text-emerald-100">省令及び自治体規定に基づく法定掲示</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold border border-emerald-800 px-2 py-0.5 rounded">法定公示第1号</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                
                {/* 1. Permits details */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">許可の区分・番号</span>
                  <div className="sm:col-span-2 space-y-1 text-slate-900">
                    <p className="font-black">店舗販売業</p>
                    <p className="text-slate-600 text-xs">大阪市認可 第20V00088号</p>
                    <p className="text-slate-400 text-[10.5px]">（有効期間：{COMPLIANCE_INFO.license.validity}）</p>
                  </div>
                </div>

                {/* 2. Pharmacy owner & name */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">薬局開設者の名称等</span>
                  <div className="sm:col-span-2 text-slate-900 space-y-1">
                    <p className="font-bold">{COMPLIANCE_INFO.pharmacyName}</p>
                    <p className="text-xs text-slate-600">代表取締役：村上 恵子</p>
                  </div>
                </div>

                {/* 3. Address and details */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">店舗の名称・所在地</span>
                  <div className="sm:col-span-2 text-slate-900 space-y-1">
                    <p className="font-bold">京和薬局</p>
                    <p className="text-xs text-slate-600 flex items-start gap-1">
                      <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{COMPLIANCE_INFO.address}</span>
                    </p>
                  </div>
                </div>

                {/* 4. Manager of the pharmacy */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">店舗管理者</span>
                  <div className="sm:col-span-2 text-slate-900 space-y-1">
                    <p className="font-bold">管理薬剤師：{COMPLIANCE_INFO.license.pharmacist.split('(')[0].trim()}</p>
                    <p className="text-xs text-slate-500">（お薬相談指導、添付文書の適合管理全般を管轄）</p>
                  </div>
                </div>

                {/* 5. Range of drugs handled */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">取り扱う一般用医薬品の区分</span>
                  <div className="sm:col-span-2 text-slate-900 space-y-1 flex flex-wrap gap-1.5">
                    <span className="bg-red-50 text-red-700 border border-red-200 font-extrabold text-[11px] px-2 py-0.5 rounded-sm">指定第2類医薬品</span>
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 font-extrabold text-[11px] px-2 py-0.5 rounded-sm">第2類医薬品</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[11px] px-2 py-0.5 rounded-sm">第3類医薬品</span>
                    <p className="text-[10.5px] text-red-600 font-bold block w-full mt-1">※要指導医薬品は対面必須・ネット未陳列です</p>
                  </div>
                </div>

                {/* 6. Opening hours vs. Specific internet checkout support hours */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 border-l-4 border-amber-500/80 pl-2 bg-amber-50/20">
                  <span className="font-extrabold text-amber-900 block sm:col-span-1">
                    開店時間 ＆ 特定販売を行う時間
                  </span>
                  <div className="sm:col-span-2 text-slate-900 space-y-2">
                    <div>
                      <span className="bg-amber-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded mr-1.5 inline-block">実店舗の営業時間</span>
                      <p className="text-xs inline font-bold">月～金 : 9:00 - 13:00</p>
                      <p className="text-[10px] text-slate-500">（土日・祝日はお休みとなっております）</p>
                    </div>
                    <div className="pt-1 border-t border-dashed border-slate-200">
                      <span className="bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded mr-1.5 inline-block">特定販売（ネット窓口）を行う時間</span>
                      <p className="text-xs inline font-extrabold text-emerald-800">月～金 : 9:00 - 13:00</p>
                      <p className="text-[10px] text-slate-600 leading-normal">
                        ・相談対応時間：実店舗の営業時間内に準じ、有資格者が電話（06-6121-2982）にて随時対応します。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Guaranteed expiration dates */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 border-l-4 border-emerald-600/80 pl-2 bg-emerald-50/20">
                  <span className="font-extrabold text-emerald-800 block sm:col-span-1">医薬品の使用期限に関する保証</span>
                  <div className="sm:col-span-2 text-slate-950 font-bold space-y-1">
                    <p className="text-sm">出荷時まで【使用期限まで180日以上（約6ヶ月以上）】あるものをお送りします</p>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                      当店にて取り扱い及び特定販売を広告する一般用医薬品については、すべて管理薬剤師の管理のもと有効期限を徹底監査し、期限切れ間近のものは自動的に排除、お届けの時点でも十分な試用が可能な製品のみを発送する基準を保証します。
                    </p>
                  </div>
                </div>

                {/* 8. Emergency contact */}
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-extrabold text-slate-600 block sm:col-span-1">お問合せ窓口</span>
                  <div className="sm:col-span-2 text-slate-900 space-y-2">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-bold">店舗 : 06-6121-2982 / FAX : 06-6121-2983</span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      ※大阪市中央区保健所などの公的機関のご相談専用ダイヤルも完備し適切に監督を受けております。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Photos Showcase Card (主要な外観の写真 ＆ 陳列の状況を示す写真) */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" id="compliance-photos-card">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Camera className="h-6 w-6 text-emerald-300" />
                <div>
                  <h3 className="font-extrabold text-base">実店舗の主要な外観 ＆ お薬陳列の状況写真</h3>
                  <p className="text-[10.5px] text-emerald-100">省令适合の確認材料としての薬局デジタルツイン写真</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold border border-emerald-800 px-2 py-0.5 rounded">法定書類添付品</span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Photo 1: Primary Exterior */}
              <div className="space-y-3">
                <span className="bg-emerald-100 text-emerald-805 text-[11px] font-black px-2.5 py-1 rounded inline-block">
                  薬局（店舗）の主要な外観写真
                </span>
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group shadow-sm">
                  <img 
                    src="https://i.postimg.cc/x162cmQQ/deb4efc8e1084142294e787d05ec952b.jpg" 
                    alt="京和薬局の外観写真"
                    className="h-full w-full object-cover"
                    onClick={() => {}}
                    onError={(e) => {
                      // Fallback visual illustration if images render state complaints
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  店舗の間口は島之内の大通りから容易に視認可能な全面ガラス張り構造となっております。出入口付近には認可を受けた店舗販売業許可証の看板が掲示されています。
                </p>
              </div>

              {/* Photo 2: Shelves Display Status */}
              <div className="space-y-3">
                <span className="bg-emerald-100 text-emerald-805 text-[11px] font-black px-2.5 py-1 rounded inline-block">
                  一般用医薬品の陳列の状況を示す写真
                </span>
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group shadow-sm">
                  <img 
                    src="https://i.postimg.cc/fRR4nbdD/f6aba635e93500400e7eb1dd518e4905.jpg" 
                    alt="医薬品の陳列状況写真"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  一般用医薬品は、スタッフ管理型カウンター付き棚に陳列しております。指定第2類医薬品はカウンターから7m以内の範囲に独立して配置し、資格者の目が完全に行き届く体制です。
                </p>
              </div>

            </div>
          </section>

          {/* Shift Table: 現在勤務している薬剤師の別及びその氏名 */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4" id="active-pharmacist-roster">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-emerald-700 font-extrabold text-xs tracking-wide">● 有資格者常駐証明</span>
              <h4 className="font-extrabold text-base text-slate-900 mt-0.5">現在勤務している薬剤師又は登録販売者の別及び氏名</h4>
              <p className="text-slate-400 text-xs mt-1">
                対面販売、インターネット経由の特定販売相談の監督を担っている資格者名簿。
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                    <th className="p-3">有資格者の別(職能)</th>
                    <th className="p-3">氏名 / 登録記号</th>
                    <th className="p-3">担当業務・常駐区分</th>
                    <th className="p-3 text-right">現在の勤務状況</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3">
                      <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-sm">
                        薬剤師
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">村上 恵子</div>
                      <div className="text-[10px] text-slate-400">登録番号：第123456号</div>
                    </td>
                    <td className="p-3 leading-relaxed">
                      店舗統括管理、医薬品販売説明、セルフメディケーション指導、最終処方確認
                    </td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span> 店頭在籍中 (対応中)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="bg-amber-50/70 border border-amber-100 p-3 rounded-xl text-[11px] text-amber-900">
              ※特定販売におけるご注文・相談についても、常に現役の「薬剤師」村上が店舗営業時間内に順次リアルタイム審査、包装適合性チェックを行ったのちに発送手配をさせて頂きます。
            </p>
          </section>

        </div>

        {/* Right Side: Interactive Program Simulator responding to "個別販売ページ、販売する医薬品一覧、検索結果等"
            (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Statutory Verification Hub for Online Screens (医薬品の表示内容の実地台帳確認) */}
          <section className="bg-slate-950 text-white rounded-3xl border border-slate-900 shadow-md p-6 space-y-6" id="compliance-simulator-card">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-amber-400 font-bold text-xs tracking-wider uppercase block">
                ★ 提出書類・画面要素監査サポート
              </span>
              <h3 className="text-lg font-extrabold text-white mt-1">
                特定販売における医薬品の「表示内容」の検証デモ
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                審査材料（個別販売ページ、医薬品一覧、検索結果等）が、どのように法規を満たしているのか。本システムのデジタル検証シミュレーターでお確かめいただけます。
              </p>
            </div>

            {/* Simulated Live Interface Sandbox */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[10.5px] font-bold text-slate-400 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span> [実機検証画面]
                </span>
                <span className="text-[9px] text-amber-400 font-extrabold uppercase">
                  適合試験中
                </span>
              </div>

              {/* 1. Category search filters test (医薬品一覧と検索結果) */}
              <div className="space-y-2">
                <label className="text-[10.5px] font-bold text-slate-350 block">【検証1】 検索結果 & カテゴリー一覧 (医薬品一覧)</label>
                <div className="flex gap-1.5">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="薬の商品名、または症状を入力..."
                      value={demoSearchTerm}
                      onChange={(e) => setDemoSearchTerm(e.currentTarget.value)}
                      className="w-full bg-slate-950 text-slate-205 border border-slate-800 rounded-lg py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                  <select
                    value={demoFilterCategory}
                    onChange={(e: any) => setDemoFilterCategory(e.target.value)}
                    className="bg-slate-950 text-slate-205 border border-slate-800 rounded-lg px-2 text-[11px] font-bold focus:outline-none focus:border-emerald-500 text-white"
                  >
                    <option value="すべて">すべて</option>
                    <option value="指定第2類医薬品">指定第2類</option>
                    <option value="第2類医薬品">第2類</option>
                    <option value="第3類医薬品">第3類</option>
                  </select>
                </div>

                {/* Filter Output */}
                <div className="max-h-36 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 pr-1 py-1">
                  {filteredDemoDrugs.length === 0 ? (
                    <p className="text-[10px] text-slate-500 text-center py-4">条件に合致する医薬品はありません。</p>
                  ) : (
                    filteredDemoDrugs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDemoDrug(d)}
                        className={`w-full text-left p-2 rounded-lg border text-xs transition flex items-center justify-between gap-2 cursor-pointer ${
                          selectedDemoDrug.id === d.id
                            ? 'bg-emerald-950/40 border-emerald-500 text-white'
                            : 'bg-slate-950/20 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className={`inline-block text-[8px] font-extrabold px-1.5 mr-1.5 rounded-sm ${
                            d.category === '指定第2類医薬品'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : d.category === '第2類医薬品'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {d.category.replace('医薬品', '')}
                          </span>
                          <span className="font-extrabold truncate">{d.name}</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* 2. Isolated individual drug display mockup (個別販売ページ & 禁忌事項明確化) */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="text-[10.5px] font-bold text-slate-350 block">【検証2】 個別医薬品の販売・製品表示詳細 (個別販売ページ)</label>
                
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                      <span className={`inline-block text-[9px] font-black tracking-wide px-2 py-0.5 rounded-sm ${
                        selectedDemoDrug.category === '指定第2類医薬品'
                          ? 'bg-red-600 text-white'
                          : selectedDemoDrug.category === '第2類医薬品'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {selectedDemoDrug.category}
                      </span>
                      <h4 className="font-black text-sm text-slate-100">{selectedDemoDrug.name}</h4>
                    </div>
                    <span className="text-amber-400 text-sm font-black text-right shrink-0">
                      販売価格(税込): ¥1,480
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] leading-relaxed text-slate-300">
                    <div>
                      <span className="text-slate-500 block">● 効能効果</span>
                      <span className="font-medium text-slate-200">{selectedDemoDrug.effects}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">● 用法用量</span>
                      <span className="font-medium text-slate-200">{selectedDemoDrug.usage}</span>
                    </div>
                  </div>

                  {/* Guaranteed drug expiration label for auditing */}
                  <div className="p-2 rounded bg-slate-900 border border-slate-800/60 text-[10px]" id="demo-expiry-badge">
                    <span className="text-emerald-400 font-extrabold block">✓ 品質使用期限保証の適合掲示</span>
                    <span className="text-slate-300">出荷時最低保証 : 【180日（約6ヶ月）以上】あるもののみ配送</span>
                  </div>

                  {/* Red Alert warning details demonstrating strict compliance for designated class II */}
                  {selectedDemoDrug.category === '指定第2類医薬品' && (
                    <div className="bg-red-950/40 border border-red-500/20 rounded-lg p-2.5 space-y-2 animate-pulse">
                      <div className="flex items-center gap-1 text-red-400 text-[10px] font-bold">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>【指定第二類医薬品の禁忌確認・相談勧告規定】</span>
                      </div>
                      <p className="text-[10px] text-red-200 leading-normal">
                        本医薬品は、小児、妊婦、重篤な持病がある方には深刻な副作用リスクがございます。購入・服用される前に、必ず添付の製品詳細文書に記載された<strong>「してはいけないこと（禁忌）」</strong>をご確認のうえ、薬剤師または主治医にご相談ください。
                      </p>
                      <button 
                        onClick={() => setShowDetailDialog(true)}
                        className="w-full bg-red-650 hover:bg-red-600 text-white font-bold text-[10px] py-1.5 px-2 rounded-sm cursor-pointer transition flex items-center justify-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>法定の禁忌詳細と注意喚起を表示する</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Checklists proving online page completeness */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-400">特定販売の適合条件チェックリスト（画像赤枠対応状況）</span>
              <ul className="space-y-2 text-[11px] text-slate-300">
                <li className="flex items-start gap-2 text-emerald-400 font-bold">
                  <span className="h-4 w-4 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>ホームページのトップページ：実店舗、お問合せ窓口、許可情報を一元配置</span>
                </li>
                <li className="flex items-start gap-2 text-emerald-400 font-bold">
                  <span className="h-4 w-4 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>指定薬品の表示内容：個別販売ページの禁忌警告（赤帯）、リスク分類の表示テスト済</span>
                </li>
                <li className="flex items-start gap-2 text-emerald-400 font-bold">
                  <span className="h-4 w-4 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>医薬品一覧及び検索結果：カテゴリーフィルタによる薬機法適合リストと検索シミュレーター</span>
                </li>
                <li className="flex items-start gap-2 text-emerald-400 font-bold">
                  <span className="h-4 w-4 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>医薬品の使用期限：販売開始、個別詳細における180日以上の有効期限明記基準完備</span>
                </li>
              </ul>
            </div>

          </section>

          {/* PMDA Public Welfare Information Card */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4" id="pmda-welfare-info">
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded">
              医薬品副作用被害救済制度（公的扶助）
            </span>
            <div className="space-y-2">
              <h4 className="font-extrabold text-sm text-slate-900 leading-tight">PMDAの救済制度についてのご案内</h4>
              <p className="text-xs text-slate-605 leading-relaxed">
                万が一、医薬品を適正に使用したにもかかわらず、急な副作用により入院を必要とするほどの重篤な健康被害や障害が生じた場合は、独立行政法人 医薬品医療機器総合機構（PMDA）による「医薬品副作用被害救済制度」に基づき、医療費、障害年金、遺族年金などの救済給付が受けられます。
              </p>
            </div>
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">PMDA お問合せダイヤル</span>
              <p className="text-base font-black text-slate-900 leading-none">0120-149-931</p>
              <p className="text-[10px] text-slate-500">（受付時間：月曜～金曜 9:00～17:00 / 祝日・年末年始除く）</p>
            </div>
          </section>

        </div>

      </div>

      {/* Mandatory popup simulation modal that reviews warnings, proving legal compliance with class II rules */}
      {showDetailDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" id="compliance-warning-modal">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-100 shadow-2xl p-6 relative overflow-hidden text-slate-800">
            <div className="absolute top-0 left-0 right-0 h-2 bg-red-600"></div>
            
            <div className="space-y-4 pt-1">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
                <h4 className="text-lg font-black">{selectedDemoDrug.name} の「してはいけないこと（禁忌）」</h4>
              </div>

              <div className="space-y-3 mt-4 text-xs sm:text-sm">
                
                {/* Simulated caution sections */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-2">
                  <span className="bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded tracking-wide uppercase inline-block">
                    してはいけないこと (服用禁忌)
                  </span>
                  <p className="text-[11.5px] font-bold text-red-950 leading-relaxed">
                    ・次の人は使用・服用しないでください：
                  </p>
                  <p className="text-xs text-red-800 leading-relaxed font-semibold pl-2">
                    1. 本剤又は本剤の成分によりアレルギー症状を起こしたことがある人。<br />
                    2. 15歳未満の小児。<br />
                    3. 授乳中の方（または服用を避けるか、授乳を中止してください）。<br />
                    4. 出産予定日12週以内の妊婦。
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <span className="bg-slate-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded tracking-wide uppercase inline-block">
                    相談すること物・注意事項
                  </span>
                  <p className="text-xs text-slate-705 leading-relaxed">
                    医師若しくは歯科医師の治療を受けている人、又は本人若しくは家族がアレルギー体質の方は、ご使用前に主治医やお薬相談窓口（実地の管理薬剤師）へ必ずご相談の上で決定してください。
                  </p>
                </div>

              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowDetailDialog(false)}
                  className="bg-slate-900 border border-slate-950 text-white hover:bg-slate-800 font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition"
                >
                  確認しました（閉じる）
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
