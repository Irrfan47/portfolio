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
    id: "fleet-management-system",
    name: "Sistem Pengurusan Armada (Fleet Management System)",
    version: "v1.0.0",
    status: "STABLE",
    description: "Enterprise fleet management system with role-based dashboard, vehicle tracking, driver allocation, and automated compliance alerts.",
    fullDescription: "State-of-the-art secure fleet management platform designed for organizational logistics tracking. Features comprehensive vehicle lifecycles, booking workflows with checkout/checkin validations, compliance document expiry alerts, and advanced cybersecurity protections (persistent user lockouts on 5 failed attempts, API security headers, environment-scoped demo access, and strict rate limits).\n\nChallenge: Securing the authentication pipeline against distributed password-guessing and injection attacks while maintaining an accessible development sandbox.\nSolution: Implemented database-level user locking paired with unified error translations to counter brute-force tactics. Designed a dedicated SecureHeaders PHP middleware configuring restrictive Content-Security-Policies, X-Frame-Options, and HSTS. Constructed a conditional compilation process using Vite variables to completely hide developer credentials in production builds.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "PHP", "Laravel", "MySQL", "Sanctum"],
    screenshots: [
      "/optimized_images/fleet1.webp",
      "/optimized_images/fleet2.webp",
      "/optimized_images/fleet3.webp",
      "/optimized_images/fleet4.webp",
      "/optimized_images/fleet5.webp",
      "/optimized_images/fleet6.webp"
    ],
    sourceCode: "https://github.com/Irrfan47/Fleet_Management_System_Bolt",
    featured: true
  },
  {
    id: "filmophia",
    name: "Filmophia",
    version: "v1.0.0",
    status: "LIVE",
    description: "Real-time movie discovery platform with Supabase auth, TMDB integration, and glassmorphism UI achieving 60% reduction in API-related lag.",
    fullDescription: "Entertainment discovery platform consuming the TMDB API with React Query caching layer to handle deep media asset trees without blocking the UI thread. Implemented Supabase-backed authentication with a personalized favorites system and real-time watchlist sync across devices.\n\nChallenge: Rendering hundreds of high-resolution poster images and live API data without degrading scroll performance or causing layout shifts.\nSolution: Built a multi-tier caching strategy with React Query (stale-while-revalidate), intersection-observer-based lazy loading, and hardware-accelerated Framer Motion transitions. Reduced API-related UI lag by 60% and achieved consistent 60fps scroll on mid-range devices.",
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
    description: "Heritage brand digital presence for a 55-year-old Burmese institution, increasing cross-generational engagement by 40%.",
    fullDescription: "Digital transformation of a 55-year-old Burmese tea-time brand — built from scratch with a custom design system that bridges traditional heritage aesthetics with modern web conventions. The challenge was representing decades of brand identity without alienating younger audiences or losing the artisanal feel.\n\nChallenge: Modernizing a legacy brand's digital presence without diluting 55 years of heritage identity.\nSolution: Designed a custom color palette and typography system inspired by traditional Burmese packaging. Implemented scroll-driven storytelling with performance-optimized image sequences. Achieved a 40% increase in cross-generational digital engagement measured via analytics.",
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
    description: "Multi-role financial workflow system with RBAC, state machine transitions, and real-time audit logging.",
    fullDescription: "Multi-role financial workflow system managing program lifecycle from draft to approval. Implemented RBAC with four distinct permission levels, optimistic UI updates for concurrent budget edits, and PDF report generation with real-time audit logging. Reduced cross-team approval cycles by enforcing state machine transitions at the API layer.\n\nChallenge: Managing high-complexity state for multi-step financial workflows where concurrent edits from different departments could cause data races and approval conflicts.\nSolution: Architected a centralized state management pattern with optimistic locking, where each budget edit is validated against a version hash before commit. Built a state machine at the API layer that enforces Draft → Review → Approved → Completed transitions, preventing invalid state jumps. Reduced cross-component communication errors by 80%.",
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
    description: "Government allocation platform serving 500+ concurrent users with role-based document workflows and budget audit trails.",
    fullDescription: "Production government system managing state-level resource allocations for Kedah, Malaysia. Handles role-based document workflows, budget tracking with historical audit trails, and interactive dashboards aggregating data across multiple departments. Currently serving 500+ concurrent users in a live government environment.\n\nChallenge: Building a system that handles real organizational complexity — multi-department coordination, strict permission hierarchies, and audit requirements for government compliance.\nSolution: Designed a granular RBAC system with department-scoped permissions, implemented document version control with full audit trails, and built real-time budget dashboards with drill-down capability. The PHP backend enforces business rules at the API layer, preventing unauthorized state transitions.",
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
    description: "Enterprise ticket management with real-time notifications, SLA tracking, and analytics dashboards for support operations.",
    fullDescription: "Enterprise ticket management system designed to streamline support operations across multiple departments. Features real-time notification pipeline, file attachment handling with size/type validation, SLA tracking with escalation rules, and analytics dashboards that surface resolution time trends.\n\nChallenge: Building a notification system that reliably delivers ticket updates without polling overhead, while maintaining ticket state consistency across concurrent agent sessions.\nSolution: Implemented a real-time notification architecture using server-sent events, with a fallback polling mechanism for unreliable connections. Built an optimistic UI layer that reflects ticket status changes immediately while reconciling with the server state asynchronously. Improved average ticket resolution time by providing agents with actionable analytics.",
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
    description: "Asset tracking system with PDF reporting, role-based CRUD, and equipment lifecycle management.",
    fullDescription: "Equipment lifecycle management system tracking assets from procurement through maintenance to decommission. Features role-based CRUD with four permission tiers, automated PDF report generation for inventory audits, and a maintenance scheduling system with overdue alerts.\n\nChallenge: Designing a data model flexible enough to track diverse equipment types (vehicles, IT assets, tools) with varying metadata schemas, while maintaining consistent reporting.\nSolution: Implemented a polymorphic equipment schema with type-specific metadata fields stored as structured JSON, enabling unified CRUD operations across equipment categories. Built a PDF generation pipeline using server-side templating that handles dynamic column layouts based on equipment type.",
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
    description: "Multi-stage quotation workflow with staff allocation, real-time status tracking, and approval chains.",
    fullDescription: "Multi-stage quotation management system enabling the full lifecycle from draft creation through approval chains to client delivery. Implements staff assignment with workload balancing, real-time status tracking across departments, and role-based visibility controls.\n\nChallenge: Coordinating quotation approval across multiple stakeholders with different availability schedules, while preventing bottlenecks in the approval pipeline.\nSolution: Built a priority queue-based assignment system that factors in staff workload and department capacity. Implemented notification chains that escalate stalled quotations after configurable SLA thresholds, reducing average approval turnaround time.",
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
    description: "Automated security scanner detecting SQLi, XSS, and misconfigurations with 35% improved accuracy over baseline tools.",
    fullDescription: "Automated web application security tool performing targeted vulnerability assessments for SQL injection, cross-site scripting, and server misconfigurations. Features a Flask-based web interface for scan configuration and comprehensive HTML/PDF reporting with severity classifications.\n\nChallenge: Minimizing false positives in vulnerability detection across varying web architectures — different frameworks, templating engines, and WAF configurations produce wildly different response patterns.\nSolution: Developed a custom regex-based scanning engine with recursive payload testing that adapts its detection strategy based on initial response fingerprinting. Implemented a confidence scoring system that categorizes findings by severity and likelihood, resulting in a 35% improvement in detection accuracy compared to baseline open-source scanners.",
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
    description: "Unified enterprise platform integrating ticketing, quotations, fleet tracking, and analytics across 6 operational modules.",
    fullDescription: "Unified enterprise platform consolidating six operational modules — ticketing, quotation management, fleet tracking, staff management, inventory control, and executive dashboards — into a single system. Designed to replace multiple disconnected spreadsheets and legacy tools with a centralized data layer.\n\nChallenge: Integrating six independently-designed operational modules into a unified system without data silos, while maintaining per-module access control and preserving existing business workflows.\nSolution: Designed a shared database schema with module-scoped views and cross-module reference integrity. Built a unified dashboard that aggregates KPIs from all modules using Chart.js with lazy-loaded data fetching. Implemented a role-based navigation system where each user sees only the modules relevant to their department, reducing onboarding time for new staff.",
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
    description: "Performance-optimized portfolio with Nothing OS aesthetic, custom spring-physics cursor, and 98 Lighthouse score.",
    fullDescription: "Personal portfolio built with a Nothing OS-inspired design language — featuring a custom spring-physics cursor, terminal-style boot sequence, and bento grid layout. Optimized for Core Web Vitals with prerendered HTML for SEO, Brotli compression, and intelligent code splitting.\n\nChallenge: Achieving premium animation quality (custom cursor, page transitions, scroll-driven effects) while maintaining sub-100ms interaction latency on lower-end mobile devices.\nSolution: Implemented hardware-accelerated spring physics using Framer Motion's useSpring with tuned stiffness/damping values. Separated animation-heavy components into lazy-loaded chunks, prerendered static HTML with Puppeteer for instant first paint, and achieved a 98 Lighthouse Performance score with a 12kB first-paint bundle.",
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
