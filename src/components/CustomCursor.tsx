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
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const updatePosition = (e: MouseEvent) => {
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

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", checkHoverState);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", checkHoverState);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
            isHovering ? "border-nothing-red" : "border-foreground"
          }`}
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1
        }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isHovering ? "bg-nothing-red" : "bg-foreground"}`} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
