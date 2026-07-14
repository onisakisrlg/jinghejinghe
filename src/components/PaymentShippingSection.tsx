import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CreditCard, Truck, AlertCircle, ShieldCheck, Landmark, CheckCircle, Wallet } from 'lucide-react';

export default function PaymentShippingSection() {
  const { language } = useLanguage();

  // Content in 3 languages to match the app's multilingual capabilities
  const content = {
    ja: {
      paymentTitle: 'お支払い方法について',
      paymentDesc: '以下のお支払い方法がご利用いただけます。',
      paymentMethods: [
        'クレジットカード（VISA、MasterCard、JCBなど）',
        '銀行振込',
        '代金引換（手数料がかかる場合があります）',
        'コンビニ決済',
        '電子マネー（PayPay、楽天ペイなど）'
      ],
      paymentNote: '※ご注文後、指定の方法でお支払いをお願いいたします。銀行振込の場合は、ご入金確認後に発送手続きをいたします。',
      
      shippingTitle: '発送方法について',
      shippingDesc: 'ご注文商品は、以下の方法で発送いたします。',
      shippingMethods: [
        '宅配便（ヤマト運輸、日本郵便、佐川急便など）'
      ],
      shippingNote1: '※ご入金確認後、通常1〜3営業日以内に発送いたします。発送方法のご指定がある場合は、ご注文時にご連絡ください。',
      shippingNote2: '※送料はご注文内容や配送地域によって異なります。詳細は注文時にご案内いたします。',
      
      badgeText: '安心安全な取引決済・迅速配送保証',
    },
    zh: {
      paymentTitle: '关于支付方式',
      paymentDesc: '您可以使用以下支付方式。',
      paymentMethods: [
        '信用卡（VISA、MasterCard、JCB 等）',
        '银行转账',
        '货到付款（可能会收取手续费）',
        '便利店支付',
        '电子货币（PayPay、乐天支付等）'
      ],
      paymentNote: '※下单后，请按照指定的方式进行支付。如果选择银行转账，我们将在确认收到款项后为您安排发货。',
      
      shippingTitle: '关于配送方式',
      shippingDesc: '您的订单商品将通过以下方式发送：',
      shippingMethods: [
        '快递（雅玛多运输、日本邮政、佐川急便等）'
      ],
      shippingNote1: '※确认收到货款后，通常在 1 至 3 个工作日内发货。如需指定配送方式，请在下单时联系我们。',
      shippingNote2: '※运费因订单内容和配送地区而异。详情将在下单时告知。',
      
      badgeText: '安全支付与快速配送保证',
    },
    en: {
      paymentTitle: 'Payment Methods',
      paymentDesc: 'The following payment methods are accepted:',
      paymentMethods: [
        'Credit Card (VISA, MasterCard, JCB, etc.)',
        'Bank Transfer',
        'Cash on Delivery (Fees may apply)',
        'Convenience Store Payment',
        'Electronic Money (PayPay, Rakuten Pay, etc.)'
      ],
      paymentNote: '* Please pay using the designated method after ordering. For bank transfers, shipping will proceed after payment confirmation.',
      
      shippingTitle: 'Shipping Methods',
      shippingDesc: 'Ordered products will be shipped using the following method:',
      shippingMethods: [
        'Courier Service (Yamato Transport, Japan Post, Sagawa Express, etc.)'
      ],
      shippingNote1: '* Orders will be shipped within 1-3 business days after payment confirmation. If you have a preferred shipping method, please contact us when placing your order.',
      shippingNote2: '* Shipping fees vary depending on the order details and delivery area. Details will be provided at the time of ordering.',
      
      badgeText: 'Secure Payments & Prompt Delivery Guarantee',
    }
  };

  const t = content[language as 'ja' | 'zh' | 'en'] || content.ja;

  return (
    <section 
      id="payment-shipping-footer-section" 
      className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            {t.badgeText}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'zh' ? '支付与配送说明' : language === 'en' ? 'Payment & Delivery Info' : 'お支払い・配送方法のご案内'}
          </h2>
          <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
        </div>

        {/* 2-Column Grid for Payment & Shipping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          
          {/* Payment Card */}
          <div 
            id="payment-info-card"
            className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-sm">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{t.paymentTitle}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{t.paymentDesc}</p>
                </div>
              </div>

              {/* Methods List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {t.paymentMethods.map((method, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2.5 bg-white border border-slate-100 rounded-xl p-3 shadow-xs"
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-xs font-bold text-slate-800">{method}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification / Warning note */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-emerald-950 text-xs">
              <AlertCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-emerald-900 font-medium">{t.paymentNote}</p>
            </div>
          </div>

          {/* Shipping Card */}
          <div 
            id="shipping-info-card"
            className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-sm">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{t.shippingTitle}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{t.shippingDesc}</p>
                </div>
              </div>

              {/* Courier service details */}
              <div className="pt-2">
                {t.shippingMethods.map((method, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-xs"
                  >
                    <div className="bg-emerald-50 p-2 rounded-xl">
                      <Landmark className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-400 block tracking-wider">
                        {language === 'zh' ? '指定物流服务' : language === 'en' ? 'Designated Couriers' : '配送会社'}
                      </span>
                      <span className="text-sm font-black text-slate-900">{method}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping notes */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2.5 text-xs text-emerald-950">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-emerald-900 font-medium">{t.shippingNote1}</p>
              </div>
              <div className="border-t border-emerald-100/60 pt-2.5 flex gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-emerald-900 font-medium">{t.shippingNote2}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
