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
                <span className="text-[10px] text-slate-500 block">※24時間受信可能です</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="flex items-start space-x-3.5 bg-red-50 border border-red-100 rounded-xl p-3">
              <div className="bg-red-100 text-red-700 p-2 rounded-lg shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-red-800 block tracking-wider">深夜・24時間緊急連絡先</span>
                <span className="text-base font-extrabold text-red-950">{COMPLIANCE_INFO.emergencyTel}</span>
                <span className="text-[9px] text-red-700 block">※お薬服用後の急な副作用やトラブル等専用ダイヤルです</span>
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

            {/* LINE Link */}
            <div className="border border-green-200 bg-green-50/50 rounded-xl p-4 flex items-center justify-between gap-4" id="line-qr-link">
              <div className="space-y-1">
                <span className="bg-green-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full inline-block">公式 LINE</span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">LINEから処方箋を事前送信</h4>
                <p className="text-[10px] text-slate-500">
                  お友達追加のうえ、お手元の処方箋写真を送信いただければ、お呼び出しがスムーズになります。
                </p>
              </div>
              <div className="bg-white shrink-0 p-1.5 border border-green-200 rounded-lg shadow-inner text-center">
                <div className="h-16 w-16 bg-slate-200 border border-slate-300 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">
                  [ QR ]
                </div>
                <span className="text-[8px] text-green-700 font-bold block mt-1">京和薬局 LINE</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
