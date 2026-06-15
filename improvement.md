This is a solid foundation — well above average for a CS graduate — but several things prevent it from reading as senior-level work. I'll be direct about each.

---

## 1. FRONTEND ARCHITECTURE & REACT/TYPESCRIPT

### Critical Issues

**A. Type Safety Is Disabled Everywhere**

`tsconfig.json` and `tsconfig.app.json` both have:
```json
"strict": false,
"noImplicitAny": false,
"noUnusedLocals": false,
"strictNullChecks": false
```

This signals to any engineer reviewing your code that you're avoiding the compiler. A senior engineer enables strict mode and fixes the errors. Fix this first. The whole type system is theater if these are off.

**B. `gemini.ts` Leaks an API Key Path and Has No Retry Logic**

```typescript
// src/components/chatbot/gemini.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
```

`VITE_` prefixed variables are bundled into the client. Anyone can open DevTools and read your key. This is a real security issue, not a nitpick.

**Fix: Proxy through a serverless function.** On Azure, use an Azure Function or a simple proxy endpoint. Never call third-party AI APIs directly from the browser with an API key.

```typescript
// api/gemini/route.ts (Azure Function or similar)
export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await fetch("https://generativelanguage.googleapis.com/...", {
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY }, // server-side only
    body: JSON.stringify({ contents: messages }),
    method: "POST",
  });
  return Response.json(await response.json());
}
```

```typescript
// src/components/chatbot/gemini.ts — client side
export const getGeminiResponse = async (userMessage: string, chatHistory: ...) => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: chatHistory, userMessage }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.text;
};
```

**C. EmailJS Config in Version Control**

```typescript
// src/config/emailjs.ts
PUBLIC_KEY: 'kxqr77ix3Ut8iTI3v',
SERVICE_ID: 'service_tld2uff',
```

These are committed to your repo. Rotate them now, then move them to environment variables.

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL,
};
```

**D. `Chatbot.tsx` Rebuilds Chat History on Every Message — O(n²) Work**

```typescript
// Current — runs filter+map over entire message array on every send
const history = [...messages, userMessage]
  .filter((m, idx) => !(idx === 0 && m.sender === "bot"))
  .map(m => ({
    role: m.sender === "user" ? "user" as const : "model" as const,
    parts: [{ text: m.text }]
  }));
```

This rebuilds the full history array on every keystroke send. As conversations get long, this is expensive and the filter logic is fragile (index 0 assumption breaks if you add a second initial bot message).

**Fix:**

```typescript
// Store history in a ref, not derived from messages
const chatHistoryRef = useRef<{role: "user" | "model", parts: {text: string}[]}[]>([]);

const handleSendMessage = async () => {
  // ...
  chatHistoryRef.current = [
    ...chatHistoryRef.current,
    { role: "user", parts: [{ text: userText }] },
  ];
  const aiResponse = await getGeminiResponse(userText, chatHistoryRef.current);
  chatHistoryRef.current = [
    ...chatHistoryRef.current,
    { role: "model", parts: [{ text: aiResponse }] },
  ];
  // ...
};
```

**E. `ProjectDetail.tsx` Preloads All Images Before Showing Any Content**

```typescript
// Blocks render until ALL screenshots are loaded
Promise.all(imagePromises)
  .then(() => setImagesLoaded(true))
```

This is an antipattern. Users see a blank loading state while every image loads in parallel. For a portfolio, the first image should appear immediately.

**Fix: Per-image loading state, not all-or-nothing.**

```tsx
// In the carousel, each image handles its own loading
<motion.img
  key={currentImageIndex}
  src={project.screenshots[currentImageIndex]}
  alt={`${project.name} screenshot ${currentImageIndex + 1}`}
  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
  style={{ opacity: 0, transition: "opacity 0.2s" }}
  className="w-full h-full object-cover"
/>
```

Remove the `useEffect` that blocks on `Promise.all` entirely. Add `loading="lazy"` to non-visible images.

**F. `StatusBar.tsx` Leaks a Window History Side Effect**

```typescript
useEffect(() => {
  if (activeSection) {
    window.history.replaceState(null, "", `#${activeSection}`);
  }
}, [activeSection]);
```

This fires on the `ProjectDetail` page too because `StatusBar` is rendered there. You're rewriting the URL on a page where sections don't exist. Check that `StatusBar` only does this on the index route, or remove this effect from `StatusBar` entirely and handle it only in `Index.tsx`.

---

## 2. PERFORMANCE & OPTIMIZATION

**A. Your Marquee Is Duplicated 4× for No Reason**

```typescript
const techStack = [...skills, ...skills, ...skills, ...skills]; // Duplicate for seamless marquee
```

The animation uses `translateX(-50%)` on a doubled array. Quadrupling it wastes DOM nodes. Double is enough, matching the CSS. Remove two copies.

**B. No `<link rel="preload">` for Critical Font**

You load two Google Font families in `index.html` synchronously. Your custom font (`/fonts/custom.otf`) has no preload hint at all. Add:

```html
<link rel="preload" href="/fonts/custom.otf" as="font" type="font/otf" crossorigin>
```

**C. Vite Chunk Splitting Is Incorrect**

```typescript
manualChunks: {
  vendor: ["react", "react-dom", "react-router-dom"],
  ui: ["@radix-ui/react-slot", "lucide-react", "framer-motion"],
}
```

You're putting `framer-motion` (~110kB gzipped) in the same chunk as icon utilities. Split it so the animation library only loads when needed, or lazy-load heavy page components:

```typescript
manualChunks: (id) => {
  if (id.includes("framer-motion")) return "animation";
  if (id.includes("@radix-ui")) return "radix";
  if (id.includes("node_modules/react")) return "react-vendor";
  if (id.includes("recharts") || id.includes("d3-")) return "charts";
},
```

Also lazy-load `ProjectDetail`:

```typescript
// src/App.tsx
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
// wrap in <Suspense fallback={<div />}>
```

**D. The Prerender Script Has a 5-Second Hardcoded Wait**

```javascript
// prerender.mjs
await new Promise((r) => setTimeout(r, 5_000));
```

This is 5 seconds × 11 routes = 55 seconds minimum build time. Replace with a proper content-ready check:

```javascript
await page.waitForSelector('[data-hydrated="true"]', { timeout: 15000 });
```

Then add `data-hydrated="true"` to your root div after the boot sequence completes.

---

## 3. UI/UX & INTERACTIONS

**A. The Chatbot Is a Distraction, Not a Feature**

The current chatbot with a Gemini integration that has no rate limit handling, leaks an API key, and can respond out of scope is a liability on a portfolio. Either:

1. Remove it and replace with a simple contact card
2. Or properly gate it: add rate limiting on your proxy, scope it tightly with a system prompt that cannot be overridden (yours currently can be bypassed by asking it to "ignore previous instructions"), and add a visible "powered by Gemini" attribution

**B. Custom Cursor Breaks on Touch Devices**

```typescript
const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (!isFinePointer) return;
```

This check is correct but happens only on mount. If a user switches from mouse to touch (convertible laptops), the cursor element stays in the DOM. It's also entirely missing from `ProjectDetail` because `CustomCursor` is in `App.tsx` but rendered outside the routes — this is fine. The real issue is the cursor div stays in the DOM on resize. Minor, but clean it up:

```typescript
useEffect(() => {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  const handler = (e: MediaQueryListEvent) => {
    if (!e.matches) setIsVisible(false);
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}, []);
```

**C. Boot Sequence Runs on Every Hard Refresh**

```typescript
const [bootComplete, setBootComplete] = useState(() => {
  return isBot || sessionStorage.getItem("system_booted") === "true";
});
```

`sessionStorage` resets on every new tab open. Users who open your portfolio link in a new tab from a phone will see the full boot sequence every time. Use `localStorage` instead, with an expiry:

```typescript
const checkBootStatus = () => {
  const booted = localStorage.getItem("portfolio_booted");
  const bootTime = localStorage.getItem("portfolio_boot_time");
  if (booted && bootTime) {
    const elapsed = Date.now() - parseInt(bootTime);
    return elapsed < 24 * 60 * 60 * 1000; // 24 hours
  }
  return false;
};
```

---

## 4. CONTENT: WHAT SIGNALS "JUNIOR" AND WHAT TO CHANGE

**A. Remove These Immediately**

- `COFFEE_CONSUMED: ∞` — This is in every junior portfolio. Remove it.
- `YEARS_ACTIVE: 3+` and `PROJECTS_COMPLETED: 9+` in the hero — these are weak proxies for skill. Replace with actual impact metrics.
- The boot sequence "WELCOME TO MY PORTFOLIO" line — change to your domain or tagline.
- The status indicator showing "OPEN FOR WORK" is fine, but `RESPONSE_TIME: < 24h` is unnecessary and the `TIMEZONE: UTC+6:30` is an odd thing to advertise in a contact section.

**B. Rewrite the About Text**

**Current:**
> "I'm a full-stack web developer based in Yangon, Myanmar with a Computer Science degree and 3+ years of professional experience. I bridge the gap between design and engineering — building products that are not just functional, but genuinely delightful to use."

This is generic. Every graduate says they bridge design and engineering.

**Replacement:**
> "Full-stack developer with production experience shipping features used by government allocation systems, enterprise helpdesks, and consumer-facing web apps. I've worked across the stack — React/TypeScript frontends, PHP/Node backends, and MySQL schemas — with a focus on systems that handle real organizational complexity: role-based access, multi-step workflows, and audit trails. Currently building and deploying on Azure."

**C. Rewrite Project Descriptions to Lead With Complexity**

**Current (Budget Management System):**
> "A comprehensive web application for managing budgets, programs, and users."

**Replacement:**
> "Multi-role financial workflow system managing program lifecycle from draft to approval. Implemented RBAC with four distinct permission levels, optimistic UI updates for concurrent budget edits, and PDF report generation with real-time audit logging. Reduced cross-team approval cycles by enforcing state machine transitions at the API layer."

Do this for every project. The pattern is: what was technically hard, how did you solve it, what was the measurable outcome.

**D. The "COFFEE_CONSUMED: ∞" Needs to Be Replaced With a Real Metric**

Replace the three stats block with:

```tsx
<div className="font-mono text-xs">
  <span className="text-muted-foreground">SYSTEMS_IN_PRODUCTION:</span>{" "}
  <span className="text-foreground">4</span>
</div>
<div className="font-mono text-xs">
  <span className="text-muted-foreground">LIGHTHOUSE_SCORE:</span>{" "}
  <span className="text-foreground">98/100</span>
</div>
<div className="font-mono text-xs">
  <span className="text-muted-foreground">LARGEST_USERBASE:</span>{" "}
  <span className="text-foreground">500+ concurrent</span>
</div>
```

Use your actual Lighthouse score — run it and put the real number.

---

## 5. WHAT TOP-1% PORTFOLIOS HAVE THAT YOURS IS MISSING

**A. A Case Study Page, Not Just a Screenshot Carousel**

Every project currently shows: description → tech stack → screenshots. Senior engineers write about decisions. Add a `/project/:id` subsection with:

```
Problem → Constraints → Architecture Decision → What I Would Do Differently
```

The `fullDescription` field in `projects.ts` has the right intent but it reads like a product brief, not an engineering post-mortem.

**B. Observable Performance Metrics**

There is no Lighthouse score, no Core Web Vitals reference, no bundle size mentioned anywhere. A senior engineer who builds a portfolio site knows their own performance numbers. Put them in the footer or the hero: "98 Lighthouse Performance · 12kB first-paint bundle."

**C. The Source Code Links Go to GitHub Repos With No READMEs**

Any recruiter clicking `VIEW_SOURCE_CODE()` on your Enterprise Management System hits a repo. That repo needs: architecture diagram, setup instructions, environment variable documentation, and a screenshot. Right now those repos are black boxes. Fix the READMEs before you hand this portfolio to anyone.

**D. No OpenGraph Image**

```html
<meta property="og:image" content="https://portfolio.xz3tt.dev/og-preview.png" />
```

The file `og-preview.png` doesn't appear to exist in the public folder. When anyone shares your URL on LinkedIn or in a Slack message, the embed shows nothing. Create it: 1200×630px, your name and title, dark background matching the site.

**E. No Error Boundary**

If the Gemini API fails, if a project image 404s, if an async import fails — there is no error boundary anywhere in this codebase. Add one at the app level:

```tsx
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio error:", error, info);
    // Send to your logging service here
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center font-mono text-foreground">
          <div className="text-center">
            <p className="text-nothing-red mb-2">SYSTEM_ERROR</p>
            <button onClick={() => this.setState({ hasError: false })}>
              RELOAD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

Wrap your router in it in `App.tsx`.

---

## PRIORITY ORDER

Fix in this sequence — security issues block everything else:

1. Rotate and externalize the EmailJS keys and Gemini key immediately
2. Move Gemini calls to a server-side proxy
3. Enable TypeScript strict mode and fix the resulting errors
4. Fix the `og-preview.png` so links share correctly
5. Rewrite project descriptions with the pattern above
6. Remove "COFFEE_CONSUMED: ∞" and replace the three stats with real metrics
7. Fix READMEs on linked GitHub repos
8. Add ErrorBoundary
9. Fix the Vite chunk splitting
10. Write one real case study for your most complex project (the allocation system or the enterprise management system)

The aesthetic is genuinely distinctive and the technical breadth is there. The gaps are mostly in how you present complexity and in the security/correctness issues that an engineer reviewing your code will catch in under five minutes.