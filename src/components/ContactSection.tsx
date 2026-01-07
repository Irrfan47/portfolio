import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Error: All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Error: Invalid email format');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: EMAILJS_CONFIG.TO_EMAIL,
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage('Error: Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              Comm_Link
            </span>
          </div>
          <h2 className="font-custom text-3xl sm:text-4xl text-foreground tracking-wide mt-4">
            CONTACT
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CLI Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-nothing-border">
              <span className="font-mono text-xs text-nothing-red">$</span>
              <span className="font-mono text-xs text-muted-foreground">
                ./send_message.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">
                  --name=
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full terminal-input py-2 text-sm disabled:opacity-50"
                  placeholder="your_name"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">
                  --email=
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full terminal-input py-2 text-sm disabled:opacity-50"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">
                  --message=
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full terminal-input py-2 text-sm min-h-[120px] resize-none disabled:opacity-50"
                  placeholder="your_message_here"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 font-mono text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>[OK] Message transmitted successfully.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-nothing-red/10 border border-nothing-red/30 rounded text-nothing-red font-mono text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hw-button w-full flex items-center justify-center gap-3 group disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className={submitStatus === 'success' ? "text-emerald-400" : "text-foreground"}>
                  {isSubmitting ? "TRANSMITTING..." : submitStatus === 'success' ? "MESSAGE_SENT()" : "EXECUTE_SEND()"}
                </span>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-nothing-red" />
                ) : (
                  <Send className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${submitStatus === 'success' ? "text-emerald-400" : "text-nothing-red"
                    }`} />
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Connection Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="glass-panel p-6">
              <span className="font-mono text-xs text-muted-foreground block mb-4">
                // EXTERNAL_LINKS
              </span>

              <div className="space-y-4">
                <a
                  href="https://github.com/Irrfan47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-nothing-border hover:border-nothing-red transition-colors group hoverable"
                >
                  <Github className="w-6 h-6 text-foreground group-hover:text-nothing-red transition-colors" />
                  <div className="flex-1">
                    <span className="font-mono text-sm text-foreground block">
                      github.com/Irrfan47
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      Source repositories
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-nothing-red">
                    &gt;
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/kaung-khant-mg-mg-26a98821a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-nothing-border hover:border-nothing-red transition-colors group hoverable"
                >
                  <Linkedin className="w-6 h-6 text-foreground group-hover:text-nothing-red transition-colors" />
                  <div className="flex-1">
                    <span className="font-mono text-sm text-foreground block">
                      linkedin.com/in/kaung-khant...
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      Professional network
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-nothing-red">
                    &gt;
                  </span>
                </a>

                <a
                  href="mailto:kaungkhant12359@gmail.com"
                  className="flex items-center gap-4 p-4 border border-nothing-border hover:border-nothing-red transition-colors group hoverable"
                >
                  <Mail className="w-6 h-6 text-foreground group-hover:text-nothing-red transition-colors" />
                  <div className="flex-1">
                    <span className="font-mono text-sm text-foreground block">
                      kaungkhant12359@gmail.com
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      Direct transmission
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-nothing-red">
                    &gt;
                  </span>
                </a>
              </div>
            </div>

            {/* System Status */}
            <div className="glass-panel p-6">
              <span className="font-mono text-xs text-muted-foreground block mb-4">
                // SYSTEM_STATUS
              </span>
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">AVAILABILITY</span>
                  <span className="text-emerald-400">OPEN FOR WORK</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">RESPONSE_TIME</span>
                  <span className="text-foreground">&lt; 24h</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">TIMEZONE</span>
                  <span className="text-foreground">UTC+6:30</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
