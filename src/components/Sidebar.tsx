import { Home, User, Briefcase, FileText, Download, Terminal, Wifi } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: 'Home', icon: Home, command: '~/home' },
    { path: '/about', label: 'About', icon: User, command: '~/about' },
    { path: '/projects', label: 'Projects', icon: Briefcase, command: '~/projects' },
    { path: '/contact', label: 'Contact', icon: FileText, command: '~/contact' },
  ];

  return (
    <aside className="w-64 h-fit flex flex-col pt-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 pulse-glow">
            <img
              src="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/profile.jpg"
              alt="Kaung Khant Mg Mg"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Status */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-glow-green rounded-full border-2 border-background animate-pulse" />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center justify-center gap-2">
            <span className="glitch-text">Kaung Khant Mg Mg</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Terminal className="w-3 h-3 text-primary" />
            <p className="text-xs text-muted-foreground font-mono">
              Full Stack Developer
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Wifi className="w-3 h-3 text-glow-green" />
            <span className="text-xs text-glow-green font-mono">available for hire</span>
          </div>
        </div>
      </div>

      {/* Terminal-style Navigation */}
      <nav className="flex-1">
        <div className="bg-card/50 rounded-lg border border-border p-2 mb-4">
          <div className="text-xs text-muted-foreground mb-2 font-mono">
            <span className="text-glow-green">guest@portfolio</span>
            <span className="text-foreground">:</span>
            <span className="text-primary">~</span>
            <span className="text-foreground">$ ls -la</span>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-mono transition-all duration-300
                    ${isActive
                      ? 'bg-primary/10 text-primary border border-primary/30 shadow-neon-cyan'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {isActive ? '>' : '$'}
                      </span>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto text-xs opacity-50">{item.command}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Download Resume */}
      <div className="mt-4 px-2">
        <a
          href="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf"
          download="Kaung_Khant_Mg_Mg_Resume.pdf"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:shadow-neon-cyan transition-all duration-300 font-mono text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center border-t border-border pt-4">
        <div className="text-xs text-muted-foreground font-mono">
          <div className="text-primary">/* COPYRIGHT © 2025 */</div>
          <div className="mt-1">Kaung Khant Mg Mg</div>
          <div className="text-muted-foreground/50">All rights reserved</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
