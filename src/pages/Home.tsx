import {
  SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiVite, SiNodedotjs, SiExpress, SiPhp,
  SiLaravel, SiMysql, SiNpm, SiGithub
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import { Terminal, User, Briefcase, Mail, ChevronRight, MapPin, Code } from 'lucide-react';
import TypingText from '../components/TypingText';
import GlowCard from '../components/GlowCard';
import TerminalWindow from '../components/TerminalWindow';

const Home = () => {
  const skills = [
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'npm', icon: SiNpm, color: '#CB3837' },
    { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  ];

  const roles = [
    'Full Stack Developer',
    'Frontend Engineer',
    'Backend Developer',
    'Problem Solver',
    'Code Architect',
  ];

  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="text-primary font-mono text-sm">~/home</span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
        </div>
        
        <TerminalWindow title="welcome.sh" className="mb-8">
          <div className="space-y-2">
            <p className="text-glow-green">
              <span className="text-muted-foreground">$</span> whoami
            </p>
            <p className="text-foreground pl-4">Kaung Khant Mg Mg</p>
            <p className="text-glow-green">
              <span className="text-muted-foreground">$</span> echo $ROLE
            </p>
            <p className="text-primary pl-4">
              <TypingText texts={roles} speed={80} delay={1500} />
            </p>
            <p className="text-glow-green">
              <span className="text-muted-foreground">$</span> cat location.txt
            </p>
            <p className="text-foreground pl-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Alor Setar, Kedah, Malaysia
            </p>
          </div>
        </TerminalWindow>
      </div>

      {/* About Preview */}
      <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <GlowCard className="p-6" glowColor="cyan" hover={false}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-3">
                <span className="text-primary">&lt;</span>
                About Me
                <span className="text-primary">/&gt;</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed font-mono text-sm">
                Experienced and passionate Fullstack Developer specializing in building scalable and efficient digital
                solutions. On the frontend, I work with <span className="text-primary">Next.js</span>, <span className="text-secondary">TypeScript</span>, and <span className="text-glow-cyan">Tailwind CSS</span> to craft responsive and
                accessible user interfaces. On the backend, I develop robust services using <span className="text-glow-green">Node.js</span>, <span className="text-glow-purple">Express</span>, <span className="text-glow-pink">PHP</span> and <span className="text-red-400">Laravel</span>.
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Skills Section */}
      <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            <span className="text-muted-foreground font-mono">const</span>{' '}
            <span className="text-glow-green">skills</span>{' '}
            <span className="text-muted-foreground font-mono">=</span>{' '}
            <span className="text-primary font-mono">[</span>
          </h2>
        </div>

        {/* Scrolling Skills */}
        <div className="relative overflow-hidden py-4 mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-4 animate-scroll">
            {[...skills, ...skills].map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className="w-16 h-16 bg-card/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-border hover:border-primary/50 hover:shadow-neon-cyan hover:scale-110 transition-all duration-300 cursor-pointer group flex-shrink-0"
                  title={skill.name}
                >
                  <IconComponent 
                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" 
                    style={{ color: skill.color }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-right">
          <span className="text-primary font-mono text-lg">];</span>
        </div>

        {/* GitHub Icon */}
        <div className="flex justify-center mt-6">
          <a 
            href="https://github.com/Irrfan47" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 bg-card rounded-full flex items-center justify-center border border-border hover:border-primary/50 hover:shadow-neon-cyan transition-all duration-300 group"
          >
            <SiGithub className="w-7 h-7 text-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary font-mono text-sm">/*</span>
          <span className="text-muted-foreground font-mono text-sm">Navigate to sections</span>
          <span className="text-primary font-mono text-sm">*/</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/about">
            <GlowCard className="p-5 h-full" glowColor="cyan">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-foreground font-display font-semibold mb-1">About</h3>
              <p className="text-muted-foreground text-xs font-mono">
                ./about --info
              </p>
            </GlowCard>
          </Link>

          <Link to="/projects">
            <GlowCard className="p-5 h-full" glowColor="purple">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-foreground font-display font-semibold mb-1">Projects</h3>
              <p className="text-muted-foreground text-xs font-mono">
                ./projects --list
              </p>
            </GlowCard>
          </Link>

          <Link to="/contact">
            <GlowCard className="p-5 h-full" glowColor="green">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-foreground font-display font-semibold mb-1">Contact</h3>
              <p className="text-muted-foreground text-xs font-mono">
                ./contact --send
              </p>
            </GlowCard>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
