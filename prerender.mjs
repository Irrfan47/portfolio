/**
 * prerender.mjs
 * Post-build SSG script: launches a local static server, visits each route
 * with headless Puppeteer, and saves the fully-rendered HTML back to /dist.
 *
 * Usage: node prerender.mjs  (called automatically by `npm run build`)
 */

import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { platform } from "node:os";

// --- Cross-platform Chrome/Chromium path detection ---
function findChrome() {
  const os = platform();

  if (os === "win32") {
    const windowsPaths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
    ];
    return windowsPaths.find(existsSync) ?? null;
  }

  if (os === "linux") {
    const linuxPaths = [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/snap/bin/chromium",
      "/usr/lib/chromium-browser/chromium-browser",
    ];
    return linuxPaths.find(existsSync) ?? null;
  }

  if (os === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  return null;
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST_DIR = resolve(__dirname, "dist");
const PORT = 5050;

// Routes to pre-render. Includes all project detail pages so Googlebot can index them.
const ROUTES = [
  "/",
  "/404",
  "/project/filmophia",
  "/project/padetha-rusk",
  "/project/budget-management-system",
  "/project/allocation-management-system",
  "/project/helpdesk-system",
  "/project/equipment-management-system",
  "/project/quotation-management-system",
  "/project/web-app-vulnerability-scanner",
  "/project/enterprise-management-system",
  "/project/personal-portfolio",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".pdf":  "application/pdf",
};

// --- Minimal SPA-aware static file server ---
function startServer() {
  return new Promise((res, rej) => {
    const server = createServer((req, httpRes) => {
      const urlPath = req.url.split("?")[0];
      let filePath = join(DIST_DIR, urlPath);

      // SPA fallback: if no real file found, serve index.html
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        filePath = join(DIST_DIR, "index.html");
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        httpRes.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
        httpRes.end(content);
      } catch {
        httpRes.writeHead(404);
        httpRes.end("Not found");
      }
    });

    server.listen(PORT, "127.0.0.1", () => {
      console.log(`  ✓ Static server ready at http://localhost:${PORT}`);
      res(server);
    });
    server.on("error", rej);
  });
}

// --- Main prerender logic ---
async function main() {
  console.log("\n🔎 Starting SSG pre-render pass...");

  if (!existsSync(DIST_DIR)) {
    console.error("❌ dist/ folder not found. Run `vite build` first.");
    process.exit(1);
  }

  const server = await startServer();

  const chromePath = findChrome();
  if (chromePath) {
    console.log(`  ✓ Using system Chrome: ${chromePath}`);
  } else {
    console.warn(
      "\n⚠️  No system Chrome/Chromium found. Skipping pre-render.\n" +
      "   Install Chrome on the server: sudo apt-get install -y google-chrome-stable\n" +
      "   The site will still work but pages won't be pre-rendered for SEO.\n"
    );
    server.close();
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();

    // Silence noisy React/app console output during render
    page.on("console", () => {});
    page.on("pageerror", () => {});

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route === "/404" ? "/404" : route}`;
      console.log(`  → Rendering: ${route}`);

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });

      // Wait for React to hydrate instead of arbitrary 5s delay
      try {
        await page.waitForSelector('[data-hydrated="true"]', { timeout: 15000 });
      } catch {
        // Fallback: wait 3s if the selector isn't found (e.g., 404 page)
        await new Promise((r) => setTimeout(r, 3_000));
      }

      const html = await page.content();

      // Determine output path
      const outPath =
        route === "/"
          ? join(DIST_DIR, "index.html")
          : join(DIST_DIR, route.replace(/^\//, ""), "index.html");

      // Create sub-directory for nested routes like /404/index.html
      const outDir = outPath.replace(/[/\\]index\.html$/, "");
      if (outDir !== DIST_DIR) mkdirSync(outDir, { recursive: true });

      writeFileSync(outPath, html, "utf-8");
      console.log(`  ✓ Written: ${outPath}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n✅ Pre-render complete! Googlebot can now read real HTML.\n");
}

main().catch((err) => {
  console.error("\n❌ Pre-render failed:", err);
  process.exit(1);
});
