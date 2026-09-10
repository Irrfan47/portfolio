import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="py-8 relative">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-nothing-red" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              Installed_Apps
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            PROJECTS
          </h2>
        </motion.div>

        {/* App Drawer Grid - One Card Per Row */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {projects.map((project, index) => {
            const isHidden = index >= visibleCount;

            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className={`w-full ${isHidden ? "hidden" : "block"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index % 3), duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="glass-panel p-3 sm:p-5 relative group cursor-pointer glitch-hover hoverable h-full flex flex-col md:flex-row gap-4 sm:gap-6 overflow-hidden border border-nothing-border hover:border-nothing-red/50 transition-all duration-300"
                >
                  {/* Left: Project Screenshot Container */}
                  <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0 aspect-video bg-muted rounded-md overflow-hidden relative border border-nothing-border/60">
                    <img
                      src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${project.screenshots[0]}`}
                      alt={`${project.name} Application Preview`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />

                    {/* Company Logo Badge (Top-Left Over Image) */}
                    {project.company && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-md bg-nothing-black/90 backdrop-blur-md border border-white/20 shadow-lg z-10 max-w-[85%] truncate">
                        {project.company.logo ? (
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${project.company.logo}`}
                              alt={project.company.name}
                              width={16}
                              height={16}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-nothing-red flex-shrink-0" />
                        )}
                        <span className="font-mono text-[10px] sm:text-xs text-foreground tracking-tight font-medium truncate">
                          {project.company.name}
                        </span>
                      </div>
                    )}

                    {/* Subtle Dark Gradient at bottom of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Right: Project Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title & Status */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-mono text-base sm:text-lg font-medium text-foreground group-hover:text-nothing-red transition-colors">
                          {project.name}
                        </h3>
                        <span
                          className={`font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded border border-nothing-border/60 ${
                            project.status === "ACTIVE" || project.status === "LIVE"
                              ? "text-nothing-red bg-nothing-red/10"
                              : project.status === "BETA" || project.status === "FYP" || project.status === "IN_DEV" || project.status === "DEV"
                                ? "text-yellow-500 bg-yellow-500/10"
                                : "text-emerald-400 bg-emerald-400/10"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-mono text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] sm:text-xs px-2 py-0.5 bg-muted/60 text-muted-foreground rounded border border-nothing-border/40"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="font-mono text-[10px] sm:text-xs px-1.5 py-0.5 text-muted-foreground/60">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer / Meta */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-nothing-border/50">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                          {project.version}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-nothing-red transition-colors">
                        <span>VIEW_PROJECT</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 z-20 pointer-events-none">
                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 sm:w-3 sm:h-3 border-t border-r border-nothing-border group-hover:border-nothing-red transition-colors" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < projects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mt-10 sm:mt-12 gap-2"
          >
            <button
              onClick={handleLoadMore}
              className="group flex flex-col items-center gap-2"
            >
              <div className="px-6 py-2.5 sm:py-3 bg-muted border border-nothing-border group-hover:border-nothing-red transition-all duration-300 flex items-center gap-2 hoverable shadow-sm">
                <span className="font-mono text-xs text-foreground group-hover:text-nothing-red transition-colors">
                  LOAD_MORE_PROJECTS ({Math.min(visibleCount, projects.length)}/{projects.length})
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-nothing-red transition-colors group-hover:translate-y-0.5" />
              </div>
              <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-nothing-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
