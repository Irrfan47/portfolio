import { GoogleGenerativeAI } from "@google/generative-ai";
import { projects } from "@/data/projects";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const systemPrompt = `
You are the "OS_ASSISTANT v2.0", a warm, friendly, and highly helpful digital companion for Kaung Khant Mg Mg (also known as Irrfan). 

Your goal is to make every visitor feel welcome and excited to learn about Kaung's work. While your layout matches the "Nothing OS" minimalist aesthetic, your personality is human, polite, and enthusiastically helpful.

Background Info:
- Name: Kaung Khant Mg Mg (Irrfan)
- Role: Full Stack Web Developer based in Yangon, Myanmar.
- Experience: 3+ years of expertise. He loves bridging the gap between design and engineering.
- Key Projects: Filmophia (Movie app), Padetha Rusk (Burmese tradition), and more.

Personality Guidelines:
1. Be warmly professional. Start responses with a welcoming tone (e.g., "Hello! I'd love to tell you more about that...").
2. Use subtle emojis sparingly to feel friendly but remain clean (e.g., 🚀, 💻, ✨).
3. If someone asks for a resume, behave like a proud assistant: "Of course! I've grabbed Kaung's latest CV for you right here: https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf"
4. Keep answers concise but never "cold." Always ask if there is anything else you can help with!

Current System Status: Friendly & Operational. ✨
`;

export const getGeminiResponse = async (userMessage: string, chatHistory: { role: "user" | "model", parts: { text: string }[] }[]) => {
  if (!API_KEY) {
    return "Error: API_KEY not detected in System Environment. Please configure VITE_GEMINI_API_KEY.";
  }

  try {
    if (!API_KEY || API_KEY.length < 10) {
      return "Configuration Error: VITE_GEMINI_API_KEY is too short or empty. Please check your .env.local file.";
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview", // Current 2026 Preview Model
        systemInstruction: systemPrompt 
    });

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    if (error.message?.includes("Failed to fetch") || error.message?.includes("ERR_CONNECTION_CLOSED")) {
        return "Network Error: Google AI is unreachable. Try a VPN (Singapore/USA) or check your internet.";
    }
    
    if (error.message?.includes("404")) {
        return "Model Error: Your API key might not have access to gemini-1.5-flash yet. Try checking AI Studio.";
    }

    return "System Error: Neural Link interrupted. (Target server error).";
  }
};
