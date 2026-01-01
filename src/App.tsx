import { Download, Terminal, Menu, X } from 'lucide-react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MatrixBackground from './components/MatrixBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileNavItems = [
    { path: '/', label: 'Home', icon: '~/' },
    { path: '/about', label: 'About', icon: '~/about' },
    { path: '/projects', label: 'Projects', icon: '~/projects' },
    { path: '/contact', label: 'Contact', icon: '~/contact' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 scanlines opacity-30" />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/50">
                <img
                  src="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/profile.jpg"
                  alt="Kaung Khant Mg Mg"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-foreground font-display font-semibold text-sm">Kaung Khant Mg Mg</h1>
                <div className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-primary" />
                  <p className="text-muted-foreground text-xs font-mono">developer</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border p-4 animate-fade-in-up">
              <div className="space-y-2">
                {mobileNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${isActive
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`
                    }
                  >
                    <span className="text-xs opacity-50">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0 lg:sticky lg:top-4 lg:self-start p-4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 pb-28 lg:pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Mobile Resume Download Button */}
      <a
        href="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf"
        download="Kaung_Khant_Mg_Mg_Resume.pdf"
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-card/90 backdrop-blur-md border border-primary/50 text-primary shadow-neon-cyan hover:bg-primary/10 transition-all active:scale-95 font-mono text-sm"
      >
        <Download className="w-4 h-4" />
        <span>resume.pdf</span>
      </a>
    </div>
  );
}

export default App;
