import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI pharmacist chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          text: "【デモモード作動中】現在、Gemini APIキーが設定されていません。アプリ右上の「Settings > Secrets」パネルで「GEMINI_API_KEY」を設定してください。\n\n（以下はデモ用メッセージです）\n京和薬局のAIお薬相談窓口へようこそ！ご質問があれば何でもお聞きください。指定第2類医薬品は、禁忌事項の確認が極めて重要ですので、必ず説明書をご確認のうえ、妊婦・小児の方は十分にご注意ください。必要であれば、実店舗の薬剤師（山田 和也）へお気軽にお問い合わせください。",
          isDemo: true
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prepare contents in the correct format for ai.models.generateContent
      const contents = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const systemInstruction = `あなたは「京和薬局（京和薬局株式会社）」のAIお薬相談窓口（AI薬剤師）です。
京和薬局は、大阪府大阪市中央区島之内１丁目１４−８ 長堀小谷マンション 1F に実在する親しみやすく安心できる調剤・漢方・一般用医薬品販売を行う薬局です。
相談者に対して、誠実、親切、礼儀正しく、かつプロとしての安心感を与える日本語でお答えください。

【お薬に関する質問への対応ルール】
1. 指定第2類医薬品について：
   - 指定第2類医薬品は「第2類医薬品の中でも特に禁忌の確認が必要な医薬品」であることを明确に伝えてください。
   - 相談者または使用者が小児、妊婦、授乳婦、重い持病、他のお薬を常用中である場合は、必ず「禁忌・注意事項の確認を徹底してください。事前に実地の薬剤師、登録販売者、または主治医にご相談ください」と重要な注意（勧告）を添えてください。
2. 禁忌情報の案内：
   - 医薬品を使用・服用する前には、パッケージに同封されている添付文書（説明書）の「してはいけないこと（禁忌）」や用法用量を必ずご確認いただくよう、常に意識を促してください。
3. 要指導医薬品について：
   - 要指導医薬品（医療用から一般用に移行したばかりのお薬や劇薬など）は、オンライン販売が法律上禁止されているため、直接お近くの薬局（対面）でしか販売できません。
   - 要指導医薬品についての問い合わせには、大阪市中央区・島之内の実店舗へのご来店か、医療機関での受診を案内してください。
4. お店への連携：
   - 必要に応じて、京和薬局の実店舗への電話（06-6121-2982）や、管理薬剤師（山田 和也：薬剤師名簿登録）への相談を案内してください。
   - 重い自覚症状がある場合、または緊急の場合は、ただちに医療機関（医師）を受診するよう強く指導してください。
5. PMDAについて：
   - 重大な副作用等による健康被害が生じた場合に治療費等を給付する「医薬品副作用被害救済制度（PMDA健康被害救済制度：フリーダイヤル 0120-149-931）」について、必要に応じて案内してください。`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Server running on http://localhost:${PORT}`);
  });
}

startServer();
