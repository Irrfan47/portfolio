import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    status: "OK",
    title: "Web Developer",
    company: "Freelance",
    period: "Sep 2025 - Present",
    active: true,
    description: "Freelance developer building modern web solutions.",
    responsibilities: [
      "Designed and launched modern, responsive websites using React, TypeScript, and Tailwind CSS.",
      "Collaborated directly with clients to translate business goals into functional applications.",
      "Improved website load times by implementing optimized UI/UX components.",
    ],
  },
  {
    status: "OK",
    title: "Fullstack Developer & IT Support",
    company: "Nurkamal Network Sdn Bhd",
    period: "Mar 2025 - Sep 2025",
    active: false,
    description: "Internship focused on full-stack development and IT infrastructure management.",
    responsibilities: [
      "Built and deployed 5 full-stack web applications, improving workflow efficiency by 30%.",
      "Collaborated with cross-functional teams to optimize performance and deployment pipelines.",
      "Managed IT support and system configuration, reducing downtime by 25%.",
      "Performed QA testing and bug fixing to enhance system stability.",
      "Set up IT infrastructure including PCs, Access Points, Network Cabling, Servers, and Telephones.",
    ],
  },
  {
    status: "OK",
    title: "Logistic, Event & Sport Unit Officer",
    company: "AIU Myanmar Student Association (AMSA)",
    period: "Feb 2022 - Oct 2024",
    active: false,
    description: "Part-time role managing logistics and operations for student association events.",
    responsibilities: [
      "Managed logistics and on-site operations for association events.",
      "Coordinated planning, scheduling, and communication for student activities.",
      "Supported student engagement by organizing sports competitions and managing team participation.",
    ],
  },
];

const ExperienceSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
              System_Log
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* System Log Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel p-6 sm:p-8 relative"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-nothing-border">
            <span className="font-mono text-xs text-muted-foreground">
              /var/log/career.log
            </span>
            <span className="font-mono text-xs text-emerald-400">ACTIVE</span>
          </div>

          {/* Log Entries */}
          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="border border-nothing-border hover:border-nothing-red/50 transition-colors"
              >
                {/* Clickable Header */}
                <button
                  onClick={() => toggleExpand(index)}
                  className={`w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 font-mono text-sm text-left hoverable ${exp.active ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  <span className={exp.active ? "text-nothing-red" : "text-emerald-400"}>
                    [{exp.status}]
                  </span>
                  <span className="text-foreground">{exp.title}</span>
                  <span className="text-muted-foreground hidden sm:inline">—</span>
                  <span className="text-muted-foreground">{exp.company}</span>
                  <span className="text-nothing-border hidden sm:inline">|</span>
                  <span className="text-muted-foreground text-xs">({exp.period})</span>
                  {exp.active && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-nothing-red animate-pulse" />
                      <span className="text-nothing-red text-xs">CURRENT</span>
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 ml-auto text-muted-foreground transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-nothing-border/50">
                        <div className="pt-4 space-y-4">
                          <p className="font-mono text-xs text-muted-foreground">
                            {exp.description}
                          </p>
                          <div>
                            <span className="font-mono text-xs text-nothing-red mb-2 block">
                              &gt; RESPONSIBILITIES:
                            </span>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, respIndex) => (
                                <li
                                  key={respIndex}
                                  className="font-mono text-xs text-foreground flex items-start gap-2"
                                >
                                  <span className="text-nothing-border mt-0.5">—</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-nothing-border">
            <span className="font-mono text-xs text-muted-foreground">
              END OF LOG — {experiences.length} entries loaded — click to expand
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
