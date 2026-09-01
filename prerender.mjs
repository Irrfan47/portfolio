/**
 * prerender.mjs
 * Post-build SSG script: launches a local static server, visits each route
 * with headless Puppeteer, and saves the fully-rendered HTML back to /dist.
 *
 * Usage: node prerender.mjs  (called automatically by `npm run build`)
 */

import puppeteer from "puppeteer-core";
import esbuild from "esbuild";
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
const SITE_ORIGIN = "https://portfolio.xzett.me";

// --- Dynamic project loading from source using esbuild ---
async function loadProjects() {
  const result = await esbuild.build({
    entryPoints: [resolve(__dirname, "src/data/projects.ts")],
    bundle: false,
    format: "esm",
    write: false,
  });
  const code = result.outputFiles[0].text;
  const base64 = Buffer.from(code).toString("base64");
  const mod = await import(`data:text/javascript;base64,${base64}`);
  return mod.projects;
}

async function loadSEOUtils() {
  const result = await esbuild.build({
    entryPoints: [resolve(__dirname, "src/utils/seo.ts")],
    bundle: true,
    format: "esm",
    write: false,
    plugins: [
      {
        name: "alias",
        setup(build) {
          build.onResolve({ filter: /^@\// }, (args) => {
            return {
              path:
                resolve(__dirname, "src", args.path.replace(/^@\//, "")) +
                (args.path.endsWith(".ts") ? "" : ".ts"),
            };
          });
        },
      },
    ],
  });
  const code = result.outputFiles[0].text;
  const base64 = Buffer.from(code).toString("base64");
  const mod = await import(`data:text/javascript;base64,${base64}`);
  return mod;
}

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

/**
 * Injects project-specific SEO meta tags, title, and JSON-LD schema directly into HTML <head>.
 */
function injectProjectSEO(html, seo) {
  let modified = html;

  // Replace <title>
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // Replace meta name="description"
  if (modified.includes('name="description"')) {
    modified = modified.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(seo.description)}" />`);
  }

  // Replace link rel="canonical"
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
  }

  // Replace og:url
  if (modified.includes('property="og:url"')) {
    modified = modified.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${seo.canonicalUrl}" />`);
  }

  // Replace og:title
  if (modified.includes('property="og:title"')) {
    modified = modified.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(seo.title)}" />`);
  }

  // Replace og:description
  if (modified.includes('property="og:description"')) {
    modified = modified.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(seo.description)}" />`);
  }

  // Replace og:image
  if (modified.includes('property="og:image"')) {
    modified = modified.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${seo.ogImage}" />`);
  }

  // Replace twitter:title
  if (modified.includes('name="twitter:title"')) {
    modified = modified.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`);
  }

  // Replace twitter:description
  if (modified.includes('name="twitter:description"')) {
    modified = modified.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`);
  }

  // Replace twitter:image
  if (modified.includes('name="twitter:image"')) {
    modified = modified.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${seo.ogImage}" />`);
  }

  // Inject or ensure project JSON-LD schema is in <head>
  const schemaString = JSON.stringify(seo.schemaJson, null, 2);
  const schemaTag = `<script type="application/ld+json" data-project-schema="true">\n${schemaString}\n</script>`;

  if (!modified.includes('data-project-schema="true"')) {
    modified = modified.replace("</head>", `  ${schemaTag}\n</head>`);
  }

  return modified;
}

function escapeAttr(str) {
  return str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Main prerender logic ---
async function main() {
  console.log("\n🔎 Starting SSG pre-render pass...");

  if (!existsSync(DIST_DIR)) {
    console.error("❌ dist/ folder not found. Run `vite build` first.");
    process.exit(1);
  }

  const projects = await loadProjects();
  const { getProjectSEO } = await loadSEOUtils();
  console.log(`  ✓ Loaded ${projects.length} projects dynamically from src/data/projects.ts`);

  // Build routes dynamically from projects.ts
  const ROUTES = [
    "/",
    "/404",
    ...projects.map((p) => `/project/${p.id}`),
  ];

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

    // Set custom user-agent to bypass boot sequence and indicate bot crawler
    await page.setUserAgent(
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Silence noisy React/app console output during render
    page.on("console", () => {});
    page.on("pageerror", () => {});

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route === "/404" ? "/404" : route}`;
      console.log(`  → Rendering: ${route}`);

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });

      // Wait for React to mount and set data-hydrated="true"
      try {
        await page.waitForSelector('[data-hydrated="true"]', { timeout: 8000 });
      } catch {
        // Fallback short wait if the selector isn't found
        await new Promise((r) => setTimeout(r, 1000));
      }

      let html = await page.content();

      // If this is a project route, inject project-specific SEO into <head>
      if (route.startsWith("/project/")) {
        const projectId = route.replace("/project/", "");
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          const seo = getProjectSEO(project);
          html = injectProjectSEO(html, seo);
        }
      }

      // Determine output path
      const outPath =
        route === "/"
          ? join(DIST_DIR, "index.html")
          : join(DIST_DIR, route.replace(/^\//, ""), "index.html");

      // Create sub-directory for nested routes like /project/{id}/index.html
      const outDir = outPath.replace(/[/\\]index\.html$/, "");
      if (outDir !== DIST_DIR) mkdirSync(outDir, { recursive: true });

      writeFileSync(outPath, html, "utf-8");
      console.log(`  ✓ Written: ${outPath}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n✅ Pre-render complete! All pages written to dist/ with unique SEO.\n");
}

main().catch((err) => {
  console.error("\n❌ Pre-render failed:", err);
  process.exit(1);
});
