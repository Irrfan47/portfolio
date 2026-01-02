import { useState } from 'react';
import { ChevronDown, ChevronRight, Award, Briefcase, ExternalLink } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import TerminalWindow from '../components/TerminalWindow';

const About = () => {
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  const careerHistory = [
    {
      title: 'Web Developer',
      company: 'Freelance',
      location: 'Remote',
      period: 'Sep 2025 - Present',
      duration: '3 Months',
      type: 'Freelance',
      badge: 'Remote',
      logo: '💼',
      color: 'cyan',
      responsibilities: [
        'Designed and launched modern, responsive websites using React, TypeScript, and Tailwind CSS.',
        'Collaborated directly with clients to translate business goals into functional applications.',
        'Improved website load times by implementing optimized UI/UX components.'
      ]
    },
    {
      title: 'Fullstack Developer & IT Support',
      company: 'Nurkamal Network Sdn Bhd',
      location: 'Alor Setar, Kedah, Malaysia',
      period: 'Mar 2025 - Sep 2025',
      duration: '6 Months',
      type: 'Internship',
      badge: 'Onsite',
      logo: <img src="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/nurkamal_logo.jpg" alt="Nurkamal Network" className="w-full h-full object-cover rounded-lg" />,
      color: 'purple',
      responsibilities: [
        'Built and deployed 5 full-stack web applications, improving workflow efficiency by 30%.',
        'Collaborated with cross-functional teams to optimize performance and deployment pipelines.',
        'Managed IT support and system configuration, reducing downtime by 25%.',
        'Performed QA testing and bug fixing to enhance system stability',
        'Set up several IT related technologies such as PC, Access Points, Network Cabling, Server and Telephones.'
      ]
    },
    {
      title: 'Logistic, Event Management and Sport Unit Officer',
      company: 'AIU Myanmar Student Association (AMSA)',
      location: 'Alor Setar, Kedah',
      period: 'Feb 2022 - Oct 2024',
      duration: '2 Years 9 Months',
      type: 'Part-time',
      badge: 'Onsite',
      logo: <img src="https://myprojectstorage47.blob.core.windows.net/portfoliodocs/amsa_logo.jpg" alt="AMSA" className="w-full h-full object-cover rounded-lg" />,
      color: 'green',
      responsibilities: [
        'Managed logistics and on-site operations for association events, ensuring efficient flow and materials coordination.',
        'Coordinated the planning, scheduling, and communication necessary for successful student activities.',
        'Supported student engagement by organizing sports competitions and managing team participation and event operations.'
      ]
    },
  ];

  const certifications = [
    {
      title: 'Web Development Fundamentals',
      issuer: 'IBM SkillsBuild',
      date: 'Issued Nov 21, 2025',
      link: 'https://www.credly.com/badges/63c5f77b-830b-41e6-9688-796cdb68fea8/public_url',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/IBM.jpg'
    },
    {
      title: '5G Pioneers program',
      issuer: 'ERICSSON',
      date: 'Issued Mar 22, 2024',
      link: 'https://www.credly.com/badges/f060939f-4610-43a7-9088-a14118231d80/public_url',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ERICSSON.jpeg'
    }
  ];

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedJobs(newExpanded);
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="text-primary font-mono text-sm">~/about</span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <TerminalWindow title="about.md" className="mb-8">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              <span className="text-primary">#</span> Hello there!
            </p>
            <p className="text-foreground leading-relaxed">
              Thank you for visiting my personal website. I'm <span className="text-primary font-semibold">Kaung Khant Mg Mg</span>,
              a student majoring in Computer Science at the Albukhary International University. I'm a Fullstack Developer with a passion for building
              impactful software products.
            </p>
            <p className="text-foreground leading-relaxed">
              My stack includes modern frontend technologies like <span className="text-glow-cyan">Next.js</span>, <span className="text-secondary">TypeScript</span>,
              and <span className="text-glow-cyan">Tailwind CSS</span>, as well as backend development using <span className="text-glow-green">Node.js</span>, <span className="text-glow-purple">Express</span>, <span className="text-glow-pink">PHP</span> and <span className="text-red-400">Laravel</span>.
            </p>
            <p className="text-foreground leading-relaxed">
              I enjoy creating solutions that are both user-friendly and performant. Whether it's building intuitive
              interfaces or architecting backend services, I aim to bring efficiency and clarity into every layer of the
              application.
            </p>
            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground">Best regards,</p>
              <p className="text-primary font-display text-xl mt-2 glitch-text">
                Kaung Khant Mg Mg
              </p>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Career Section */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            <span className="text-muted-foreground font-mono">function</span>{' '}
            <span className="text-secondary">getCareerHistory</span>
            <span className="text-muted-foreground font-mono">()</span>{' '}
            <span className="text-primary font-mono">{'{'}</span>
          </h2>
        </div>

        <div className="space-y-4 pl-4 border-l-2 border-border">
          {careerHistory.map((job, index) => (
            <GlowCard
              key={index}
              className="p-4"
              glowColor={job.color as 'cyan' | 'purple' | 'green'}
              hover={false}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl flex-shrink-0 overflow-hidden border border-border">
                  {job.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-display font-semibold text-lg mb-1">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-mono mb-3">
                    {job.company} <span className="text-border">|</span> {job.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                    <span className="px-2 py-1 bg-muted rounded font-mono text-muted-foreground">
                      {job.period}
                    </span>
                    <span className="px-2 py-1 bg-muted rounded font-mono text-muted-foreground">
                      {job.duration}
                    </span>
                    <span className={`px-2 py-1 rounded font-mono ${job.type === 'Freelance' ? 'bg-primary/10 text-primary border border-primary/30' :
                        job.type === 'Internship' ? 'bg-secondary/10 text-secondary border border-secondary/30' :
                          'bg-accent/10 text-accent border border-accent/30'
                      }`}>
                      {job.type}
                    </span>
                    <span className={`px-2 py-1 rounded font-mono ${job.badge === 'Remote' ? 'bg-glow-cyan/10 text-glow-cyan border border-glow-cyan/30' :
                        'bg-glow-purple/10 text-glow-purple border border-glow-purple/30'
                      }`}>
                      {job.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors font-mono"
                  >
                    {expandedJobs.has(index) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {expandedJobs.has(index) ? 'collapse()' : 'expand()'}
                  </button>

                  {/* Expandable responsibilities */}
                  <div className={`overflow-hidden transition-all duration-300 ${expandedJobs.has(index) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="text-primary text-xs font-mono mb-3">// Key Responsibilities:</p>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="text-foreground text-sm flex items-start gap-2 font-mono">
                            <span className="text-accent mt-1">→</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="mt-4 text-right">
          <span className="text-primary font-mono">{'}'}</span>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            <span className="text-muted-foreground font-mono">const</span>{' '}
            <span className="text-accent">certifications</span>{' '}
            <span className="text-muted-foreground font-mono">=</span>{' '}
            <span className="text-primary font-mono">[</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowCard className="p-4 h-full" glowColor="green">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                    <img
                      src={cert.image}
                      alt={cert.issuer}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-display font-semibold mb-1 flex items-center gap-2">
                      {cert.title}
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </h3>
                    <p className="text-muted-foreground text-sm font-mono">{cert.issuer}</p>
                    <p className="text-muted-foreground/70 text-xs font-mono mt-1">{cert.date}</p>
                  </div>
                </div>
              </GlowCard>
            </a>
          ))}
        </div>

        <div className="mt-4 text-right">
          <span className="text-primary font-mono">];</span>
        </div>
      </div>
    </div>
  );
};

export default About;
