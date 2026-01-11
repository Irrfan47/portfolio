import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-md glass-panel border border-nothing-border text-foreground/80 hover:text-nothing-red hover:border-nothing-red transition-all duration-300 group"
                    aria-label="Back to Top"
                >
                    <div className="absolute inset-0 bg-nothing-red/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                    <ArrowUp className="w-5 h-5 relative z-10" />

                    {/* Decorative corners similar to other UI elements */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-nothing-red/50 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-nothing-red/50 transition-colors duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
