import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="dot-pattern w-full h-full opacity-20 absolute inset-0" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 md:p-12 max-w-lg w-full relative z-10 border border-nothing-red/30"
      >
        {/* Header Status */}
        <div className="flex items-center justify-between mb-8 border-b border-nothing-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-nothing-red animate-pulse" />
            <span className="text-xs text-nothing-red tracking-widest">SYSTEM_CRUSHED</span>
          </div>
          <span className="text-xs text-muted-foreground">ERR_404_NOT_FOUND</span>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <AlertTriangle className="w-16 h-16 text-nothing-red mx-auto mb-4 animate-bounce" />
            <div className="absolute inset-0 bg-nothing-red/20 blur-xl rounded-full animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2 font-custom tracking-tighter">
            404
          </h1>
          <p className="text-xl md:text-2xl text-white mb-2">
            Lost in the Void
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            The requested resource could not be located in the system memory.
          </p>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/40 border border-nothing-border p-4 rounded mb-8 text-left h-32 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-nothing-red/50 animate-scan" style={{ animation: "scan 2s linear infinite" }} />
          <div className="font-mono text-xs text-green-500 space-y-1">
            <p>&gt; initiating_search_sequence...</p>
            <p>&gt; scanning_sectors_0x00_to_0xFF...</p>
            <p className="text-red-500">&gt; error: sector_not_found_exception</p>
            <p className="text-red-500">&gt; critical_failure: system_navigation_lost</p>
            <p className="animate-pulse">&gt; awaiting_manual_override_</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-nothing-red/10 border border-nothing-red/50 hover:bg-nothing-red hover:text-white transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-mono text-sm tracking-widest uppercase">
              Reboot_System
            </span>
          </Link>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-nothing-red/30 -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-nothing-red/30 translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-nothing-red/30 -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-nothing-red/30 translate-x-1 translate-y-1" />
      </motion.div>
    </div>
  );
};

export default NotFound;
