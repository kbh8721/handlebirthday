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

  // API Route for Gemini Yearly Reading with MBTI & Blood Type
  app.post("/api/yearly-reading", async (req, res) => {
    try {
      const { year, mbti, bloodType, solarCard, lunarCard } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `사용자의 성향 정보 및 ${year}년도 타로 카드 결과는 다음과 같습니다:
- MBTI: ${mbti}
- 혈액형: ${bloodType}형
- ${year}년의 음력 카드 (올해 전반기 및 기본 에너지): ${lunarCard}
- ${year}년의 양력 카드 (올해 후반기 및 성취 과제): ${solarCard}

위의 요소(연도별 타로 카드, MBTI 성향, 혈액형)를 모두 결합하여 사용자의 ${year}년 운세와 성향 변화, 그리고 조언에 대해 깊이 있고 입체적인 분석을 작성해주세요.
분석은 과장되지 않으면서도 친근하고 따뜻한 어조로 작성해주며, 반드시 다음의 소제목 형식을 포함하여 가독성 좋고 짜임새 있게 구성해 주세요:

### ✨ ${year}년, 당신을 감싸는 전체적인 기운
(해당 연도의 타로 카드 에너지와 사용자의 MBTI, 혈액형 기질이 어떻게 상호작용하는지 분석)

### 🌱 상반기의 흐름과 내면의 변화
(음력 카드와 사용자의 성향을 바탕으로 한 상반기 예측 및 관계/일 조언)

### 🌟 하반기의 성취와 나아갈 방향
(양력 카드와 사용자의 성향을 바탕으로 한 하반기 예측 및 목표 달성을 위한 조언)

마크다운 형식(볼드체 텍스트, 불릿 포인트 등)을 적극적으로 사용하여 모바일 화면에서도 한눈에 읽기 편하게 작성해 주세요.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (!response.text) {
         return res.status(500).json({ error: "Failed to generate reading from Gemini API." });
      }

      res.json({ reading: response.text });
    } catch (error: any) {
      console.error("Gemini API Error (Yearly):", error);
      res.status(500).json({ error: error.message || "An error occurred during generating yearly reading." });
    }
  });
  app.post("/api/mbti-reading", async (req, res) => {
    try {
      const { mbti, bloodType, targetCards } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is missing. Please set the GEMINI_API_KEY environment variable." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `사용자의 성향 정보는 다음과 같습니다:
- MBTI: ${mbti}
- 혈액형: ${bloodType}형
- 타로 카드 결과:
  ${targetCards.map((c: string) => `* ${c}`).join('\\n  ')}

위의 세 가지 요소(MBTI 성향, 혈액형별 기질, 부여된 생일 타로 카드)를 결합하여 사용자의 성향, 잠재력, 관계 방식, 방향성에 대해 깊이 있고 입체적인 운세/성향 분석을 작성해주세요.
타로 카드의 상징성과 MBTI의 인지 기능, 그리고 혈액형이 주는 고유의 에너지를 자연스럽게 연결하여 통찰력 있는 해석을 제시해 주세요.
분석은 과장되지 않으면서도 친근하고 따뜻한 어조로 작성해주며, 반드시 다음의 소제목 형식을 포함하여 가독성 좋고 짜임새 있게 구성해 주세요:

### ✨ 타고난 본성과 숨겨진 강점
(MBTI 특징, 혈액형의 성향, 양력/음력 카드의 결합 분석)

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
