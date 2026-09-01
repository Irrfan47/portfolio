import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FastForward } from "lucide-react";

const bootLines = [
  "[SYSTEM] Initializing XZETT.ME firmware v2.0.26...",
  "[OK] Loading kernel modules...",
  "[OK] Memory check: 16GB available",
  "[OK] Display driver: Nothing Panel 120Hz",
  "[OK] Network interface: Connected [portfolio.xzett.me]",
  "[OK] Mounting portfolio data...",
  "[OK] Loading user profile: KAUNG_KHANT_MG_MG",
  "[OK] Authentication: DEVELOPER_MODE active",
  "[SYSTEM] Boot sequence complete.",
  "",
  "WELCOME TO XZETT.ME",
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleSkip = useCallback(() => {
    setIsComplete(true);
    localStorage.setItem("portfolio_booted", "true");
    localStorage.setItem("portfolio_boot_time", Date.now().toString());
    setTimeout(onComplete, 200);
  }, [onComplete]);

  useEffect(() => {
    // Key listener for ESC or SPACE to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    // Pre-load critical assets during boot
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/profile/profile.webp`;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 400);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-2xl px-6 sm:px-8">
            {/* Terminal Window */}
            <div className="glass-panel p-5 sm:p-6 border border-nothing-border shadow-2xl relative">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-nothing-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-nothing-red" />
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="ml-2 sm:ml-4 font-mono text-xs text-muted-foreground truncate">
                    /boot/xzett-system
                  </span>
                </div>

                {/* Skip Button in Header */}
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-nothing-red/10 border border-white/10 hover:border-nothing-red/50 text-muted-foreground hover:text-nothing-red transition-all font-mono text-xs cursor-pointer group hoverable"
                  title="Skip boot sequence (ESC)"
                >
                  <span className="text-[11px] font-medium">SKIP_BOOT()</span>
                  <FastForward className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Boot Lines */}
              <div className="space-y-1 font-mono text-xs sm:text-sm min-h-[260px] sm:min-h-[300px]">
                {bootLines.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    className={`${line.startsWith("[OK]")
                        ? "text-emerald-400"
                        : line.startsWith("[SYSTEM]")
                          ? "text-muted-foreground"
                          : line === "WELCOME TO XZETT.ME"
                            ? "text-nothing-red font-display text-lg sm:text-xl mt-4 tracking-widest"
                            : "text-foreground"
                      }`}
                  >
                    {line}
                  </motion.div>
                ))}
                {visibleLines < bootLines.length && (
                  <span className="inline-block w-2 h-4 bg-nothing-red animate-pulse" />
                )}
              </div>
            </div>

            {/* Bottom Controls & Loading Bar */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between gap-4">
              <div className="h-1 flex-1 bg-muted rounded-sm overflow-hidden">
                <motion.div
                  className="h-full bg-nothing-red"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(visibleLines / bootLines.length) * 100}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-foreground">ESC</kbd> to skip
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
