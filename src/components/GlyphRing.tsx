import { motion } from "framer-motion";

interface GlyphRingProps {
  size?: number;
  className?: string;
}

const GlyphRing = ({ size = 280, className = "" }: GlyphRingProps) => {
  const dots = 32;
  const radius = size / 2 - 15;

  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size }}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-nothing-red glyph-ring"
        style={{ filter: "blur(40px)" }}
      />
      
      {/* Dot ring */}
      <svg width={size} height={size} className="absolute inset-0">
        {Array.from({ length: dots }).map((_, i) => {
          const angle = (i / dots) * 2 * Math.PI - Math.PI / 2;
          const x = size / 2 + radius * Math.cos(angle);
          const y = size / 2 + radius * Math.sin(angle);
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 4 : 2}
              fill={i % 4 === 0 ? "hsl(var(--nothing-red))" : "hsl(var(--foreground))"}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: i % 4 === 0 ? [0.4, 1, 0.4] : [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          );
        })}
      </svg>

      {/* Inner circle */}
      <div 
        className="absolute rounded-full border border-nothing-border bg-nothing-surface"
        style={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        }}
      />
    </div>
  );
};

export default GlyphRing;
