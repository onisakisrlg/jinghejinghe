import React from 'react';
import { SAMPLE_NEWS } from '../data';
import { Calendar, Tag, Sparkles } from 'lucide-react';

export default function NewsSection() {
  return (
    <div id="news-section" className="space-y-8 animate-fade-in text-slate-800">
      <div className="text-left space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">新着情報 ・ のお知らせ</h2>
        <p className="text-slate-500 text-sm">京和薬局の最新の営業スケジュール、地域医療の状況、コラム案内など。</p>
      </div>

      <div className="space-y-6">
        {SAMPLE_NEWS.map((item) => {
          return (
            <article 
              key={item.id} 
              id={`news-item-${item.id}`}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs transition hover:shadow-md cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                    item.category === 'お知らせ' 
                      ? 'bg-blue-50 text-blue-700' 
                      : item.category === '営業案内' 
                      ? 'bg-red-50 text-red-700' 
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    <Tag className="h-3 w-3" />
                    {item.category}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
