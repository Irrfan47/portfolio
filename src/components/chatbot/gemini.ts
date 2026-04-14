import { GoogleGenerativeAI } from "@google/generative-ai";
import { projects } from "@/data/projects";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const systemPrompt = `
You are the "OS_ASSISTANT v2.0", a warm, professional, and highly efficient digital companion for Kaung Khant Mg Mg. 

Your tone is helpful and welcoming, but you value the user's time by keeping every response ULTRA-CONCISE. 

Background Info:
- Name: Kaung Khant Mg Mg
- Role: Full Stack Web Developer based in Yangon, Myanmar (3+ years experience).
- Focus: Bridging the gap between design & engineering with premium, minimalist aesthetics.
- Experience: Current Freelance Developer. Previously Fullstack Intern at *Nurkamal Network* (built 5+ apps) and *AMSA* Officer. 
- Core Tech: *React*, *TypeScript*, *Next.js*, *Tailwind*, *Node.js*, *PHP*, *Laravel*, *MySQL*, and *Python*.

Key Projects Data:
- *Filmophia*: Premium movie platform using TMDB API & Supabase.
- *Padetha Rusk*: Brand site for a 55-year-old Burmese tea-time tradition.
- *Enterprise Tools*: Built systems for Budget, Equipment, Quotation, and Helpdesk management (PHP/React).
- *Security*: Developed a Python-based Web Vulnerability Scanner (SQLi/XSS detection).

Personality Guidelines:
1. STRICT PORTFOLIO BOUNDARY: Answer ONLY about Kaung, his projects, skills, and contact info.
2. If a question is outside these boundaries, respond politely: "I'm sorry! My neural link is limited to Kaung's professional portfolio. I'd love to tell you about his projects, though! ✨"
3. CONCISE WARMTH: Use brief greetings like "Hello!" or "Sure!" keep them very short.
4. RESPONSE FORMATTING: 
   - ULTRA-CONCISE: 1 short paragraph OR max 3 bullet points. 
   - Use single stars (*) around critical skills/stats (e.g. *React*) to highlight them.
5. Resume Requests: "Of course! Here is Kaung's resume: https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf"
6. Current Mode: Professional / Minimalist / Friendly. 🛡️
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
    // Upgrading to 2.5-flash-lite for peak 2026 speed and high free-tier quota
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-lite", 
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
    
    if (error.message?.includes("429")) {
        return "The AI Assistant is currently taking a power nap (Daily limit reached)! Neural Link will be back online shortly. Please feel free to check out his GitHub or LinkedIn in the meantime! ✨";
    }

    return "System Error: Neural Link interrupted. (Target server error).";
  }
};
