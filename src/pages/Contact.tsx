import { Mail, Linkedin, Github, ExternalLink, CheckCircle, AlertCircle, Loader2, Send, Terminal } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import GlowCard from '../components/GlowCard';
import TerminalWindow from '../components/TerminalWindow';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: EMAILJS_CONFIG.TO_EMAIL,
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage('Error: Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      title: "Let's Connect",
      description: 'Connect with me professionally',
      icon: Linkedin,
      color: 'purple',
      href: 'https://www.linkedin.com/in/kaung-khant-mg-mg-26a98821a/',
      command: 'open linkedin'
    },
    {
      title: 'View Code',
      description: 'Explore my open-source work',
      icon: Github,
      color: 'cyan',
      href: 'https://github.com/Irrfan47',
      command: 'open github'
    },
  ];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          <span className="text-accent font-mono text-sm">~/contact</span>
          <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
        </div>
      </div>

      {/* Email Card */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <a href="mailto:kaungkhant12359@gmail.com">
          <GlowCard className="p-6" glowColor="pink">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-glow-pink" />
                  <span className="text-glow-pink font-mono text-xs">$ mail --compose</span>
                </div>
                <h3 className="text-foreground font-display font-semibold text-lg mb-1">
                  Email Me
                </h3>
                <p className="text-muted-foreground text-sm font-mono">
                  kaungkhant12359@gmail.com
                </p>
              </div>
              <div className="w-12 h-12 bg-glow-pink/10 rounded-lg flex items-center justify-center border border-glow-pink/30">
                <Mail className="w-6 h-6 text-glow-pink" />
              </div>
            </div>
          </GlowCard>
        </a>
      </div>

      {/* Social Links */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <p className="text-primary text-xs font-mono mb-4">// Social Links:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlowCard className="p-5 h-full" glowColor={link.color as any}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-muted-foreground font-mono text-xs">$ {link.command}</span>
                      <h3 className="text-foreground font-display font-semibold mt-1">
                        {link.title}
                      </h3>
                      <p className="text-muted-foreground text-xs font-mono">{link.description}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      link.color === 'purple' ? 'bg-secondary/10 border-secondary/30' : 'bg-primary/10 border-primary/30'
                    }`}>
                      <Icon className={`w-5 h-5 ${link.color === 'purple' ? 'text-secondary' : 'text-primary'}`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                    <ExternalLink className="w-3 h-3" />
                    <span>open in new tab</span>
                  </div>
                </GlowCard>
              </a>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <TerminalWindow title="send_message.sh">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-glow-green text-xs font-mono mb-2 block">
                <span className="text-muted-foreground">$</span> enter name:
              </label>
              <input
                type="text"
                placeholder="Your name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-cyan transition-all font-mono text-sm disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-glow-green text-xs font-mono mb-2 block">
                <span className="text-muted-foreground">$</span> enter email:
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-cyan transition-all font-mono text-sm disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-glow-green text-xs font-mono mb-2 block">
                <span className="text-muted-foreground">$</span> enter message:
              </label>
              <textarea
                placeholder="Type your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-cyan transition-all font-mono text-sm resize-none disabled:opacity-50"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 bg-glow-green/10 border border-glow-green/30 rounded-lg text-glow-green font-mono text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Message sent successfully! I'll respond soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-glow-pink/10 border border-glow-pink/30 rounded-lg text-glow-pink font-mono text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary/10 hover:bg-primary/20 disabled:bg-muted border border-primary/50 hover:border-primary disabled:border-border text-primary disabled:text-muted-foreground rounded-lg font-mono text-sm transition-all hover:shadow-neon-cyan flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  ./send_message
                </>
              )}
            </button>
          </form>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default Contact;
