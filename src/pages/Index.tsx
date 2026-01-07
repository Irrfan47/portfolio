import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import StatusBar from "@/components/StatusBar";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(() => {
    return sessionStorage.getItem("system_booted") === "true";
  });

  useEffect(() => {
    if (bootComplete && window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [bootComplete]);

  return (
    <>
      <CustomCursor />

      {!bootComplete && (
        <BootSequence onComplete={() => {
          setBootComplete(true);
          sessionStorage.setItem("system_booted", "true");
        }} />
      )}

      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background relative"
        >
          {/* Scanlines Overlay */}
          <div className="fixed inset-0 pointer-events-none scanlines z-50" />

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
