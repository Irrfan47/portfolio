import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Albukhary International University",
    period: "2022 - 2025",
    status: "COMPLETED",
    gpa: "3.69/4.0",
    focus: "Software Engineering, Web Technologies & Cyber Security",
  },
  {
    degree: "High School Diploma",
    institution: "B.E.H.S (4) Mingalar Taung Nyunt, Yangon, Myanmar",
    period: "2009 - 2020",
    status: "COMPLETED",
    gpa: "N/A",
    focus: "Science & Mathematics",
  },
];

const EducationSection = () => {
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
              Academic_Records
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            EDUCATION
          </h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="glass-panel p-6 relative group hover:border-nothing-red/50 transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-muted border border-nothing-border flex items-center justify-center mb-4 group-hover:border-nothing-red transition-colors">
                <GraduationCap className="w-6 h-6 text-foreground" />
              </div>

              {/* Degree Info */}
              <h3 className="font-mono text-sm text-foreground mb-1 group-hover:text-nothing-red transition-colors">
                {edu.degree}
              </h3>
              <p className="font-mono text-xs text-muted-foreground mb-3">
                {edu.institution}
              </p>

              {/* Details */}
              <div className="space-y-2 pt-3 border-t border-nothing-border">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">PERIOD:</span>
                  <span className="text-foreground">{edu.period}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">STATUS:</span>
                  <span className="text-emerald-400">{edu.status}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">GPA:</span>
                  <span className="text-foreground">{edu.gpa}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-muted-foreground">FOCUS:</span>
                  <span className="text-foreground">{edu.focus}</span>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-nothing-border group-hover:border-nothing-red transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
