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

이 두 가지(MBTI 성향과 부여된 생일 타로 카드)를 결합하여 사용자의 성향, 잠재력, 관계 방식, 방향성에 대해 깊이 있고 입체적인 운세/성향 분석을 작성해주세요.
타로 카드의 상징성과 MBTI의 인지 기능을 자연스럽게 연결하여 통찰력 있는 해석을 제시해 주세요.
분석은 과장되지 않으면서도 친근하고 따뜻한 어조로 작성해주며, 반드시 다음의 소제목 형식을 포함하여 가독성 좋고 짜임새 있게 구성해 주세요:

### ✨ 타고난 본성과 숨겨진 강점
(MBTI 특징과 양력/음력 카드의 결합 분석)

### 🤝 관계와 소통의 지혜
(해당 성향이 사람들과 어떻게 상호작용하는지, 중간수 카드와 연관하여 조언)

### 🌟 잠재력 만개를 위한 특별한 메시지
(앞으로 나아가야 할 방향과 성장에 대한 따뜻한 조언)

마크다운 형식(볼드체 텍스트, 불릿 포인트 등)을 적극적으로 사용하여 모바일 화면에서도 한눈에 읽기 편하게 작성해 주세요.`;

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
