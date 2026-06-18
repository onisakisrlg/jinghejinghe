import React, { useRef, useEffect } from 'react';
import { COMPLIANCE_INFO } from '../data';
import { ChatMessage } from '../types';
import { Phone, Mail, MessageSquare, Send, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';

export default function ContactSection() {
  // Contact Form State
  const [formName, setFormName] = React.useState('');
  const [formEmail, setFormEmail] = React.useState('');
  const [formPhone, setFormPhone] = React.useState('');
  const [formContent, setFormContent] = React.useState('');
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  // Chat/AI State
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    {
      id: "m0",
      role: 'assistant',
      content: "お薬相談窓口へようこそ。京和薬局のAIお薬相談窓口（AI薬剤師）です。お客様の気になる症状、第2類・第3類・指定第2類医薬品の使い方、漢方の選び方など、何でもお手伝いいたします。お気軽にご質問ください。\n\n※指定第2類医薬品については禁忌を必ずご確認いただきます。服用前には主治医や実地薬剤師へ相談を勧告しております。",
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = React.useState('');
  const [chatLoading, setChatLoading] = React.useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, chatLoading]);

  // Submission handler for Contact Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formContent) return;
    setFormSubmitted(true);
    // Simple state reset
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormContent('');
  };

  // Chat submit action
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `m-u-${Date.now()}`,
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      // Prepare previous history for context
      const chatHistory = [...chatMessages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `m-a-${Date.now()}`,
        role: 'assistant',
        content: data.text || "申し訳ありません。回答を生成できませんでした。しばらくしてから再度お試しください。",
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
        isDemo: data.isDemo
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const assistantMsg: ChatMessage = {
        id: `m-a-err-${Date.now()}`,
        role: 'assistant',
        content: "【接続エラー】サーバー情報が取得できません。またはインターネット接続をお確かめください。",
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const applyKeyword = (text: string) => {
    setChatInput(text);
  };

  return (
    <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-slate-800">
      
      {/* Contact Channels and General Inquiries (cols 1-5) */}
      <div className="lg:col-span-5 space-y-8">
        
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

        {/* Traditional Form Panel */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm" id="traditional-form-container">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-bold text-lg text-slate-905">メールでお問合せ</h3>
            <p className="text-slate-400 text-xs">必要事項を入力し、送信ボタンを押してください。</p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-center space-y-3 animate-fade-in" id="form-success-banner">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">お問合せを送信いたしました</h4>
              <p className="text-xs text-slate-605">
                ご入力いただいたメールアドレス宛に、2営業日以内に担当薬剤師（山田）よりご回答差し上げます。今しばらくお待ちください。
              </p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-semibold text-emerald-805 hover:underline cursor-pointer"
                id="reset-form-btn"
              >
                新規に入力する
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4" id="inquiry-form">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">お名前 (必須)</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="例：山田 太郎"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">メールアドレス (必須)</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="例：taro@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">お電話番号 (任意)</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="例：06-6121-2982"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">お問合せ内容 (必須)</label>
                <textarea
                  rows={4}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="お薬のご質問、お求め、漢方の在庫、処方箋の受付についてなど..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 resize-none animate-none"
                />
              </div>

              <button
                type="submit"
                id="submit-inquiry-btn"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition duration-150 cursor-pointer"
              >
                お問合せを決定する
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Interactive AI Pharmacist Workspace (cols 6-12) */}
      <div className="lg:col-span-7 flex flex-col h-[700px] bg-white rounded-2xl border border-slate-105 shadow-sm overflow-hidden" id="ai-chat-workspace">
        {/* Chat top header with AI badges */}
        <div className="bg-radial from-slate-900 to-slate-950 p-4 shrink-0 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-400 text-slate-950 h-10 w-10 rounded-xl flex items-center justify-center font-black shadow-lg shadow-amber-500/20 animate-pulse">
              薬AI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white">京和薬局 AI お薬相談窓口</span>
                <span className="bg-emerald-500 text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                  <span className="h-1 w-1 bg-white rounded-full"></span> 稼働中
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">指定第2類・2類・3類薬のご利用サポートとアドバイス</p>
            </div>
          </div>
          <p className="text-[10px] text-amber-400 tracking-wider font-bold shrink-0 block">查 AI</p>
        </div>

        {/* Conversation flow container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70" id="chat-messages-container">
          {chatMessages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/10">
                    AI
                  </div>
                )}
                <div className="space-y-1">
                  <div
                    className={`rounded-2xl p-4.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-850 rounded-tl-none border border-slate-200/60'
                    }`}
                  >
                    <p className="whitespace-pre-line break-words">{msg.content}</p>
                    {msg.isDemo && (
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>デモ応答：SecretsにGEMINI_API_KEYを登録いただくとリアル回答になります。</span>
                      </div>
                    )}
                  </div>
                  <span className={`block text-[9px] text-slate-400 ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {chatLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 animate-pulse">
                …
              </div>
              <div className="bg-slate-100 border border-slate-200/70 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center space-x-2 text-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-slate-550 pl-1 font-medium">お薬の安全性・添付情報を審査中...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Cautions reminders */}
        <div className="bg-amber-50/50 border-t border-b border-amber-100 p-3 flex items-start gap-2 shrink-0">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
          <p className="text-[10px] text-amber-900 leading-normal">
            <strong>重要合規免責事項：</strong>当AIお薬案内は患者様の説明書の理解を補助する目的で構築されており、医師の診断や実地薬剤師による直接管理に代わるものではありません。処方の決定・服用前には必ず添付文書の禁忌を厳守してください。
          </p>
        </div>

        {/* Keywords shortcuts */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 shrink-0 overflow-x-auto flex gap-1.5 scrollbar-none items-center">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 mr-1">クイック質問：</span>
          <button
            onClick={() => applyKeyword("指定第2類医薬品はなぜ「禁忌」の徹底確認が必要なのですか？")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 text-[11px] font-medium transition cursor-pointer whitespace-nowrap"
            id="shortcut-btn-1"
          >
            指定第2類医薬品の禁忌
          </button>
          <button
            onClick={() => applyKeyword("葛根湯の正しい用法と効果的な飲むタイミングを教えてください。")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 text-[11px] font-medium transition cursor-pointer whitespace-nowrap"
            id="shortcut-btn-2"
          >
            葛根湯の正しい説明
          </button>
          <button
            onClick={() => applyKeyword("お薬の副作用被害が生じた際、PMDAの健康被害救済制度はどう使えますか？")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 text-[11px] font-medium transition cursor-pointer whitespace-nowrap"
            id="shortcut-btn-3"
          >
            PMDA健康救済とは
          </button>
        </div>

        {/* Chat input box */}
        <div className="p-4 bg-white shrink-0 border-t border-slate-200">
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              id="ai-chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="お薬に関する疑問、症状などを質問してください..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
            />
            <button
              type="submit"
              id="ai-chat-send-btn"
              disabled={!chatInput.trim() || chatLoading}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold px-5 py-3 rounded-xl transition duration-150 cursor-pointer flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/10"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
