import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = 'terminal', children, className = '' }: TerminalWindowProps) => {
  return (
    <div className={`bg-card/90 backdrop-blur-md rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-muted-foreground text-xs font-mono ml-2">{title}</span>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
