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

  const displayedProjects = projects.slice(0, visibleCount);

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

        {/* App Drawer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProjects.map((project, index) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % 3), duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 relative group cursor-pointer glitch-hover hoverable h-full overflow-hidden"
              >
                {/* X-Ray Background */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    src={project.screenshots[0]}
                    alt=""
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* App Icon */}
                  <div className="w-12 h-12 rounded-lg bg-muted border border-nothing-border flex items-center justify-center mb-4 group-hover:border-nothing-red transition-colors">
                    <span className="font-display text-lg text-foreground">
                      {project.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>

                  {/* App Info */}
                  <h3 className="font-mono text-sm text-foreground mb-1 group-hover:text-nothing-red transition-colors">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.version}
                    </span>
                    <span className="text-nothing-border">•</span>
                    <span className={`font-mono text-xs ${project.status === "ACTIVE" || project.status === "LIVE"
                      ? "text-nothing-red"
                      : project.status === "BETA" || project.status === "FYP"
                        ? "text-yellow-500"
                        : "text-emerald-400"
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>



                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 z-20">
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-nothing-border group-hover:border-nothing-red transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < projects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={handleLoadMore}
              className="group flex flex-col items-center gap-2"
            >
              <div className="px-6 py-3 bg-muted border border-nothing-border group-hover:border-nothing-red transition-all duration-300 flex items-center gap-2 hoverable">
                <span className="font-mono text-xs text-foreground group-hover:text-nothing-red transition-colors">
                  LOAD_MORE_PROJECTS()
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-nothing-red transition-colors group-hover:translate-y-1" />
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-nothing-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
