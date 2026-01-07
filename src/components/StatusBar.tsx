import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Battery, Wifi, Signal, Home, Info, Folder, Mail } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(100);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Progress Bar
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (1 - window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.max(0, Math.min(100, scrolled)));

      // Active Section
      const current = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for header
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-nothing-border"
    >
      <div className="container flex items-center justify-between h-16 px-6">
        {/* Left - Clock */}
        <div className="flex items-center gap-4 hidden md:flex">
          <span className="font-mono text-sm text-foreground tabular-nums">
            {formatTime(time)}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-nothing-black/20 backdrop-blur-md border border-white/10">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${activeSection === section.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              <section.icon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium font-mono hidden sm:block">{section.label}</span>
            </a>
          ))}
        </nav>

        {/* Right - Battery */}
        <div className="flex items-center gap-2 md:w-auto w-0 overflow-hidden md:overflow-visible">
          <span className="font-mono text-xs text-muted-foreground hidden sm:block">
            PWR
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-sm tabular-nums">
              {Math.round(scrollProgress)}%
            </span>
            <div className="relative w-6 h-3 border border-foreground rounded-sm">
              <motion.div
                className="absolute inset-0.5 bg-foreground rounded-xs origin-left"
                style={{ scaleX: scrollProgress / 100 }}
              />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-foreground rounded-r" />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default StatusBar;
