import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    name: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Nov 21, 2025",
    credentialId: "CREDLY-IBM",
    status: "VALID",
    link: "https://www.credly.com/badges/63c5f77b-830b-41e6-9688-796cdb68fea8/public_url",
  },
  {
    name: "5G Pioneers Program",
    issuer: "ERICSSON",
    date: "Mar 22, 2024",
    credentialId: "CREDLY-ERICSSON",
    status: "VALID",
    link: "https://www.credly.com/badges/f060939f-4610-43a7-9088-a14118231d80/public_url",
  },
];

const CertificatesSection = () => {
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
              Verified_Credentials
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            CERTIFICATES
          </h2>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="glass-panel p-5 relative group hover:border-nothing-red/50 transition-colors hoverable h-full"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-muted border border-nothing-border flex items-center justify-center mb-4 group-hover:border-nothing-red transition-colors">
                  <Award className="w-5 h-5 text-foreground group-hover:text-nothing-red transition-colors" />
                </div>

                {/* Certificate Info */}
                <h3 className="font-mono text-xs text-foreground mb-1 group-hover:text-nothing-red transition-colors leading-tight">
                  {cert.name}
                </h3>
                <p className="font-mono text-[10px] text-muted-foreground mb-3">
                  {cert.issuer}
                </p>

                {/* Details */}
                <div className="space-y-1.5 pt-3 border-t border-nothing-border">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-muted-foreground">ISSUED:</span>
                    <span className="text-foreground">{cert.date}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-muted-foreground">STATUS:</span>
                    <span className="text-emerald-400">{cert.status}</span>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground truncate">
                    ID: {cert.credentialId}
                  </div>
                </div>

                {/* View Link */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-nothing-red" />
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
