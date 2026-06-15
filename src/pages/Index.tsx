import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import StatusBar from "@/components/StatusBar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const checkBootStatus = (): boolean => {
  const isBot = /bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot|facebookexternalhit|twitterbot/i.test(
    navigator.userAgent
  );
  if (isBot) return true;

  const booted = localStorage.getItem("portfolio_booted");
  const bootTime = localStorage.getItem("portfolio_boot_time");
  if (booted && bootTime) {
    const elapsed = Date.now() - parseInt(bootTime, 10);
    return elapsed < 24 * 60 * 60 * 1000; // 24 hours
  }
  return false;
};

const Index = () => {
  const [bootComplete, setBootComplete] = useState(checkBootStatus);
  const location = useLocation();

  useEffect(() => {
    if (bootComplete && location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [bootComplete, location.hash]);

  // Active Scroll Tracking Update
  useEffect(() => {
    if (!bootComplete) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update URL specific hash without adding to history stack (replace)
            // This ensures "Back" goes to this specific section view
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const sections = ["home", "about", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [bootComplete]);

  return (
    <>
      {!bootComplete && (
        <BootSequence onComplete={() => {
          setBootComplete(true);
          localStorage.setItem("portfolio_booted", "true");
          localStorage.setItem("portfolio_boot_time", Date.now().toString());
          document.getElementById("root")?.setAttribute("data-hydrated", "true");
        }} />
      )}

      {bootComplete && (
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

          <main className="relative z-10">
            <section id="home">
              <HeroSection />
            </section>
            <section id="about">
              <ExperienceSection />
              <EducationSection />
              <CertificatesSection />
            </section>
            <section id="projects">
              <ProjectsSection />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Index;
