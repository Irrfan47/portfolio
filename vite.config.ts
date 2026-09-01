import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Gzip compression for Core Web Vitals
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    // Brotli compression (preferred by modern browsers)
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("framer-motion")) return "animation";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("node_modules/react")) return "react-vendor";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}));
