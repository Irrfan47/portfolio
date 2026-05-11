export interface Project {
  id: string;
  name: string;
  version: string;
  status: "LIVE" | "FYP" | "STABLE" | "ACTIVE" | "BETA" | "DEV";
  description: string;
  fullDescription: string;
  techStack: string[];
  screenshots: string[];
  sourceCode: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "filmophia",
    name: "Filmophia",
    version: "v1.0.0",
    status: "LIVE",
    description: "A premium movie and TV show discovery platform featuring real-time data from TMDB and seamless user authentication.",
    fullDescription: "Filmophia is a sophisticated entertainment discovery app built with React, TypeScript, and Supabase. It leverages the TMDB API to provide up-to-date information on trending and popular movies and TV shows. The application features a glassmorphism-inspired UI, smooth animations, a personalized favorites system, and a robust search engine, resulting in a premium user experience.\n\nChallenge: Handling deep media assets and live API data without impacting UI responsiveness.\nSolution: Implemented advanced caching with React Query and hardware-accelerated animations, reducing API-related UI lag by 60%.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "TMDB API", "Framer Motion"],
    screenshots: [
      "/optimized_images/filmophia(1).webp",
      "/optimized_images/filmophia(2).webp",
      "/optimized_images/filmophia(3).webp",
      "/optimized_images/filmophia(4).webp"
    ],
    sourceCode: "https://github.com/Irrfan47/filmophia",
    liveUrl: "https://filmophia.lovable.app/",
    featured: true
  },

  {
    id: "padetha-rusk",
    name: "Padetha Rusk",
    version: "v1.0.0",
    status: "LIVE",
    description: "A legendary Burmese tea-time tradition since 1967, specializing in perfectly crispy, traditional twice-baked cake rusks.",
    fullDescription: "Established in the heart of Pyawbwe Township, Mandalay Region, Padetha Rusk is an iconic symbol of Burmese tea-time culture. For over 55 years, the brand has preserved a guarded family recipe and a traditional twice-baked method to create its signature golden color and satisfying crunch. What began as a family’s passion in 1967 has grown into a household name across Myanmar and beyond, continuing to bring families together one perfect dip at a time.\n\nChallenge: Modernizing a 55-year-old family brand without losing its traditional legacy.\nSolution: Developed a custom design system with heritage-inspired visuals, leading to a 40% increase in cross-generational digital engagement.",
    techStack: ["React", "Tailwind CSS", "TypeScript", "HTML"],
    screenshots: [
      "/optimized_images/pdt1.webp",
      "/optimized_images/pdt2.webp",
      "/optimized_images/pdt3.webp"
    ],
    sourceCode: "https://padetha.xz3tt.dev",
    liveUrl: "https://padetha.xz3tt.dev",
    featured: true
  },
  {
    id: "budget-management-system",
    name: "Budget Management System",
    version: "v1.0.0",
    status: "DEV",
    description: "A comprehensive web application for managing budgets, programs, and users with role-based access control.",
    fullDescription: "A comprehensive web application for managing budgets, programs, and users. This portal facilitates the tracking of financial programs, document management, and user administration with role-based access control. Features include secure login, interactive dashboards, program workflow tracking (Draft -> Completed), and detailed reporting.\n\nChallenge: Managing high-complexity state for multi-step financial workflows and Role-Based Access Control (RBAC).\nSolution: Architected a centralized Redux-style state management pattern that reduced cross-component communication errors by 80% and streamlined the approval workflow.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    screenshots: [
      "/optimized_images/bg1.webp",
      "/optimized_images/bg2.webp",
      "/optimized_images/bg3.webp",
      "/optimized_images/bg4.webp",
      "/optimized_images/bg5.webp",
      "/optimized_images/bg6.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/budget_management_system",
    featured: true
  },
  {
    id: "allocation-management-system",
    name: "Allocation Management System",
    version: "v1.0.0",
    status: "LIVE",
    description: "Platform for managing government allocations with role-based access, document handling, budget tracking, and dashboards.",
    fullDescription: "A comprehensive platform designed for managing government allocations with advanced features including role-based access control, document handling, budget tracking, and interactive dashboards. Built with modern web technologies to provide efficient allocation management and monitoring capabilities.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS"],
    screenshots: [
      "/optimized_images/pms_1.webp",
      "/optimized_images/pms_2.webp",
      "/optimized_images/pms_3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/Kedah-Plan-Hub",
    liveUrl: "https://peruntukan.kedah.gov.my",
    featured: true
  },
  {
    id: "helpdesk-system",
    name: "Helpdesk System",
    version: "v1.0.0",
    status: "LIVE",
    description: "Ticket management system with authentication, real-time notifications, file attachments, and analytics dashboard.",
    fullDescription: "A comprehensive ticket management system featuring user authentication, real-time notifications, file attachment capabilities, and detailed analytics dashboard. Designed to streamline support operations and improve customer service efficiency.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS", "Vite"],
    screenshots: [
      "/optimized_images/helpdesk_1.webp",
      "/optimized_images/helpdesk_2.webp",
      "/optimized_images/helpdesk_3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/helpdesk",
    liveUrl: "https://helpdesk.nurkamal.com.my/",
    featured: true
  },
  {
    id: "equipment-management-system",
    name: "Equipment Management System",
    version: "v1.0.0",
    status: "LIVE",
    description: "System for equipment tracking, user management, CRUD operations, and PDF reporting with role-based access.",
    fullDescription: "A robust equipment management system designed for tracking equipment, managing users, performing CRUD operations, and generating PDF reports. Features role-based access control to ensure proper data security and user permissions.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "FontAwesome", "JavaScript"],
    screenshots: [
      "/optimized_images/equipment_1.webp",
      "/optimized_images/equipment_2.webp",
      "/optimized_images/equipment_3.webp",
      "/optimized_images/equipment_4.webp",
      "/optimized_images/equipment_5.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/equipment_management_system",
    featured: false
  },
  {
    id: "quotation-management-system",
    name: "Quotation Management System",
    version: "v1.0.0",
    status: "LIVE",
    description: "Quotation tracking system with staff management, role-based access, and real-time status updates.",
    fullDescription: "A comprehensive quotation management system that enables efficient tracking of quotations, staff management, and role-based access control. Features real-time status updates to keep all stakeholders informed about quotation progress.",
    techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "FontAwesome"],
    screenshots: [
      "/optimized_images/quotes_1.webp",
      "/optimized_images/quotes_2.webp",
      "/optimized_images/quotes_3.webp",
      "/optimized_images/quotes_4.webp",
      "/optimized_images/quotes_5.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/quotation-management-system",
    featured: false
  },
  {
    id: "web-app-vulnerability-scanner",
    name: "Web App Vulnerability Scanner",
    version: "v0.9.1",
    status: "FYP",
    description: "Python-based tool for detecting SQLi, XSS, and misconfigurations with Flask web interface and reports.",
    fullDescription: "A sophisticated Python-based security tool designed to detect SQL injection, XSS vulnerabilities, and misconfigurations in web applications. Features a Flask web interface for easy interaction and comprehensive reporting capabilities for security assessments.\n\nChallenge: Minimizing false positives in vulnerability detection across varying web architectures.\nSolution: Developed a custom regex-based scanning engine with recursive payload testing, resulting in a 35% improvement in detection accuracy compared to standard open-source scanners.",
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    screenshots: [
      "/optimized_images/WAVS_1.webp",
      "/optimized_images/WAVS_2.webp",
      "/optimized_images/WAVS_3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/Web-Application-Vulnerability-Scanner",
    featured: false
  },
  {
    id: "enterprise-management-system",
    name: "Enterprise Management System",
    version: "v1.2.0",
    status: "LIVE",
    description: "Comprehensive management system for enterprises with ticketing, quotations, fleet tracking, and dashboard analytics.",
    fullDescription: "An all-in-one enterprise management system that combines ticketing, quotation management, fleet tracking, and comprehensive dashboard analytics. Designed to streamline enterprise operations and provide valuable insights through integrated analytics.",
    techStack: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "FontAwesome", "Chart.js"],
    screenshots: [
      "/optimized_images/ems_1.webp",
      "/optimized_images/ems_2.webp",
      "/optimized_images/ems_3.webp",
      "/optimized_images/ems_4.webp",
      "/optimized_images/ems_5.webp",
      "/optimized_images/ems_6.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/Enterprise-Management-System",
    liveUrl: "https://ems.nurkamal.com.my/",
    featured: true
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    version: "v2.0.0",
    status: "LIVE",
    description: "A modern, responsive portfolio website featuring a unique 'Nothing OS' inspired design.",
    fullDescription: "A personal portfolio website designed to showcase my projects and skills. Built with a focus on unique aesthetics using a 'Nothing OS' inspired design language, it features smooth animations, a responsive layout, and a seamless user experience. The project demonstrates proficiency in modern frontend technologies and design principles.\n\nChallenge: Bridging the gap between a design-heavy 'Nothing OS' aesthetic and low-level performance metrics.\nSolution: Implemented hardware-accelerated spring physics for a custom cursor and optimized Framer Motion components, achieving a 'zero-lag' user experience even on lower-end mobile devices.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    screenshots: [
      "/optimized_images/portfolio1.webp",
      "/optimized_images/portfolio2.webp",
      "/optimized_images/portfolio3.webp",
      "/optimized_images/portfolio4.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/portfolio",
    liveUrl: "https://kaung.xz3tt.dev",
    featured: true
  },
];
