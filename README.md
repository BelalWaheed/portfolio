# Belal Waheed — Full-Stack Software Engineer Portfolio

A modern, high-performance, dark obsidian architectural portfolio built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Framer Motion**, and **Lenis**.

**[Live Portfolio](https://belalwaheed.pages.dev)** · **[Interactive Resume](https://belalwaheed.pages.dev/resume)** · **[GitHub Profile](https://github.com/BelalWaheed)** · **[LinkedIn](https://www.linkedin.com/in/belalwhaeed)**

---

## Architectural & Design Highlights

- **Dark Obsidian Aesthetic**: Deep obsidian canvas (`#09090b` / `#121215`), 1px precision architectural borders (`rgba(255, 255, 255, 0.08)`), and high-contrast accents in Emerald (`#10b981`), Amber (`#f59e0b`), and Cyan (`#06b6d4`).
- **Typography**: Paired *Geist* display headers with *Geist Mono* for architectural metadata and *Inter* for body copy.
- **Global Spotlight Command Menu (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven navigation across sections, production projects, instant email copying, and CV downloads.
- **Interactive Tech Stack Matrix**: Real-time project filtering by technology (*React*, *TypeScript*, *Node.js*, *MongoDB*, *ASP.Net MVC*) with smooth Framer Motion `layout` transitions.
- **Deep-Dive Case Study Modal**: System architecture breakdowns, key feature checklists, engineering challenges solved, 3x Retina captures, and video demo playback.
- **High-DPI 3x Captures & Hybrid Video**: Automated 3x high-resolution captures and 1080p demo video playback.
- **Zero-Friction Contact Engine**: 1-click clipboard copy, topic intent pills, and serverless Resend API integration.
- **Dual-Presentation Resume (`/resume`)**: Interactive dark digital layout, 1-click ATS plain-text export, and print-optimized `@media print` styles for clean 1-page PDF downloads.
- **60fps Motion Pipeline**: Lenis smooth scrolling synchronized with GSAP ScrollTrigger ticker, with automatic touch-fallback on mobile devices.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Styling & Design Tokens** | Tailwind CSS v4, CSS-first `@theme` variables |
| **Motion & Scroll** | GSAP 3.x, ScrollTrigger, Framer Motion, Lenis |
| **Icons** | Lucide React |
| **Routing** | React Router v7 |
| **Email & Backend** | Resend API, Cloudflare Pages Edge Functions, Vercel Serverless Functions |
| **Build & Tooling** | Vite 8, Rolldown / Babel React Compiler |
| **Deployment Targets** | Cloudflare Pages (Primary), Vercel |

---

## Project Structure

```
├── .agents/               # Agent rules and MCP configuration
├── api/                   # Vercel Serverless Function (api/contact.ts)
├── functions/             # Cloudflare Pages Edge Function (functions/api/contact.ts)
├── public/                # Static assets, 3x retina captures, video demo, _redirects
│   ├── projects/          # High-DPI 3x captures (Tivaq, Moviq, Loop, Obel)
│   ├── _redirects         # Cloudflare Pages SPA rewrite rule
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/        # Header (bi-directional scroll), Footer, Layout shell
│   │   ├── sections/      # Hero (3D tilt), About (pillars), Projects (bento), Skills, Contact
│   │   ├── seo/           # React 19 native document metadata & JSON-LD
│   │   └── ui/            # CommandMenu (Cmd+K), ProjectModal, CustomCursor, Button, Input
│   ├── data/              # Constants, project records, skills matrix, SEO config
│   ├── pages/             # HomePage, ResumePage
│   ├── types/             # Project, Skill, Experience TypeScript interfaces
│   ├── App.tsx            # Global providers, Lenis scroll engine, routing
│   ├── index.css          # Dark Obsidian tokens, glassmorphism utilities, print styles
│   └── main.tsx           # React DOM root entrypoint
├── scripts/               # Live 3x capture automation scripts
├── vercel.json            # Vercel SPA routing configuration
└── vite.config.ts         # Vite build configuration with manual vendor chunking
```

---

## Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/BelalWaheed/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local dev server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build & Linting

```bash
# Type check and build bundle
npm run build

# Run ESLint validation
npm run lint

# Preview production build locally
npm run preview
```

---

## Deployment

### Cloudflare Pages (Recommended)
1. In Cloudflare Dashboard, navigate to **Compute (Workers & Pages)** → **Create** → **Pages** → **Connect to Git**.
2. Select repository `BelalWaheed/portfolio` with production branch `main`.
3. Set **Framework preset**: `Vite`, **Build command**: `npm run build`, **Build output directory**: `dist`.
4. Add environment variable `RESEND_API_KEY` under **Environment Variables**.
5. Click **Save and Deploy**.

### Vercel
1. Import repository on [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**, Build command: `npm run build`, Output directory: `dist`.
3. Add `RESEND_API_KEY` in Project Settings → Environment Variables.
4. Deploy.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
