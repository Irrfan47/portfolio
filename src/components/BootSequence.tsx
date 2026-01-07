import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "[SYSTEM] Initializing XZ3TT.DEV firmware v2.0.24...",
  "[OK] Loading kernel modules...",
  "[OK] Memory check: 16GB available",
  "[OK] Display driver: Nothing Panel 120Hz",
  "[OK] Network interface: Connected",
  "[OK] Mounting portfolio data...",
  "[OK] Loading user profile: KAUNG_KHANT_MG_MG",
  "[OK] Authentication: DEVELOPER_MODE active",
  "[SYSTEM] Boot sequence complete.",
  "",
  "WELCOME TO MY PORTFOLIO",
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
        >
          <div className="scanlines absolute inset-0" />
          
          <div className="w-full max-w-2xl px-8">
            {/* Terminal Window */}
            <div className="glass-panel p-6 border border-nothing-border">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-nothing-border">
                <div className="w-3 h-3 rounded-full bg-nothing-red" />
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">
                  /boot/xz3tt-system
                </span>
              </div>

              {/* Boot Lines */}
              <div className="space-y-1 font-mono text-sm min-h-[300px]">
                {bootLines.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${
                      line.startsWith("[OK]")
                        ? "text-emerald-400"
                        : line.startsWith("[SYSTEM]")
                        ? "text-muted-foreground"
                        : line === "WELCOME TO XZ3TT.DEV"
                        ? "text-nothing-red font-display text-xl mt-4 tracking-widest"
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

            {/* Loading Bar */}
            <div className="mt-4 h-1 bg-muted rounded-sm overflow-hidden">
              <motion.div
                className="h-full bg-nothing-red"
                initial={{ width: "0%" }}
                animate={{ width: `${(visibleLines / bootLines.length) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
