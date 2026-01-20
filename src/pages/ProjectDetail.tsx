import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Terminal, Github, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projects } from "@/data/projects";
import StatusBar from "@/components/StatusBar";
import { useState, useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (project?.screenshots) {
      setImagesLoaded(false);
      const imagePromises = project.screenshots.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch(() => setImagesLoaded(true));
    }
  }, [project]);

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
                      : project.status === "BETA" || project.status === "FYP"
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
                <p className="text-foreground leading-relaxed">
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
              className="glass-panel p-6 sm:p-8"
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
                    {!imagesLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-20">
                        <div className="flex items-center gap-2 text-nothing-red font-mono text-sm">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>LOADING_ASSETS...</span>
                        </div>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={project.screenshots[currentImageIndex]}
                        alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full object-cover"
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
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default ProjectDetail;
