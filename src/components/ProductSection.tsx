import React from 'react';
import { SAMPLE_DRUGS, COMPLIANCE_INFO } from '../data';
import { Drug, DrugCategory } from '../types';
import { ShieldAlert, Info, HelpCircle, CheckCircle, Search, Sparkles, Check, ChevronDown, ChevronUp, Scale, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductSectionProps {
  setActiveSection: (section: string) => void;
}

export default function ProductSection({ setActiveSection }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<DrugCategory | 'すべて'>('すべて');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedItemId, setExpandedItemId] = React.useState<string | null>('c1');
  const { t } = useLanguage();

  const categories: (DrugCategory | 'すべて')[] = ['すべて', '指定第2類医薬品', '第2類医薬品', '第3類医薬品'];

  const filteredDrugs = SAMPLE_DRUGS.filter((drug) => {
    const matchesCategory = selectedCategory === 'すべて' || drug.category === selectedCategory;
    const matchesSearch = 
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.kana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="product-section" className="space-y-12 animate-fade-in text-slate-800">
      {/* Search and Category navigation header */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">医薬品区分・取扱い薬品一覧</h2>
            <p className="text-slate-500 text-sm">セルフケアやお悩みに合わせて、正しいリスク区分からお選びください。</p>
          </div>
        </div>

        {/* Search bar & Categories tabs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </span>
            <input
              type="text"
              id="drug-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('product.search')}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition duration-200"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-1 border border-slate-200 p-1 bg-slate-50 rounded-xl scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`cat-filter-${cat}`}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-emerald-800 shadow-sm font-bold border border-slate-200'
                    : 'text-slate-500 hover:text-slate-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Drug List */}
      <section className="flex flex-col gap-4">
        {filteredDrugs.length > 0 ? (
          filteredDrugs.map((drug) => {
            const isDesignated2 = drug.category === '指定第2類医薬品';
            return (
              <div
                key={drug.id}
                id={`drug-card-${drug.id}`}
                className={`bg-white rounded-2xl border transition duration-200 flex flex-col md:flex-row gap-4 p-4 hover:shadow-md items-center ${
                  isDesignated2 ? 'border-amber-200/80 shadow-xs' : 'border-slate-100 shadow-xs'
                }`}
              >
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{drug.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      JAN: {drug.janCode}
                    </span>
                    {/* Category tag */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        drug.category === '指定第2類医薬品'
                          ? 'bg-amber-100/90 text-amber-800 border border-amber-200'
                          : drug.category === '第2類医薬品'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {drug.category}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{drug.description}</p>
                  
                  {isDesignated2 && (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-md p-2 text-amber-950 mt-2 flex items-center gap-2" id={`designated-alert-${drug.id}`}>
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <p className="text-[10px] leading-relaxed">
                        指定第2類医薬品です。小児や妊婦、薬物アレルギーのある方は、服用前に禁忌を確認してください。
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 md:gap-2 shrink-0 md:pl-6 md:border-l border-slate-100">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {drug.price}
                  </div>
                  <button 
                    onClick={() => console.log('buy clicked', drug.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition shadow-sm cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{t('product.buy')}</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white border border-slate-100 rounded-2xl p-12 text-center" id="empty-search-state">
            <span className="text-4xl">💊</span>
            <h3 className="font-bold text-slate-905 mt-2">{t('product.empty')}</h3>
            <p className="text-slate-500 text-sm mt-1">{t('product.contact')}</p>
            <button 
              onClick={() => setActiveSection('contact')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl transition cursor-pointer font-bold"
            >
              <span>{t('product.contact')}</span>
            </button>
          </div>
        )}
      </section>

      {/* OTC explanations details block - Definitions, Informative guidelines, displays */}
      <section className="bg-white rounded-3xl border border-slate-105 p-6 sm:p-8 shadow-sm space-y-8" id="otc-explanations-rules">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">医薬品の定義と陳列ルールに関する詳細表示</h3>
          <p className="text-xs text-slate-400 mt-1">京和薬局における合規・法的基準について</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
              <h4>{COMPLIANCE_INFO.lawsAndRules.otcDefinition.title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pl-9">
              {COMPLIANCE_INFO.lawsAndRules.otcDefinition.desc}
            </p>
            <div className="pl-9 text-xs text-slate-500 space-y-1.5 list-disc leading-normal bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-800 mb-1">お薬情報の説明フロー：</div>
              <p>・<strong>第1類医薬品（当店取扱なし）/ 要指導：</strong>薬剤師による対面説明・署名必須。</p>
              <p>・<strong>第2類（指定2類含む）：</strong>薬剤師または登録販売者の専門対応（当店で最も充実している品目です）。</p>
              <p>・<strong>第3類：</strong>購入者任意の希望に基づく適切なご説明フローを整備。</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
              <h4>{COMPLIANCE_INFO.lawsAndRules.displayRule.title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pl-9">
              {COMPLIANCE_INFO.lawsAndRules.displayRule.desc}
            </p>
            
            <div className="pl-9 text-xs border border-amber-100 bg-amber-50/40 text-slate-700 rounded-xl p-4 relative" id="pharmacist-required-crossout-guideline">
              <p className="leading-relaxed font-medium">
                <span className="line-through text-slate-400 font-bold block mb-1">【要指導医薬品のインターネット販売に関する陳列表示】</span>
                法律の改正と対面販売原則により、ネット表示・宅配は不可となっております。当店における「要指導医薬品」のカタログ掲出は完全に取り止めております。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📸 【法定掲示事項のデジタル掲示板】要指導医薬品及び一般用医薬品の販売に関する制度に関する事項 */}
      <section className="bg-white text-slate-900 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8" id="digital-compliance-board">
        <div className="border-b-4 border-emerald-700 pb-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-emerald-900 text-white font-black text-[10px] tracking-widest px-3 py-1 rounded-sm uppercase leading-none">
              薬機法関係省令等・規則第15条の15の別表第1第2号
            </span>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] tracking-wide px-3 py-1 rounded-sm leading-none flex items-center gap-1">
              ★ 提示要件・写真赤枠5項目完全対応
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            【法定掲示】要指導医薬品及び一般用医薬品の販売に関する制度に関する事項
          </h3>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            医薬品医療機器等法（旧薬事法）の省令に基づき、医薬品の販売制度、定義、情報提供、ならびに陳列方法に関する法定掲示項目を公開いたします。京和薬局株式会社は、以下の規定に沿って医薬品をお取り扱いしております。
          </p>
        </div>

        {/* Static Official List Structure */}
        <div className="grid grid-cols-1 gap-6">
          {COMPLIANCE_INFO.lawsAndRules.complianceChecklist?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                id={`compliance-item-${item.id}`}
                className={`p-6 rounded-2xl border transition-all ${
                  item.highlight
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Title & Badge */}
                  <div className="space-y-1.5 md:max-w-[30%] shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-800 font-extrabold text-sm tracking-wide">
                        【第 {index + 1} 項】
                      </span>
                      {item.highlight && (
                        <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wide">
                          写真赤枠対応
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">制度対応規定事項</p>
                  </div>

                  {/* Main text & corporate policy layout */}
                  <div className="flex-1 space-y-3 md:pl-6 md:border-l border-slate-200/80">
                    <div className="bg-white/80 p-3 rounded-lg border border-slate-100/80">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">
                        ● 概要規定
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-extrabold leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-emerald-700 block">
                        ● 京和薬局における具体的な取組み・運用手続
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Statutory Footer seal */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-[11px] text-slate-500 space-y-3">
          <div className="flex items-center gap-1 font-bold text-slate-700">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>法定公示義務の確認済み</span>
          </div>
          <p className="leading-relaxed">
            上記表示は、医薬品、医療機器等の品質、有効性及び安全性の確保等に関する法律等施行規則等に基づき、薬局実店舗およびインターネット等特定販売（オンラインお薬相談含む）における共通事項として掲示しております。<br />
            <strong>公示責任者：</strong> 京和薬局株式会社 管理薬剤師 村上 恵子（大阪市指令大保 第20V00088号）
          </p>
        </div>
      </section>
    </div>
  );
}
