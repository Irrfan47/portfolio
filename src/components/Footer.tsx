import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 border-t border-nothing-border"
    >
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg tracking-system">XZ3TT.DEV</span>
            <span className="font-mono text-xs text-muted-foreground">
              v2.0.0
            </span>
          </div>

          <div className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            <p>© {currentYear} KAUNG KHANT MG MG. ALL RIGHTS RESERVED.</p>
            <p className="mt-1">DESIGNED WITH NOTHING OS AESTHETICS</p>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-8 barcode" />
      </div>
    </motion.footer>
  );
};

export default Footer;
