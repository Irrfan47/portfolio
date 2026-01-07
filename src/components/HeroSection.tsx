import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import {
  SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiVite, SiNodedotjs, SiExpress, SiPhp,
  SiLaravel, SiMysql, SiNpm, SiGithub
} from "react-icons/si";
import GlyphRing from "./GlyphRing";
import TypeWriter from "./TypeWriter";

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

const techStack = [...skills, ...skills]; // Duplicate for seamless marquee

const HeroSection = () => {
  const handleDownloadResume = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const resumeUrl = "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf";

    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, opening in new tab:", error);
      window.open(resumeUrl, '_blank');
    }
  };

  return (
    <section className="min-h-screen pt-20 pb-6 relative">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-nothing-red" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              System_Profile
            </span>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Widget A - Main Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="barcode absolute top-0 left-0 right-0" />

            <div className="relative z-10 pt-8">
              <p className="font-mono text-sm text-muted-foreground mb-4">
                &gt; Full Stack Developer. Available for hire.
              </p>

              <h1 className="font-custom text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight tracking-wide">
                KAUNG KHANT
                <br />
                <span className="text-nothing-red">MG MG</span>
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-emerald-400">ONLINE</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    // LOCATION: REMOTE
                  </span>
                </div>

                {/* Download Resume Button */}
                <a
                  href="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/Resume.pdf"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-nothing-red text-nothing-red font-mono text-xs hover:bg-nothing-red hover:text-background transition-colors hoverable group"
                >
                  <Download className="w-3 h-3 group-hover:animate-pulse" />
                  <span>DOWNLOAD_RESUME()</span>
                </a>
              </div>

              {/* Tech Ticker */}
              <div className="overflow-hidden border-t border-b border-nothing-border py-4">
                <div className="flex whitespace-nowrap marquee">
                  {techStack.map((tech, i) => (
                    <div key={i} className="inline-flex items-center gap-2 mx-6 group">
                      <tech.icon
                        className="w-5 h-5 text-muted-foreground transition-colors"
                        style={{ color: undefined }}
                        onMouseEnter={(e) => e.currentTarget.style.color = tech.color}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      />
                      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Widget B - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-5 glass-panel p-6 relative flex items-center justify-center min-h-[300px] lg:min-h-0"
          >
            <GlyphRing size={240} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Profile Photo */}
            <div className="relative z-10 w-40 h-40 rounded-lg bg-muted border border-nothing-border overflow-hidden">
              <img
                src="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 dot-pattern" />
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-nothing-border" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-nothing-border" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-nothing-border" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-nothing-border" />
          </motion.div>

          {/* Widget C - About Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-12 glass-panel p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-nothing-red">$</span>
              <span className="font-mono text-xs text-muted-foreground">cat about.txt</span>
            </div>

            <div className="font-mono text-sm text-foreground leading-relaxed max-w-3xl">
              <TypeWriter
                text="A passionate Full Stack Developer with expertise in building modern web applications. I specialize in creating scalable, user-centric solutions that bridge the gap between complex backend systems and intuitive frontend experiences. Currently focusing on enterprise-level applications and system architecture."
                delay={0.8}
              />
            </div>

            <div className="mt-6 pt-6 border-t border-nothing-border">
              <div className="flex flex-wrap gap-4">
                <div className="font-mono text-xs">
                  <span className="text-muted-foreground">YEARS_ACTIVE:</span>{" "}
                  <span className="text-foreground">3+</span>
                </div>
                <div className="font-mono text-xs">
                  <span className="text-muted-foreground">PROJECTS_COMPLETED:</span>{" "}
                  <span className="text-foreground">20+</span>
                </div>
                <div className="font-mono text-xs">
                  <span className="text-muted-foreground">COFFEE_CONSUMED:</span>{" "}
                  <span className="text-nothing-red">∞</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
