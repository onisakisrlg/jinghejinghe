import React from 'react';
import { COMPLIANCE_INFO } from '../data';
import { Phone, Mail, AlertTriangle, Printer } from 'lucide-react';

export default function ContactSection() {
  return (
    <div id="contact-section" className="max-w-4xl mx-auto animate-fade-in text-slate-800">
      <div className="space-y-8">
        {/* Real Contacts info block */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6" id="digital-channels-card">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-lg text-slate-905">お問合わせルート</h3>
            <p className="text-slate-400 text-xs text-slate-500">お急ぎの方、実地でのお答えをご希望の方、処方箋の質問はこちら。</p>
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">店舗直通電話番号</span>
                <span className="text-lg font-black text-slate-900">{COMPLIANCE_INFO.tel}</span>
                <span className="text-[10px] text-slate-500 block">※営業時間内のご対応となります</span>
              </div>
            </div>

            {/* FAX */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg shrink-0">
                <Printer className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">ファックス番号 (FAX)</span>
                <span className="text-base font-bold text-slate-900">{COMPLIANCE_INFO.fax}</span>
                <span className="text-[10px] text-slate-500 block">※随時受信可能です</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">電子メール</span>
                <span className="text-base font-medium text-emerald-805 select-all">{COMPLIANCE_INFO.email}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
