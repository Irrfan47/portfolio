import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use Motion Values for hardware-accelerated movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply smoothing (spring physics) to the outer ring only
  // The inner dot should be "stiffer" to feel responsive
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    const updatePosition = (e: MouseEvent) => {
      // If cursor moves out of the viewport window boundaries, hide immediately
      if (
        e.clientX < 0 ||
        e.clientY < 0 ||
        e.clientX > window.innerWidth ||
        e.clientY > window.innerHeight
      ) {
        setIsVisible(false);
        return;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isHoverable = target.closest("a, button, .hoverable");
      setIsHovering(!!isHoverable);
    };

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setIsVisible(false);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    mql.addEventListener("change", handleMediaChange);
    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseover", checkHoverState, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mql.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", checkHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <div
          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
            isHovering ? "border-nothing-red shadow-[0_0_10px_rgba(215,25,32,0.5)]" : "border-white/40 shadow-sm"
          }`}
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isHovering ? "bg-nothing-red" : "bg-white"
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
