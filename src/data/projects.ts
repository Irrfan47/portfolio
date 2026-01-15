export interface Project {
  id: string;
  name: string;
  version: string;
  status: "LIVE" | "FYP" | "STABLE" | "ACTIVE" | "BETA";
  description: string;
  fullDescription: string;
  techStack: string[];
  screenshots: string[];
  sourceCode: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "padetha-rusk",
    name: "Padetha Rusk",
    version: "v1.0.0",
    status: "LIVE",
    description: "A legendary Burmese tea-time tradition since 1967, specializing in perfectly crispy, traditional twice-baked cake rusks.",
    fullDescription: "Established in the heart of Pyawbwe Township, Mandalay Region, Padetha Rusk is an iconic symbol of Burmese tea-time culture. For over 55 years, the brand has preserved a guarded family recipe and a traditional twice-baked method to create its signature golden color and satisfying crunch. What began as a family’s passion in 1967 has grown into a household name across Myanmar and beyond, continuing to bring families together one perfect dip at a time.",
    techStack: ["React", "Tailwind CSS", "TypeScript", "HTML"],
    screenshots: [
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pdt1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pdt2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pdt3.png"
    ],
    sourceCode: "https://padetha.xz3tt.dev",
    featured: true
  },
  {
    id: "budget-management-system",
    name: "Budget Management System",
    version: "v1.0.0",
    status: "LIVE",
    description: "A comprehensive web application for managing budgets, programs, and users with role-based access control.",
    fullDescription: "A comprehensive web application for managing budgets, programs, and users. This portal facilitates the tracking of financial programs, document management, and user administration with role-based access control. Features include secure login, interactive dashboards, program workflow tracking (Draft -> Completed), and detailed reporting.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    screenshots: [
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg3.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg4.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg5.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/bg6.png"
    ],
    sourceCode: "https://github.com/Irrfan47/budget_management_system",
    featured: true
  },
  {
    id: "program-management-system",
    name: "Program Management System",
    version: "v1.0.0",
    status: "LIVE",
    description: "Platform for managing government programs with role-based access, document handling, budget tracking, and dashboards.",
    fullDescription: "A comprehensive platform designed for managing government programs with advanced features including role-based access control, document handling, budget tracking, and interactive dashboards. Built with modern web technologies to provide efficient program management and monitoring capabilities.",
    techStack: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS"],
    screenshots: [
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/pms_3.png"
    ],
    sourceCode: "https://github.com/Irrfan47/Kedah-Plan-Hub",
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
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/helpdesk_3.png"
    ],
    sourceCode: "https://github.com/Irrfan47/helpdesk",
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
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_3.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_4.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/equipment_5.png"
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
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_3.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_4.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/quotes_5.png"
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
    fullDescription: "A sophisticated Python-based security tool designed to detect SQL injection, XSS vulnerabilities, and misconfigurations in web applications. Features a Flask web interface for easy interaction and comprehensive reporting capabilities for security assessments.",
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    screenshots: [
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/WAVS_3.png"
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
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_1.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_2.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_3.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_4.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_5.png",
      "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/ems_6.png"
    ],
    sourceCode: "https://github.com/Irrfan47/Enterprise-Management-System",
    featured: true
  },
];
