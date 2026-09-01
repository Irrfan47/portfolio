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
  const canonicalUrl = `${SITE_ORIGIN}/project/${project.id}`;

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
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": project.name,
    "description": project.description,
    "url": canonicalUrl,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": "Kaung Khant Mg Mg",
      "url": SITE_ORIGIN,
    },
    "keywords": project.techStack.join(", "),
  };

  if (project.liveUrl) {
    baseSchema["sameAs"] = project.liveUrl;
  }
  if (project.sourceCode) {
    baseSchema["codeRepository"] = project.sourceCode;
  }
  return {
    title,
    description,
    canonicalUrl,
    ogImage,
    schemaType,
    schemaJson: baseSchema,
  };
}

export interface PageSEO {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType?: string;
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
    canonicalUrl: `${SITE_ORIGIN}/404`,
    ogImage: `${SITE_ORIGIN}/og-preview.png`,
    ogType: "website"
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
  updateLink("canonical", seo.canonicalUrl);

  // Open Graph
  updateMeta('meta[property="og:type"]', "content", seo.ogType || "website");
  updateMeta('meta[property="og:url"]', "content", seo.canonicalUrl);
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
