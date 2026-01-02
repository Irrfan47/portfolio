import { useState, useEffect } from 'react';
import {
  SiReact, SiTypescript, SiPhp, SiMysql, SiTailwindcss, SiJavascript,
  SiPython, SiNodedotjs, SiLaravel, SiMongodb, SiExpress, SiBootstrap,
  SiFlask, SiHtml5, SiCss3, SiVite, SiChartdotjs, SiFontawesome
} from 'react-icons/si';
import { ArrowLeft, Github, Terminal, Eye, Star, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import GlowCard from '../components/GlowCard';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const getProjectImages = (projectTitle: string) => {
    switch (projectTitle) {
      case 'Program Management System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_3.png'];
      case 'Helpdesk System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_3.png'];
      case 'Equipment Management System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_3.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_4.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_5.png'];
      case 'Quotation Management System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_3.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_4.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_5.png'];
      case 'Web Application Vulnerability Scanner':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_3.png'];
      case 'Enterprise Management System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_3.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_4.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_5.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_6.png'];
      case 'Budget Management System':
        return ['https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg1.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg2.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg3.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg4.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg5.png', 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg6.png'];
      default:
        return [];
    }
  };

  const preloadImages = (imageUrls: string[]) => {
    setIsLoadingImages(true);
    const newLoadedImages = new Set(loadedImages);
    let loadedCount = 0;

    imageUrls.forEach((url) => {
      if (newLoadedImages.has(url)) {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setIsLoadingImages(false);
        }
        return;
      }

      const img = new Image();
      img.onload = () => {
        newLoadedImages.add(url);
        loadedCount++;
        setLoadedImages(new Set(newLoadedImages));
        if (loadedCount === imageUrls.length) {
          setIsLoadingImages(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setIsLoadingImages(false);
        }
      };
      img.src = url;
    });
  };

  useEffect(() => {
    if (selectedProject !== null) {
      const project = projects[selectedProject];
      const images = getProjectImages(project.title);
      preloadImages(images);
    }
  }, [selectedProject]);

  const nextImage = () => {
    const project = projects[selectedProject!];
    const images = getProjectImages(project.title);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const project = projects[selectedProject!];
    const images = getProjectImages(project.title);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: { icon: React.ComponentType<any>, color: string } } = {
      'React': { icon: SiReact, color: '#61DAFB' },
      'TypeScript': { icon: SiTypescript, color: '#3178C6' },
      'PHP': { icon: SiPhp, color: '#777BB4' },
      'MySQL': { icon: SiMysql, color: '#4479A1' },
      'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
      'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
      'Python': { icon: SiPython, color: '#3776AB' },
      'Node.js': { icon: SiNodedotjs, color: '#339933' },
      'Laravel': { icon: SiLaravel, color: '#FF2D20' },
      'MongoDB': { icon: SiMongodb, color: '#47A248' },
      'Express': { icon: SiExpress, color: '#FFFFFF' },
      'Bootstrap': { icon: SiBootstrap, color: '#7952B3' },
      'Bootstrap 5': { icon: SiBootstrap, color: '#7952B3' },
      'Flask': { icon: SiFlask, color: '#FFFFFF' },
      'HTML': { icon: SiHtml5, color: '#E34F26' },
      'CSS': { icon: SiCss3, color: '#1572B6' },
      'Vite': { icon: SiVite, color: '#646CFF' },
      'Chart.js': { icon: SiChartdotjs, color: '#FF6384' },
      'FontAwesome': { icon: SiFontawesome, color: '#339AF0' }
    };
    return iconMap[tech] || { icon: () => <span>?</span>, color: '#6B7280' };
  };

  const projects = [
    {
      title: 'Budget Management System',
      description: 'A comprehensive web application for managing budgets, programs, and users with role-based access control.',
      fullDescription: 'A comprehensive web application for managing budgets, programs, and users. This portal facilitates the tracking of financial programs, document management, and user administration with role-based access control. Features include secure login, interactive dashboards, program workflow tracking (Draft -> Completed), and detailed reporting.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg1.png',
      featured: true,
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
      color: 'cyan',
      sourceCode: 'https://github.com/Irrfan47/budget_management_system',
      status: 'LIVE'
    },
    {
      title: 'Program Management System',
      description: 'Platform for managing government programs with role-based access, document handling, budget tracking, and dashboards.',
      fullDescription: 'A comprehensive platform designed for managing government programs with advanced features including role-based access control, document handling, budget tracking, and interactive dashboards. Built with modern web technologies to provide efficient program management and monitoring capabilities.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_1.png',
      featured: true,
      tags: ['React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS'],
      color: 'purple',
      sourceCode: 'https://github.com/Irrfan47/Kedah-Plan-Hub',
      status: 'LIVE'
    },
    {
      title: 'Helpdesk System',
      description: 'Ticket management system with authentication, real-time notifications, file attachments, and analytics dashboard.',
      fullDescription: 'A comprehensive ticket management system featuring user authentication, real-time notifications, file attachment capabilities, and detailed analytics dashboard. Designed to streamline support operations and improve customer service efficiency.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_1.png',
      featured: true,
      tags: ['React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS', 'Vite'],
      color: 'green',
      sourceCode: 'https://github.com/Irrfan47/helpdesk',
      status: 'LIVE'
    },
    {
      title: 'Equipment Management System',
      description: 'System for equipment tracking, user management, CRUD operations, and PDF reporting with role-based access.',
      fullDescription: 'A robust equipment management system designed for tracking equipment, managing users, performing CRUD operations, and generating PDF reports. Features role-based access control to ensure proper data security and user permissions.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_1.png',
      featured: false,
      tags: ['PHP', 'MySQL', 'Tailwind CSS', 'FontAwesome', 'JavaScript'],
      color: 'pink',
      sourceCode: 'https://github.com/Irrfan47/equipment_management_system',
      status: 'LIVE'
    },
    {
      title: 'Quotation Management System',
      description: 'Quotation tracking system with staff management, role-based access, and real-time status updates.',
      fullDescription: 'A comprehensive quotation management system that enables efficient tracking of quotations, staff management, and role-based access control. Features real-time status updates to keep all stakeholders informed about quotation progress.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_1.png',
      featured: false,
      tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'FontAwesome'],
      color: 'cyan',
      sourceCode: 'https://github.com/Irrfan47/quotation-management-system',
      status: 'LIVE'
    },
    {
      title: 'Web Application Vulnerability Scanner',
      description: 'Python-based tool for detecting SQLi, XSS, and misconfigurations with Flask web interface and reports.',
      fullDescription: 'A sophisticated Python-based security tool designed to detect SQL injection, XSS vulnerabilities, and misconfigurations in web applications. Features a Flask web interface for easy interaction and comprehensive reporting capabilities for security assessments.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_1.png',
      featured: false,
      tags: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      color: 'purple',
      sourceCode: 'https://github.com/Irrfan47/Web-Application-Vulnerability-Scanner',
      status: 'FYP'
    },
    {
      title: 'Enterprise Management System',
      description: 'Comprehensive management system for enterprises with ticketing, quotations, fleet tracking, and dashboard analytics.',
      fullDescription: 'An all-in-one enterprise management system that combines ticketing, quotation management, fleet tracking, and comprehensive dashboard analytics. Designed to streamline enterprise operations and provide valuable insights through integrated analytics.',
      image: 'https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_1.png',
      featured: true,
      tags: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'FontAwesome', 'Chart.js'],
      color: 'green',
      sourceCode: 'https://github.com/Irrfan47/Enterprise-Management-System',
      status: 'LIVE'
    },
  ];

  // Project Detail View
  if (selectedProject !== null) {
    const project = projects[selectedProject];
    const images = getProjectImages(project.title);

    return (
      <div className="max-w-4xl">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-mono text-sm animate-fade-in-up"
        >
          <ArrowLeft className="w-4 h-4" />
          cd ..
        </button>

        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">{project.title}</h1>
            <span className={`px-2 py-1 text-xs font-mono rounded ${project.status === 'LIVE' ? 'bg-glow-green/10 text-glow-green border border-glow-green/30' :
              'bg-secondary/10 text-secondary border border-secondary/30'
              }`}>
              {project.status}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed font-mono text-sm">
            {project.fullDescription}
          </p>
        </div>

        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-primary text-xs font-mono mb-4">// Tech Stack:</p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, tagIndex) => {
              const techIcon = getTechIcon(tag);
              const IconComponent = techIcon.icon;
              return (
                <div
                  key={tagIndex}
                  className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
                  title={tag}
                >
                  <IconComponent size={20} style={{ color: techIcon.color }} />
                  <span className="text-foreground text-sm font-mono">{tag}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card hover:bg-muted text-foreground px-6 py-3 rounded-lg transition-all border border-border hover:border-primary/50 hover:shadow-neon-cyan font-mono text-sm"
          >
            <Github className="w-5 h-5" />
            view source code
          </a>
        </div>

        {images.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <GlowCard className="overflow-hidden" glowColor={project.color as any} hover={false}>
              <div className="relative">
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  {isLoadingImages && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader className="w-5 h-5 animate-spin" />
                      <span className="font-mono text-sm">loading images...</span>
                    </div>
                  )}
                  <img
                    src={images[currentImageIndex]}
                    alt={`${project.title} Screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground p-2 rounded-full border border-border hover:border-primary/50 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground p-2 rounded-full border border-border hover:border-primary/50 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-mono border border-border">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            </GlowCard>
          </div>
        )}
      </div>
    );
  }

  // Projects List View
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent" />
          <span className="text-secondary font-mono text-sm">~/projects</span>
          <div className="h-px flex-1 bg-gradient-to-l from-secondary/50 to-transparent" />
        </div>
        <p className="text-muted-foreground text-center font-mono text-sm">
          <span className="text-primary">$</span> ls -la ./projects <span className="text-muted-foreground/50">// showcase of my work</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedProject(index);
              setCurrentImageIndex(0);
            }}
          >
            <GlowCard className="overflow-hidden h-full" glowColor={project.color as any}>
              <div className="relative">
                {project.featured && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-mono px-2 py-1 rounded">
                    <Star className="w-3 h-3" />
                    featured
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`text-xs px-2 py-1 rounded font-mono ${project.status === 'LIVE' ? 'bg-glow-green/90 text-background' :
                    'bg-secondary/90 text-foreground'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <div className="h-40 sm:h-48 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-card/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm">
                      <Eye className="w-5 h-5" />
                      view project
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-foreground font-display font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-xs font-mono line-clamp-2 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag, tagIndex) => {
                    const techIcon = getTechIcon(tag);
                    const IconComponent = techIcon.icon;
                    return (
                      <div
                        key={tagIndex}
                        className="w-6 h-6 bg-muted rounded flex items-center justify-center"
                        title={tag}
                      >
                        <IconComponent size={14} style={{ color: techIcon.color }} />
                      </div>
                    );
                  })}
                  {project.tags.length > 4 && (
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground font-mono">
                      +{project.tags.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </GlowCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
