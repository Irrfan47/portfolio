import { build as viteBuild } from "vite";
import esbuild from "esbuild";
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST_DIR = resolve(__dirname, "dist");
const SERVER_DIR = resolve(__dirname, "dist-server");

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

// --- Main prerender logic using React SSR ---
async function main() {
  console.log("\n🔎 Starting SSG pre-render pass via React SSR...");

  if (!existsSync(DIST_DIR)) {
    console.error("❌ dist/ folder not found. Run `vite build` first.");
    process.exit(1);
  }

  const templateHtml = readFileSync(join(DIST_DIR, "index.html"), "utf-8");
  const projects = await loadProjects();
  const seoUtils = await loadSEOUtils();
  console.log(`  ✓ Loaded ${projects.length} projects dynamically from src/data/projects.ts`);

  // Build SSR bundle
  console.log("  → Compiling SSR server entry...");
  await viteBuild({
    build: {
      ssr: resolve(__dirname, "src/entry-server.tsx"),
      outDir: SERVER_DIR,
      minify: false,
      rollupOptions: {
        output: {
          format: "esm",
        },
      },
    },
    configFile: resolve(__dirname, "vite.config.ts"),
  });

  const serverEntryPath = join(SERVER_DIR, "entry-server.js");
  const { render } = await import(`file://${serverEntryPath.replace(/\\/g, "/")}`);
  console.log("  ✓ Loaded SSR entry successfully");

  // Build routes dynamically from projects.ts
  const ROUTES = [
    "/",
    "/404",
    ...projects.map((p) => `/project/${p.id}`),
  ];

  for (const route of ROUTES) {
    console.log(`  → Pre-rendering: ${route}`);
    let appHtml = "";
    try {
      appHtml = render(route);
    } catch (err) {
      console.error(`  ❌ Failed to render route ${route}:`, err);
    }

    let pageHtml = templateHtml;

    // Inject rendered React DOM into #root with hydration marker
    if (appHtml) {
      pageHtml = pageHtml.replace(
        /<div id="root"[^>]*>([\s\S]*?)<\/div>/i,
        `<div id="root" data-hydrated="true">${appHtml}</div>`
      );
    }

    // Route-specific SEO injection
    if (route === "/") {
      const homepageSeo = seoUtils.getHomepageSEO();
      pageHtml = injectProjectSEO(pageHtml, homepageSeo);
    } else if (route === "/404") {
      const notFoundSeo = seoUtils.getNotFoundSEO();
      pageHtml = injectProjectSEO(pageHtml, notFoundSeo);
    } else if (route.startsWith("/project/")) {
      const projectId = route.replace("/project/", "");
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        const seo = seoUtils.getProjectSEO(project);
        pageHtml = injectProjectSEO(pageHtml, seo);
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

    writeFileSync(outPath, pageHtml, "utf-8");
    console.log(`  ✓ Written: ${outPath} (${pageHtml.length.toLocaleString()} bytes)`);
  }

  // Cleanup temporary SSR build folder
  try {
    rmSync(SERVER_DIR, { recursive: true, force: true });
  } catch {}

  console.log("\n✅ SSG Pre-render complete! All pages written to dist/ with full React DOM & SEO.\n");
}

main().catch((err) => {
  console.error("\n❌ Pre-render failed:", err);
  process.exit(1);
});
