import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
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
          {projects.map((project, index) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 relative group cursor-pointer glitch-hover hoverable h-full"
              >
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

                {/* Hover Overlay */}
                <div className="absolute inset-0 glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 font-mono text-sm text-nothing-red">
                    <span>LAUNCH</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-nothing-border group-hover:border-nothing-red transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
