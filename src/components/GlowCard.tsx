import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'green' | 'pink';
  hover?: boolean;
}

const GlowCard = ({ children, className = '', glowColor = 'cyan', hover = true }: GlowCardProps) => {
  const glowClasses = {
    cyan: 'hover:shadow-neon-cyan border-glow-cyan/20 hover:border-glow-cyan/50',
    purple: 'hover:shadow-neon-purple border-glow-purple/20 hover:border-glow-purple/50',
    green: 'hover:shadow-neon-green border-glow-green/20 hover:border-glow-green/50',
    pink: 'hover:shadow-[0_0_5px_rgb(236_72_153/0.5),0_0_20px_rgb(236_72_153/0.3)] border-glow-pink/20 hover:border-glow-pink/50',
  };

  return (
    <div
      className={`
        relative bg-card/80 backdrop-blur-md rounded-xl border transition-all duration-300
        ${hover ? glowClasses[glowColor] : `border-${glowColor === 'cyan' ? 'glow-cyan' : glowColor === 'purple' ? 'glow-purple' : glowColor === 'green' ? 'glow-green' : 'glow-pink'}/20`}
        ${hover ? 'hover:scale-[1.02] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlowCard;
