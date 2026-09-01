export interface Project {
  id: string;
  name: string;
  version: string;
  status: "LIVE" | "FYP" | "STABLE" | "ACTIVE" | "BETA" | "DEV" | "IN_DEV";
  company?: {
    name: string;
    logo?: string;
    url?: string;
  };
  description: string;
  fullDescription: string;
  techStack: string[];
  screenshots: string[];
  sourceCode?: string;
  liveUrl?: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  schemaType?: "SoftwareApplication" | "WebApplication" | "CreativeWork";
  relatedProjectIds?: string[];
}

export const projects: Project[] = [
  {
    id: "classical-architect-landing-website",
    name: "Classical Architect",
    version: "v1.0.0",
    status: "IN_DEV",
    company: {
      name: "Classical Architect",
      logo: "/images/companies/classical_architect.webp",
    },
    description: "Responsive showcase site with secure admin control panel, PHP backend, and MySQL database for real-time content and image updates.",
    fullDescription: "A premium digital presence for classical architecture portfolios. Features a modern landing page combined with an administrative dashboard for full content and image management.\n\nChallenge: Creating an intuitive content management interface that allows dynamic layouts without sacrificing frontend performance or security.\nSolution: Developed a secure login page and comprehensive user management system alongside PHP endpoints to serve dynamic site configurations. Leveraged React and TypeScript on the client side for smooth rendering, allowing administrators to update descriptions and manage site photos in real-time.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS"],
    screenshots: [
      "/images/projects/classical/classical_1.webp",
      "/images/projects/classical/classical_2.webp",
      "/images/projects/classical/classical_3.webp",
      "/images/projects/classical/classical_4.webp",
      "/images/projects/classical/classical_5.webp",
      "/images/projects/classical/classical_6.webp"
    ],
    featured: true,
    seoTitle: "Classical Architect — Architecture CMS & Admin Dashboard | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["padetha-rusk", "personal-portfolio", "filmophia"]
  },
  {
    id: "fleet-management-system",
    name: "Sistem Pengurusan Armada (Fleet Management System)",
    version: "v1.0.0",
    status: "IN_DEV",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Enterprise fleet management system with role-based dashboard, vehicle tracking, driver allocation, and automated compliance alerts.",
    fullDescription: "State-of-the-art secure fleet management platform designed for organizational logistics tracking. Features comprehensive vehicle lifecycles, booking workflows with checkout/checkin validations, compliance document expiry alerts, and advanced cybersecurity protections (persistent user lockouts on 5 failed attempts, API security headers, environment-scoped demo access, and strict rate limits).\n\nChallenge: Securing the authentication pipeline against distributed password-guessing and injection attacks while maintaining an accessible development sandbox.\nSolution: Implemented database-level user locking paired with unified error translations to counter brute-force tactics. Designed a dedicated SecureHeaders PHP middleware configuring restrictive Content-Security-Policies, X-Frame-Options, and HSTS. Constructed a conditional compilation process using Vite variables to completely hide developer credentials in production builds.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "PHP", "Laravel", "MySQL", "Sanctum"],
    screenshots: [
      "/images/projects/fleet/fleet1.webp",
      "/images/projects/fleet/fleet2.webp",
      "/images/projects/fleet/fleet3.webp",
      "/images/projects/fleet/fleet4.webp",
      "/images/projects/fleet/fleet5.webp",
      "/images/projects/fleet/fleet6.webp"
    ],
    featured: true,
    seoTitle: "Fleet Management System — Enterprise Fleet & Logistics Platform | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["allocation-management-system", "enterprise-management-system", "equipment-management-system"]
  },
  {
    id: "filmophia",
    name: "Filmophia",
    version: "v1.0.0",
    status: "LIVE",
    company: {
      name: "Filmophia",
      logo: "/images/companies/filmophia.webp",
      url: "https://filmophia.lovable.app/"
    },
    description: "Real-time movie discovery platform with Supabase auth, TMDB integration, and glassmorphism UI achieving 60% reduction in API-related lag.",
    fullDescription: "Entertainment discovery platform consuming the TMDB API with React Query caching layer to handle deep media asset trees without blocking the UI thread. Implemented Supabase-backed authentication with a personalized favorites system and real-time watchlist sync across devices.\n\nChallenge: Rendering hundreds of high-resolution poster images and live API data without degrading scroll performance or causing layout shifts.\nSolution: Built a multi-tier caching strategy with React Query (stale-while-revalidate), intersection-observer-based lazy loading, and hardware-accelerated Framer Motion transitions. Reduced API-related UI lag by 60% and achieved consistent 60fps scroll on mid-range devices.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "TMDB API", "Framer Motion"],
    screenshots: [
      "/images/projects/filmophia/filmophia_1.webp",
      "/images/projects/filmophia/filmophia(2).webp",
      "/images/projects/filmophia/filmophia(3).webp",
      "/images/projects/filmophia/filmophia(4).webp"
    ],
    sourceCode: "https://github.com/Irrfan47/filmophia",
    liveUrl: "https://filmophia.lovable.app/",
    featured: true,
    seoTitle: "Filmophia — Real-time Movie Discovery & Streaming Catalog | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["personal-portfolio", "classical-architect-landing-website", "padetha-rusk"]
  },

  {
    id: "padetha-rusk",
    name: "Padetha Rusk",
    version: "v1.0.0",
    status: "STABLE",
    company: {
      name: "Personal Project",
      logo: "/images/companies/personal-project.svg"
    },
    description: "Heritage brand digital presence for a 55-year-old Burmese institution, increasing cross-generational engagement by 40%.",
    fullDescription: "Digital transformation of a 55-year-old Burmese tea-time brand — built from scratch with a custom design system that bridges traditional heritage aesthetics with modern web conventions. The challenge was representing decades of brand identity without alienating younger audiences or losing the artisanal feel.\n\nChallenge: Modernizing a legacy brand's digital presence without diluting 55 years of heritage identity.\nSolution: Designed a custom color palette and typography system inspired by traditional Burmese packaging. Implemented scroll-driven storytelling with performance-optimized image sequences. Achieved a 40% increase in cross-generational digital engagement measured via analytics.",
    techStack: ["React", "Tailwind CSS", "TypeScript", "HTML"],
    screenshots: [
      "/images/projects/padetha/pdt1.webp",
      "/images/projects/padetha/pdt2.webp",
      "/images/projects/padetha/pdt3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/padetha-rusk",
    featured: true,
    seoTitle: "Padetha Rusk — Heritage Brand Digital Platform & UX Design | Kaung Khant Mg Mg",
    schemaType: "CreativeWork",
    relatedProjectIds: ["classical-architect-landing-website", "personal-portfolio", "filmophia"]
  },
  {
    id: "budget-management-system",
    name: "Budget Management System",
    version: "v1.0.0",
    status: "STABLE",
    company: {
      name: "Personal Project",
      logo: "/images/companies/personal-project.svg"
    },
    description: "Multi-role financial workflow system with RBAC, state machine transitions, and real-time audit logging.",
    fullDescription: "Multi-role financial workflow system managing program lifecycle from draft to approval. Implemented RBAC with four distinct permission levels, optimistic UI updates for concurrent budget edits, and PDF report generation with real-time audit logging. Reduced cross-team approval cycles by enforcing state machine transitions at the API layer.\n\nChallenge: Managing high-complexity state for multi-step financial workflows where concurrent edits from different departments could cause data races and approval conflicts.\nSolution: Architected a centralized state management pattern with optimistic locking, where each budget edit is validated against a version hash before commit. Built a state machine at the API layer that enforces Draft → Review → Approved → Completed transitions, preventing invalid state jumps. Reduced cross-component communication errors by 80%.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    screenshots: [
      "/images/projects/budget/bg1.webp",
      "/images/projects/budget/bg2.webp",
      "/images/projects/budget/bg3.webp",
      "/images/projects/budget/bg4.webp",
      "/images/projects/budget/bg5.webp",
      "/images/projects/budget/bg6.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/budget_management_system",
    featured: true,
    seoTitle: "Budget Management System — Multi-Role Financial Workflow Engine | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["allocation-management-system", "quotation-management-system", "enterprise-management-system"]
  },
  {
    id: "allocation-management-system",
    name: "Allocation Management System",
    version: "v2.0.0",
    status: "LIVE",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Government allocation platform serving 500+ concurrent users with role-based document workflows and budget audit trails.",
    fullDescription: "Production government system managing state-level resource allocations for Kedah, Malaysia. Handles role-based document workflows, budget tracking with historical audit trails, and interactive dashboards aggregating data across multiple departments. Currently serving 500+ concurrent users in a live government environment.\n\nChallenge: Building a system that handles real organizational complexity — multi-department coordination, strict permission hierarchies, and audit requirements for government compliance.\nSolution: Designed a granular RBAC system with department-scoped permissions, implemented document version control with full audit trails, and built real-time budget dashboards with drill-down capability. The PHP backend enforces business rules at the API layer, preventing unauthorized state transitions.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS"],
    screenshots: [
      "/images/projects/allocation/pms_1.webp",
      "/images/projects/allocation/pms_2.webp",
      "/images/projects/allocation/pms_3.webp"
    ],
    liveUrl: "https://peruntukan.kedah.gov.my",
    featured: true,
    seoTitle: "Allocation Management System — Government Resource Platform | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["fleet-management-system", "budget-management-system", "enterprise-management-system"]
  },
  {
    id: "helpdesk-system",
    name: "Helpdesk System",
    version: "v1.0.0",
    status: "LIVE",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Enterprise ticket management with real-time notifications, SLA tracking, and analytics dashboards for support operations.",
    fullDescription: "Enterprise ticket management system designed to streamline support operations across multiple departments. Features real-time notification pipeline, file attachment handling with size/type validation, SLA tracking with escalation rules, and analytics dashboards that surface resolution time trends.\n\nChallenge: Building a notification system that reliably delivers ticket updates without polling overhead, while maintaining ticket state consistency across concurrent agent sessions.\nSolution: Implemented a real-time notification architecture using server-sent events, with a fallback polling mechanism for unreliable connections. Built an optimistic UI layer that reflects ticket status changes immediately while reconciling with the server state asynchronously. Improved average ticket resolution time by providing agents with actionable analytics.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS", "Vite"],
    screenshots: [
      "/images/projects/helpdesk/helpdesk_1.webp",
      "/images/projects/helpdesk/helpdesk_2.webp",
      "/images/projects/helpdesk/helpdesk_3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/helpdesk",
    liveUrl: "https://helpdesk.nurkamal.com.my/",
    featured: true,
    seoTitle: "Helpdesk System — Enterprise Ticket Management & SLA Tracking | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["enterprise-management-system", "equipment-management-system", "quotation-management-system"]
  },
  {
    id: "equipment-management-system",
    name: "Equipment Management System",
    version: "v1.0.0",
    status: "LIVE",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Asset tracking system with PDF reporting, role-based CRUD, and equipment lifecycle management.",
    fullDescription: "Equipment lifecycle management system tracking assets from procurement through maintenance to decommission. Features role-based CRUD with four permission tiers, automated PDF report generation for inventory audits, and a maintenance scheduling system with overdue alerts.\n\nChallenge: Designing a data model flexible enough to track diverse equipment types (vehicles, IT assets, tools) with varying metadata schemas, while maintaining consistent reporting.\nSolution: Implemented a polymorphic equipment schema with type-specific metadata fields stored as structured JSON, enabling unified CRUD operations across equipment categories. Built a PDF generation pipeline using server-side templating that handles dynamic column layouts based on equipment type.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "FontAwesome", "JavaScript"],
    screenshots: [
      "/images/projects/equipment/equipment_1.webp",
      "/images/projects/equipment/equipment_2.webp",
      "/images/projects/equipment/equipment_3.webp",
      "/images/projects/equipment/equipment_4.webp",
      "/images/projects/equipment/equipment_5.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/equipment_management_system",
    featured: false,
    seoTitle: "Equipment Management System — Asset Lifecycle Tracking & Audits | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["fleet-management-system", "enterprise-management-system", "helpdesk-system"]
  },
  {
    id: "quotation-management-system",
    name: "Quotation Management System",
    version: "v1.0.0",
    status: "LIVE",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Multi-stage quotation workflow with staff allocation, real-time status tracking, and approval chains.",
    fullDescription: "Multi-stage quotation management system enabling the full lifecycle from draft creation through approval chains to client delivery. Implements staff assignment with workload balancing, real-time status tracking across departments, and role-based visibility controls.\n\nChallenge: Coordinating quotation approval across multiple stakeholders with different availability schedules, while preventing bottlenecks in the approval pipeline.\nSolution: Built a priority queue-based assignment system that factors in staff workload and department capacity. Implemented notification chains that escalate stalled quotations after configurable SLA thresholds, reducing average approval turnaround time.",
    techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "FontAwesome"],
    screenshots: [
      "/images/projects/quotes/quotes_1.webp",
      "/images/projects/quotes/quotes_2.webp",
      "/images/projects/quotes/quotes_3.webp",
      "/images/projects/quotes/quotes_4.webp",
      "/images/projects/quotes/quotes_5.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/quotation-management-system",
    featured: false,
    seoTitle: "Quotation Management System — B2B Workflow & Approval Engine | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["budget-management-system", "enterprise-management-system", "helpdesk-system"]
  },
  {
    id: "web-app-vulnerability-scanner",
    name: "Web App Vulnerability Scanner",
    version: "v0.9.1",
    status: "FYP",
    company: {
      name: "Personal Project",
      logo: "/images/companies/personal-project.svg"
    },
    description: "Automated security scanner detecting SQLi, XSS, and misconfigurations with 35% improved accuracy over baseline tools.",
    fullDescription: "Automated web application security tool performing targeted vulnerability assessments for SQL injection, cross-site scripting, and server misconfigurations. Features a Flask-based web interface for scan configuration and comprehensive HTML/PDF reporting with severity classifications.\n\nChallenge: Minimizing false positives in vulnerability detection across varying web architectures — different frameworks, templating engines, and WAF configurations produce wildly different response patterns.\nSolution: Developed a custom regex-based scanning engine with recursive payload testing that adapts its detection strategy based on initial response fingerprinting. Implemented a confidence scoring system that categorizes findings by severity and likelihood, resulting in a 35% improvement in detection accuracy compared to baseline open-source scanners.",
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    screenshots: [
      "/images/projects/wavs/WAVS_1.webp",
      "/images/projects/wavs/WAVS_2.webp",
      "/images/projects/wavs/WAVS_3.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/Web-Application-Vulnerability-Scanner",
    featured: false,
    seoTitle: "Web App Vulnerability Scanner — SQL Injection & XSS Security Tool | Kaung Khant Mg Mg",
    schemaType: "SoftwareApplication",
    relatedProjectIds: ["fleet-management-system", "enterprise-management-system", "personal-portfolio"]
  },
  {
    id: "enterprise-management-system",
    name: "Enterprise Management System",
    version: "v1.2.0",
    status: "LIVE",
    company: {
      name: "Nurkamal",
      logo: "/images/companies/nurkamal_logo.webp",
      url: "https://nurkamal.com.my"
    },
    description: "Unified enterprise platform integrating ticketing, quotations, fleet tracking, and analytics across 6 operational modules.",
    fullDescription: "Unified enterprise platform consolidating six operational modules — ticketing, quotation management, fleet tracking, staff management, inventory control, and executive dashboards — into a single system. Designed to replace multiple disconnected spreadsheets and legacy tools with a centralized data layer.\n\nChallenge: Integrating six independently-designed operational modules into a unified system without data silos, while maintaining per-module access control and preserving existing business workflows.\nSolution: Designed a shared database schema with module-scoped views and cross-module reference integrity. Built a unified dashboard that aggregates KPIs from all modules using Chart.js with lazy-loaded data fetching. Implemented a role-based navigation system where each user sees only the modules relevant to their department, reducing onboarding time for new staff.",
    techStack: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "FontAwesome", "Chart.js"],
    screenshots: [
      "/images/projects/ems/ems_1.webp",
      "/images/projects/ems/ems_2.webp",
      "/images/projects/ems/ems_3.webp",
      "/images/projects/ems/ems_4.webp",
      "/images/projects/ems/ems_5.webp",
      "/images/projects/ems/ems_6.webp"
    ],
    liveUrl: "https://ems.nurkamal.com.my/",
    featured: true,
    seoTitle: "Enterprise Management System — Unified ERP & Operational Modules | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["fleet-management-system", "helpdesk-system", "quotation-management-system"]
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    version: "v2.0.26",
    status: "LIVE",
    company: {
      name: "Personal Project",
      logo: "/images/companies/personal-project.svg",
      url: "https://portfolio.xzett.me"
    },
    description: "Performance-optimized portfolio with Nothing OS aesthetic, custom spring-physics cursor, and 98 Lighthouse score.",
    fullDescription: "Personal portfolio built with a Nothing OS-inspired design language — featuring a custom spring-physics cursor, terminal-style boot sequence, and bento grid layout. Optimized for Core Web Vitals with prerendered HTML for SEO, Brotli compression, and intelligent code splitting.\n\nChallenge: Achieving premium animation quality (custom cursor, page transitions, scroll-driven effects) while maintaining sub-100ms interaction latency on lower-end mobile devices.\nSolution: Implemented hardware-accelerated spring physics using Framer Motion's useSpring with tuned stiffness/damping values. Separated animation-heavy components into lazy-loaded chunks, prerendered static HTML with Puppeteer for instant first paint, and achieved a 98 Lighthouse Performance score with a 12kB first-paint bundle.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    screenshots: [
      "/images/projects/portfolio/portfolio1.webp",
      "/images/projects/portfolio/portfolio2.webp",
      "/images/projects/portfolio/portfolio3.webp",
      "/images/projects/portfolio/portfolio4.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/portfolio",
    liveUrl: "https://portfolio.xzett.me",
    featured: true,
    seoTitle: "Personal Portfolio — Nothing OS Aesthetic & React Architecture | Kaung Khant Mg Mg",
    schemaType: "WebApplication",
    relatedProjectIds: ["filmophia", "padetha-rusk", "classical-architect-landing-website"]
  }
];

