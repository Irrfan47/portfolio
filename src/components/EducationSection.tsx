import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, ExternalLink, Loader2 } from "lucide-react";

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
  const [showGradPhoto, setShowGradPhoto] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const gradPhotoUrl = "https://myprojectstorage47.blob.core.windows.net/portfoliodocs/graduate_photo.JPG";

  const preloadImage = () => {
    const img = new Image();
    img.src = gradPhotoUrl;
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
              Academic_Records
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            EDUCATION
          </h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu, index) => {
            const isInteractive = edu.degree === "Bachelor of Computer Science";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                onClick={() => {
                  if (isInteractive) {
                    setShowGradPhoto(true);
                    setIsImageLoading(true); // Reset loading state when opening modal
                  }
                }}
                onMouseEnter={() => isInteractive && preloadImage()}
                className={`glass-panel p-6 relative group transition-colors ${isInteractive ? "cursor-pointer hover:border-nothing-red" : "hover:border-nothing-red/50"
                  }`}
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

                {/* View Photo Indicator */}
                {isInteractive && (
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 font-mono text-xs text-nothing-red bg-muted/50 px-2 py-1 rounded border border-nothing-red/30">
                      <span>VIEW_PHOTO</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Graduation Photo Modal */}
      <AnimatePresence>
        {showGradPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowGradPhoto(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] glass-panel p-2 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-nothing-border gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nothing-red animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                    IMG_GRADUATION_2025.JPG
                  </span>
                </div>
                <button
                  onClick={() => setShowGradPhoto(false)}
                  className="p-2 hover:bg-muted text-foreground hover:text-nothing-red rounded transition-colors group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Image Container */}
              <div className="flex-1 overflow-hidden bg-black/20 relative flex items-center justify-center p-4 min-h-[400px]">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-nothing-red animate-spin" />
                      <span className="font-mono text-xs text-muted-foreground">LOADING_ASSET...</span>
                    </div>
                  </div>
                )}
                <img
                  src={gradPhotoUrl}
                  alt="Bachelor of Computer Science Graduation"
                  className={`max-w-full max-h-[70vh] object-contain rounded-sm transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setIsImageLoading(false)}
                />

                {/* Decorative Elements */}
                <div className="absolute bottom-4 right-4 font-mono text-xs text-muted-foreground/50">
                  ALBUKHARY_INTL_UNI
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default EducationSection;
