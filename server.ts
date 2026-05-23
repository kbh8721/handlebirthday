import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Allow CORS for mobile app webviews (like Android exports)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  // API Route for Gemini MBTI + Tarot Reading
  app.post("/api/mbti-reading", async (req, res) => {
    try {
      const { mbti, targetCards } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is missing. Please set the GEMINI_API_KEY environment variable." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `사용자의 MBTI는 ${mbti}이고, 사용자의 타로 카드 결과는 다음과 같습니다:
- ${targetCards.join(", ")}

이 두 가지(MBTI 성향과 부여된 생일 타로 카드)를 결합하여 사용자의 성향, 잠재력, 그리고 앞으로 나아가야 할 방향성에 대해 신비롭고 긍정적인 운세/성향 분석을 작성해주세요.
분석은 과장되지 않고, 너무 전문적이거나 딱딱하지 않게 친근하고 따뜻한 어조로 작성해주며, 전체 분량은 3~4문단 정도로 깔끔하게 정리해주세요. 
마크다운 형식(소제목 등)을 사용하여 보기 좋게 구성해 주세요.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      res.json({ reading: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to generate reading" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
