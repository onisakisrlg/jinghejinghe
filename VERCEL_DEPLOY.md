# 京和薬局ウェブサイト Vercel デプロイガイド (Deployment Guide)

このプロジェクトは **React + Vite** の高速なフロントエンドと、**Vercel Serverless Functions** による軽量なAI・バックエンド API がシームレスに統合されています。
以下の手順を実行するだけで、Vercel 上にわずか数分でインターネット薬局サイトを完全公開することができます。

---

## 🚀 デプロイのステップ (クイックスタート)

### 方法1: Vercel ダッシュボード (GitHub連携がおすすめ)

1. このプロジェクトのソースコードを **GitHub** レポジトリにプッシュします。
2. [Vercel ダッシュボード](https://vercel.com/dashboard)にログインし、「**Add New**」 > 「**Project**」をクリックします。
3. インポートしたレポジトリを選択します。
4. **Configure Project (ビルド設定)**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build:vercel` （または `vite build`）
   - **Output Directory**: `dist`
5. **Environment Variables (環境変数)**:
   - `GEMINI_API_KEY`: 取得した Google Gemini API キーを値にセットします。
   - ※ 設定しない場合でも、お薬相談チャットは親切な「**デモアシスタントモード**」として自動で機能し、エラーにならずに安全にデモンストレーションがお使いいただけます。
6. 「**Deploy**」ボタンをクリックします。1分ほどで URL が自動生成され全世界に公開されます！

### 方法2: Vercel CLI (コマンドライン経由)

ローカルマシンからコマンドで1秒デプロイ：
```bash
# Vercel CLIのインストール
npm install -g vercel

# ログインとデプロイ
vercel
```

---

## 🛠️ なぜこの構成がVercelで最適に動くのか

1. **`vercel.json` による SPA ルーティング**:
   - 京和薬局サイト内の「商品分類・お薬一覧」や「特定販売公示」などのタブを直接URL（例: `https://.../compliance`）で直叩き、または更新した際にも、Vercelが404を出さずに正常にルーティング（SPAフォールバック）します。
2. **`api/chat.ts` サーバーレス関数**:
   - 本番サーバーを用意することなく、VercelのインフラがAIお薬相談のバックエンドAPIを自動作成・スケールさせます。
3. **静的アセット出力**:
   - 静的出力は高速な Vercel CDN より極めて低レイテンシーで瞬時に配信されます。
