/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'glow-cyan': 'rgb(var(--glow-cyan) / <alpha-value>)',
        'glow-purple': 'rgb(var(--glow-purple) / <alpha-value>)',
        'glow-green': 'rgb(var(--glow-green) / <alpha-value>)',
        'glow-pink': 'rgb(var(--glow-pink) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scroll': 'scroll 20s linear infinite',
        'glitch': 'glitch 0.3s infinite',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 50%, rgb(var(--glow-pink)) 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px rgb(var(--glow-cyan) / 0.5), 0 0 20px rgb(var(--glow-cyan) / 0.3)',
        'neon-purple': '0 0 5px rgb(var(--glow-purple) / 0.5), 0 0 20px rgb(var(--glow-purple) / 0.3)',
        'neon-green': '0 0 5px rgb(var(--glow-green) / 0.5), 0 0 20px rgb(var(--glow-green) / 0.3)',
      },
    },
  },
  plugins: [],
};
