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
  if (schemaType === "SoftwareApplication" || schemaType === "WebApplication") {
    baseSchema["applicationCategory"] = "DeveloperApplication";
    baseSchema["operatingSystem"] = "Any";
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
