import { Project } from "@/data/projects";

export const SITE_ORIGIN = "https://portfolio.xzett.me";

export interface ProjectSEO {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  schemaType: "SoftwareApplication" | "WebApplication" | "CreativeWork";
  schemaJson: object;
}

export function getProjectSEO(project: Project): ProjectSEO {
  const title = project.seoTitle || `${project.name} | Kaung Khant Mg Mg Portfolio`;
  const description = project.seoDescription || project.description;
  const canonicalUrl = `${SITE_ORIGIN}/project/${project.id}/`;

  const imagePath = project.screenshots.length > 0 ? project.screenshots[0] : "/og-preview.png";
  const ogImage = imagePath.startsWith("http") ? imagePath : `${SITE_ORIGIN}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  // Determine appropriate Schema Type
  let schemaType: "SoftwareApplication" | "WebApplication" | "CreativeWork" = project.schemaType || "WebApplication";
  if (!project.schemaType) {
    if (project.id === "padetha-rusk") {
      schemaType = "CreativeWork";
    } else if (project.id === "web-app-vulnerability-scanner") {
      schemaType = "SoftwareApplication";
    } else {
      schemaType = "WebApplication";
    }
  }

  const baseSchema: Record<string, any> = {
    "@type": schemaType,
    "name": project.name,
    "description": description,
    "url": canonicalUrl,
    "image": ogImage,
    "author": {
      "@id": "https://portfolio.xzett.me/#person",
    },
    "keywords": project.techStack.join(", "),
  };

  if (project.liveUrl) {
    baseSchema["sameAs"] = project.liveUrl;
  }
  if (project.sourceCode) {
    baseSchema["codeRepository"] = project.sourceCode;
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_ORIGIN}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${SITE_ORIGIN}/#projects`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.name,
        "item": canonicalUrl
      }
    ]
  };

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      baseSchema
    ]
  };

  return {
    title,
    description,
    canonicalUrl,
    ogImage,
    schemaType,
    schemaJson: schemaGraph,
  };
}

export interface PageSEO {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType?: string;
  noIndex?: boolean;
}

export function getHomepageSEO(): PageSEO {
  return {
    title: "Kaung Khant Mg Mg | Full Stack Developer & UI/UX Specialist",
    description: "Kaung Khant Mg Mg is a Full Stack Developer specializing in React, TypeScript, and high-performance scalable systems. Explore projects, technical skills, and professional experience.",
    canonicalUrl: `${SITE_ORIGIN}/`,
    ogImage: `${SITE_ORIGIN}/og-preview.png`,
    ogType: "website"
  };
}

export function getNotFoundSEO(): PageSEO {
  return {
    title: "404: Page Not Found | Kaung Khant Mg Mg",
    description: "The requested page does not exist on Kaung Khant Mg Mg's portfolio.",
    canonicalUrl: "",
    ogImage: `${SITE_ORIGIN}/og-preview.png`,
    ogType: "website",
    noIndex: true
  };
}

export function updateDOMSEO(seo: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType?: string;
  schemaJson?: object;
}) {
  document.title = seo.title;

  const updateMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const [attrName, attrVal] = selector.replace(/^meta\[|\]$/g, "").split("=");
      if (attrName && attrVal) {
        el.setAttribute(attrName, attrVal.replace(/['"]/g, ""));
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  const updateLink = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  };

  updateMeta('meta[name="description"]', "content", seo.description);

  if (seo.noIndex) {
    updateMeta('meta[name="robots"]', "content", "noindex, nofollow");
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.remove();
  } else {
    updateMeta('meta[name="robots"]', "content", "index, follow");
    if (seo.canonicalUrl) {
      updateLink("canonical", seo.canonicalUrl);
    }
  }

  // Open Graph
  updateMeta('meta[property="og:type"]', "content", seo.ogType || "website");
  updateMeta('meta[property="og:url"]', "content", seo.canonicalUrl);
  updateMeta('meta[property="og:site_name"]', "content", "Kaung Khant Mg Mg Portfolio");
  updateMeta('meta[property="og:title"]', "content", seo.title);
  updateMeta('meta[property="og:description"]', "content", seo.description);
  updateMeta('meta[property="og:image"]', "content", seo.ogImage);

  // Twitter
  updateMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  updateMeta('meta[name="twitter:title"]', "content", seo.title);
  updateMeta('meta[name="twitter:description"]', "content", seo.description);
  updateMeta('meta[name="twitter:image"]', "content", seo.ogImage);

  // Project JSON-LD Schema
  let script = document.querySelector('script[data-project-schema="true"]') as HTMLScriptElement | null;
  if (seo.schemaJson) {
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-project-schema", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(seo.schemaJson);
  } else if (script) {
    script.remove();
  }
}
