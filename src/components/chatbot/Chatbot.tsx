import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ScrollArea as ShadcnScrollArea } from "@/components/ui/scroll-area";
import { chatbotKnowledge, ChatStep, ChatOption } from "./chatbotData";
import { getGeminiResponse } from "./gemini";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: chatbotKnowledge.start.message,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [currentStep, setCurrentStep] = useState<ChatStep>(chatbotKnowledge.start);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<{role: "user" | "model", parts: {text: string}[]}[]>([]);

  useEffect(() => {
    if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Incrementally append to the ref instead of rebuilding from messages
    chatHistoryRef.current = [
      ...chatHistoryRef.current,
      { role: "user", parts: [{ text: userText }] },
    ];

    const aiResponse = await getGeminiResponse(userText, chatHistoryRef.current);

    chatHistoryRef.current = [
      ...chatHistoryRef.current,
      { role: "model", parts: [{ text: aiResponse }] },
    ];

    setIsTyping(false);
    addBotMessage(aiResponse);
  };

  const downloadResume = async () => {
    const resumeUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/optimized_images/Resume.pdf`;
    try {
      const response = await fetch(resumeUrl, {
        mode: 'cors',
        cache: 'no-cache'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Resume_KaungKhantMgMg.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, falling back to direct link:", error);
      // Fallback: Open in new tab if fetch/blob fails
      window.open(resumeUrl, '_blank');
    }
  };

  const handleOptionClick = async (option: ChatOption) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option.label,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (option.value === "download_cv") {
      await downloadResume();
      return;
    }

    const specialUrls: Record<string, string> = {
      view_filmophia: "https://filmophia.lovable.app/",
      view_padetha: "https://padetha.xz3tt.dev",
      view_scanner: "https://github.com/Irrfan47/Web-Application-Vulnerability-Scanner"
    };

    setIsTyping(true);

    if (option.nextStep && chatbotKnowledge[option.nextStep]) {
      setTimeout(() => {
        const nextStep = chatbotKnowledge[option.nextStep as string];
        setIsTyping(false);
        addBotMessage(nextStep.message);
        setCurrentStep(nextStep);
      }, 600);
    } else {
      // Use the ref-based history instead of rebuilding
      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: "user", parts: [{ text: option.label }] },
      ];
      const aiResponse = await getGeminiResponse(option.label, chatHistoryRef.current);
      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: "model", parts: [{ text: aiResponse }] },
      ];
      setIsTyping(false);
      addBotMessage(aiResponse);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        text: chatbotKnowledge.start.message,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setCurrentStep(chatbotKnowledge.start);
    setInputValue("");
    setIsTyping(false);
    chatHistoryRef.current = [];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[420px] h-[calc(100vh-160px)] sm:h-[600px] max-h-[700px] glass-panel rounded-lg shadow-2xl flex flex-col overflow-hidden relative border-white/10"
          >
            <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-1 animate-pulse">
                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                       <div className="w-1.5 h-1.5 bg-[#f00] rounded-full"></div>
                       <div className="w-1.5 h-1.5 bg-[#f00] rounded-full"></div>
                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-[13px] tracking-widest text-white uppercase">OS_ASSISTANT v3.0</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f00] led-active"></div>
                    <span className="text-[9px] text-white/50 tracking-system font-mono uppercase">Neural Link Stable</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={resetChat} className="text-white/40 hover:text-white hover:bg-white/5 h-8 w-8">
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white hover:bg-white/5 h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Area - Bulletproof Container */}
            <div 
              ref={chatAreaRef}
              className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col relative z-20"
            >
              <div className="space-y-3 pb-6 w-full">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                        className={`max-w-[90%] px-3 py-2.5 rounded-sm text-[13px] font-mono leading-relaxed border shadow-md ${
                            message.sender === "user" 
                            ? "bg-white text-black font-bold border-white" 
                            : "bg-white/5 text-white/90 border-white/10"
                        }`}
                        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                    >
                      <div className="flex items-center gap-2 mb-1.5 opacity-40 text-[8px] uppercase tracking-widest pointer-events-none">
                         <span>{message.sender === "user" ? "YOU" : "AI"}</span>
                         <span>•</span>
                         <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className={`prose max-w-none prose-sm ${message.sender === "user" ? "text-black" : "prose-invert text-white/90"}`}>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className={`mb-1 last:mb-0 leading-relaxed ${message.sender === "user" ? "text-black" : ""}`}>{children}</p>,
                            strong: ({ children }) => <strong className={`font-bold uppercase tracking-tight ${message.sender === "user" ? "text-black" : "text-nothing-red"}`}>{children}</strong>,
                            em: ({ children }) => <em className={`not-italic font-mono font-bold tracking-widest ${message.sender === "user" ? "text-black" : "text-nothing-red"}`}>{children}</em>,
                            ul: ({ children }) => <ul className="list-disc pl-3 mb-1 space-y-0.5">{children}</ul>,
                            li: ({ children }) => <li className={`mb-0 ${message.sender === "user" ? "text-black" : "text-white/80"}`}>{children}</li>,
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>

                      {/* Dynamic Resume Button */}
                      {message.text.includes("/optimized_images/Resume.pdf") && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                           <Button 
                             onClick={downloadResume}
                             className="w-full bg-white text-black hover:bg-white/90 rounded-none font-mono text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group h-11 transition-all active:translate-x-1 active:translate-y-1"
                           >
                             <Sparkles className="w-3.5 h-3.5" />
                             <span>DOWNLOAD_CV.PDF</span>
                           </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/5 px-4 py-3 rounded-sm border border-white/10 flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                       <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">Syncing...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={scrollRef} />
              </div>
            </div>

            {/* Input & Commands Area */}
            <div className="p-4 border-t border-white/10 bg-black relative z-30 shrink-0">
              {/* Quick Commands */}
              {!isTyping && currentStep.options.length > 0 && (
                <div className="mb-4">
                   <div className="w-full flex gap-2 overflow-x-auto pb-2">
                        {currentStep.options.map((option, idx) => (
                          <button
                            key={`${option.value}-${idx}`}
                            onClick={() => handleOptionClick(option)}
                            className="shrink-0 px-3 py-1.5 border border-white/20 text-[10px] text-white/60 hover:text-white hover:border-white/50 font-mono uppercase tracking-widest transition-all"
                          >
                            {option.label}
                          </button>
                        ))}
                   </div>
                </div>
              )}

              {/* Text Input */}
              <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="TYPE COMMAND OR ASK AI_"
                  className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-white/30 placeholder:opacity-30 tracking-widest"
                />
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-white text-black hover:bg-white/90 rounded-none h-[42px] px-3 border border-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-500 rounded-full ${
          isOpen ? "bg-white text-black" : "glass-panel border-white/20 text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="grid grid-cols-2 gap-1 animate-pulse">
             <div className="w-1 h-1 bg-white rounded-full"></div>
             <div className="w-1 h-1 bg-[#f00] rounded-full"></div>
             <div className="w-1 h-1 bg-[#f00] rounded-full"></div>
             <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
