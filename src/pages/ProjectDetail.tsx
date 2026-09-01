import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Terminal, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { getProjectSEO } from "@/utils/seo";
import StatusBar from "@/components/StatusBar";
import { useState, useEffect } from "react";

const updateMetaTag = (selector: string, attribute: string, value: string) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [attrName, attrVal] = selector.replace(/^meta\[|\]$/g, "").split("=");
    if (attrName && attrVal) {
      element.setAttribute(attrName, attrVal.replace(/['"]/g, ""));
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (project) {
      const seo = getProjectSEO(project);
      document.title = seo.title;
      updateMetaTag('meta[name="description"]', "content", seo.description);
      updateLinkTag("canonical", seo.canonicalUrl);

      // Open Graph
      updateMetaTag('meta[property="og:type"]', "content", "website");
      updateMetaTag('meta[property="og:url"]', "content", seo.canonicalUrl);
      updateMetaTag('meta[property="og:title"]', "content", seo.title);
      updateMetaTag('meta[property="og:description"]', "content", seo.description);
      updateMetaTag('meta[property="og:image"]', "content", seo.ogImage);

      // Twitter
      updateMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
      updateMetaTag('meta[name="twitter:title"]', "content", seo.title);
      updateMetaTag('meta[name="twitter:description"]', "content", seo.description);
      updateMetaTag('meta[name="twitter:image"]', "content", seo.ogImage);

      // JSON-LD
      let script = document.querySelector('script[data-project-schema="true"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-project-schema", "true");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seo.schemaJson);
    }
  }, [id, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">404</h1>
          <p className="font-mono text-muted-foreground mb-6">PROJECT_NOT_FOUND</p>
          <Link
            to="/"
            className="font-mono text-sm text-nothing-red hover:underline"
          >
            ← RETURN_TO_HOME
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background relative"
        onAnimationComplete={() => {
          document.getElementById("root")?.setAttribute("data-hydrated", "true");
        }}
      >


        {/* Dot Pattern Background */}
        <div className="fixed inset-0 pointer-events-none dot-pattern opacity-50" />

        <StatusBar />

        <main className="relative z-10 pt-20 pb-16">
          <div className="container px-4 sm:px-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-nothing-red transition-colors hoverable"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>cd ../projects</span>
              </Link>
            </motion.div>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 sm:p-8 mb-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-nothing-red" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                      App_Details
                    </span>
                    {project.company && (
                      <div className="flex items-center gap-2 ml-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 shadow-sm">
                        {project.company.logo && (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <img
                              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${project.company.logo}`}
                              alt={project.company.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <span className="font-mono text-xs text-foreground/90 font-medium">
                          {project.company.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <h1 className="font-custom text-2xl sm:text-4xl text-foreground tracking-wide">
                    {project.name}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-muted-foreground">
                    {project.version}
                  </span>
                  <span
                    className={`font-mono text-xs px-3 py-1 border ${project.status === "ACTIVE" || project.status === "LIVE"
                      ? "border-nothing-red text-nothing-red"
                      : project.status === "BETA" || project.status === "FYP" || project.status === "IN_DEV" || project.status === "DEV"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-emerald-400 text-emerald-400"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Terminal-style description */}
              <div className="glass-panel p-4 font-mono text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Terminal className="w-4 h-4" />
                  <span>cat README.md</span>
                </div>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </p>
              </div>

              <div className="flex gap-4">
                {project.sourceCode && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-nothing-border font-mono text-xs hover:border-nothing-red hover:text-nothing-red transition-all group hoverable"
                  >
                    <Github className="w-3 h-3 group-hover:animate-pulse" />
                    <span>VIEW_SOURCE_CODE()</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-nothing-border font-mono text-xs hover:border-nothing-red hover:text-nothing-red transition-all group hoverable"
                  >
                    <ExternalLink className="w-3 h-3 group-hover:animate-pulse" />
                    <span>VISIT_WEBSITE()</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 sm:p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-nothing-red" />
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  Tech_Stack
                </span>
              </div>
              <h2 className="font-custom text-xl sm:text-2xl text-foreground tracking-wide mb-6">
                DEPENDENCIES
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {project.techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="glass-panel p-3 text-center group hover:border-nothing-red transition-colors"
                  >
                    <span className="font-mono text-xs text-foreground group-hover:text-nothing-red transition-colors">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Screenshots Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel p-6 sm:p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-nothing-red" />
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  Screenshots
                </span>
              </div>
              <h2 className="font-custom text-xl sm:text-2xl text-foreground tracking-wide mb-6">
                PREVIEW
              </h2>

              {project.screenshots.length > 0 ? (
                <div className="relative group">
                  <div className="aspect-video bg-muted border border-nothing-border overflow-hidden relative rounded-lg">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${project.screenshots[currentImageIndex]}`}
                        alt={`${project.name} — project screenshot ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
                        style={{ opacity: 0, transition: "opacity 0.2s" }}
                        className="w-full h-full object-cover"
                        loading={currentImageIndex === 0 ? "eager" : "lazy"}
                      />
                    </AnimatePresence>

                    {/* Navigation Overlays */}
                    {project.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 border border-nothing-border hover:border-nothing-red text-foreground p-2 rounded-full transition-all hover:scale-110 z-10"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 border border-nothing-border hover:border-nothing-red text-foreground p-2 rounded-full transition-all hover:scale-110 z-10"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Page Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 border border-nothing-border px-4 py-1 rounded-full z-10">
                          <span className="font-mono text-xs text-foreground">
                            {currentImageIndex + 1} / {project.screenshots.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground font-mono text-sm border border-dashed border-nothing-border rounded-lg">
                  NO_PREVIEWS_AVAILABLE
                </div>
              )}
            </motion.div>

            {/* Related Projects Section */}
            {(() => {
              const relatedList = (project.relatedProjectIds || [])
                .map((relId) => projects.find((p) => p.id === relId))
                .filter((p): p is typeof project => !!p && p.id !== project.id)
                .slice(0, 3);

              if (relatedList.length === 0) return null;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-panel p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-nothing-red" />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                      Related_Modules
                    </span>
                  </div>
                  <h2 className="font-custom text-xl sm:text-2xl text-foreground tracking-wide mb-6">
                    RELATED PROJECTS
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedList.map((relProject) => (
                      <Link
                        key={relProject.id}
                        to={`/project/${relProject.id}`}
                        className="block group"
                      >
                        <div className="glass-panel p-4 h-full flex flex-col justify-between border border-nothing-border hover:border-nothing-red/50 transition-all duration-300">
                          <div className="aspect-video w-full bg-muted rounded overflow-hidden mb-3 border border-nothing-border/60">
                            <img
                              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${relProject.screenshots[0]}`}
                              alt={`${relProject.name} — project preview`}
                              width={300}
                              height={169}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-nothing-red transition-colors line-clamp-1 mb-1">
                              {relProject.name}
                            </h3>
                            <p className="font-mono text-xs text-muted-foreground line-clamp-2 mb-3">
                              {relProject.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-nothing-border/50 font-mono text-[10px] text-muted-foreground">
                            <span>{relProject.version}</span>
                            <span className="text-nothing-red group-hover:translate-x-0.5 transition-transform">
                              VIEW →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default ProjectDetail;
