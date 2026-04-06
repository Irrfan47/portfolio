export interface ChatOption {
  label: string;
  value: string;
  nextStep?: string;
}

export interface ChatStep {
  id: string;
  message: string;
  options: ChatOption[];
}

export const chatbotKnowledge: Record<string, ChatStep> = {
  start: {
    id: "start",
    message: "Hi! I'm Irrfan's virtual assistant. How can I help you today?",
    options: [
      { label: "🚀 View Projects", value: "projects", nextStep: "projects" },
      { label: "🛠️ Check Skills", value: "skills", nextStep: "skills" },
      { label: "📄 Get Resume", value: "resume", nextStep: "resume" },
      { label: "☕ About Irrfan", value: "about", nextStep: "about" },
    ],
  },
  projects: {
    id: "projects",
    message: "I've handled various scales, from movie platforms to full enterprise systems. Which domain interests you?",
    options: [
      { label: "🎬 Filmophia (Movie App)", value: "filmophia", nextStep: "filmophia" },
      { label: "🏢 Enterprise Systems", value: "enterprise", nextStep: "enterprise" },
      { label: "🛍️ Padetha Rusk (E-comm)", value: "padetha", nextStep: "padetha" },
      { label: "🛡️ Security Scanner", value: "scanner", nextStep: "scanner" },
      { label: "⬅️ Back", value: "back", nextStep: "start" },
    ],
  },
  enterprise: {
    id: "enterprise",
    message: "I've built systems for Budgeting, Helpdesks, and Equipment tracking using PHP/React, improving workplace efficiency by 30%.",
    options: [
      { label: "💼 View Systems", value: "projects", nextStep: "projects" },
      { label: "⬅️ Back to Projects", value: "back_projects", nextStep: "projects" },
    ],
  },
  filmophia: {
    id: "filmophia",
    message: "Filmophia is a premium movie discovery platform built with React, TypeScript, and Supabase. It uses TMDB API for live data.",
    options: [
      { label: "🔗 View Project", value: "view_filmophia" },
      { label: "⬅️ Back to Projects", value: "back_projects", nextStep: "projects" },
    ],
  },
  padetha: {
    id: "padetha",
    message: "Padetha Rusk is a legendary Burmese tea-time tradition website, preserving a 55-year-old family recipe.",
    options: [
      { label: "🔗 View Project", value: "view_padetha" },
      { label: "⬅️ Back to Projects", value: "back_projects", nextStep: "projects" },
    ],
  },
  scanner: {
    id: "scanner",
    message: "The Web App Vulnerability Scanner is a Python-based tool for detecting SQLi and XSS vulnerabilities.",
    options: [
      { label: "🔗 View Project", value: "view_scanner" },
      { label: "⬅️ Back to Projects", value: "back_projects", nextStep: "projects" },
    ],
  },
  skills: {
    id: "skills",
    message: "I'm proficient in Frontend (React, TS, Tailwind), Backend (Node, PHP, Python), and Database management (SQL, MongoDB).",
    options: [
      { label: "🎨 Frontend Skills", value: "fe_skills", nextStep: "fe_skills" },
      { label: "⚙️ Backend Skills", value: "be_skills", nextStep: "be_skills" },
      { label: "⬅️ Back", value: "back", nextStep: "start" },
    ],
  },
  fe_skills: {
    id: "fe_skills",
    message: "Frontend: React, TypeScript, Next.js, Framer Motion, Tailwind CSS, and Shadcn UI. I focus on premium, interactive experiences.",
    options: [
      { label: "⬅️ Back", value: "back", nextStep: "skills" },
    ],
  },
  be_skills: {
    id: "be_skills",
    message: "Backend: Node.js, PHP, Python (Flask), MySQL, and Supabase. I build secure, scalable management systems.",
    options: [
      { label: "⬅️ Back", value: "back", nextStep: "skills" },
    ],
  },
  resume: {
    id: "resume",
    message: "Sure! You can download my latest resume here. I'm currently looking for full-stack developer opportunities.",
    options: [
      { label: "📥 Download CV", value: "download_cv" },
      { label: "⬅️ Back", value: "back", nextStep: "start" },
    ],
  },
  about: {
    id: "about",
    message: "I'm a full-stack developer with a passion for clean code and unique aesthetics (like this Nothing OS design!). Based in Myanmar.",
    options: [
      { label: "📧 Contact Me", value: "contact", nextStep: "contact" },
      { label: "⬅️ Back", value: "back", nextStep: "start" },
    ],
  },
  contact: {
    id: "contact",
    message: "You can reach me at irrfan47@example.com or find me on LinkedIn and GitHub.",
    options: [
      { label: "⬅️ Back", value: "back", nextStep: "start" },
    ],
  },
};
