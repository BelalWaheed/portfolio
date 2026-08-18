---
title: Portfolio Overview & Product Vision
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
tags:
  - architecture
  - portfolio
  - overview
  - design-system
---

# Belal Waheed — Developer Portfolio Overview

## 1. Product Vision
The goal of this project is to create an inspiring, high-craft, buttery-smooth personal portfolio for **Belal Waheed (Full-Stack Software Engineer)** that feels state-of-the-art and completely avoids generic AI clichés (purple neon gradients, textureless surfaces, emoji clutter).

```mermaid
mindmap
  root((Belal Waheed Portfolio))
    Design System
      Dark Obsidian Palette
      Geist & Geist Mono Typography
      1px Architectural Borders
      Glassmorphism Surfaces
    Interactive Experience
      Global Cmd+K Spotlight
      Coordinated Tech Filter Matrix
      Dedicated /project/:slug Case Studies
      Quick-Preview Modal
      3D Tilt Parallax & Ambient Lights
    Performance & Motion
      60fps Smooth Scroll
      GSAP ScrollTrigger
      Framer Motion Layout Animations
      Automatic Scroll-to-Top
      Manual Vendor Chunking
    Backend & Deployment
      Cloudflare Workers Static Assets
      Resend Email API
      1-Click Copy Fallback
      is-a-dev Custom Domain
```

---

## 2. Core Pillars & Design Aesthetics

| Pillar | Implementation | Rationale |
| :--- | :--- | :--- |
| **Dark Obsidian Palette** | `#09090b` canvas, `#121215` surfaces, Emerald (`#10b981`), Amber (`#f59e0b`), Cyan (`#06b6d4`) | Provides high contrast (WCAG AAA compliant), professional architectural depth, and zero neon clichés. |
| **Dedicated Case Study Routes** | Dynamic `/project/:slug` routes with tabbed engineering deep-dives | Allows recruiters and engineers to bookmark and share specific project case studies with full architectural diagrams and benchmarks. |
| **Ergonomic Typography** | *Geist* display headings + *Geist Mono* metadata + *Inter* body copy | Maximizes technical readability and establishes clear information hierarchy. |
| **Zero-Friction Access** | Global `Cmd+K` / `Ctrl+K` Spotlight + 1-Click Clipboard Copy | Allows recruiters and engineering leaders to find projects, download resumes, or copy contact info in 1 keystroke. |
| **Dual-Presentation Resume** | Interactive digital CV + `@media print` black-and-white 1-page PDF export | Solves both digital browsing and physical/PDF ATS export needs seamlessly. |

---

## 3. Technology Stack Matrix

- **Frontend**: React 19, TypeScript, Vite 8, Rolldown / Babel React Compiler
- **Styling**: Tailwind CSS v4 (`@theme` tokens in `src/index.css`)
- **Animation & Scrolling**: GSAP 3.x, ScrollTrigger, Framer Motion, Lenis
- **Icons**: Lucide React (vector SVG only, zero emojis)
- **Routing**: React Router v7 with SPA routing and ScrollToTop restoration
- **Serverless & Edge**: Cloudflare Workers (`src/worker.ts`), Vercel Serverless Function (`api/contact.ts`), Resend Email API
- **Deployment**: Cloudflare Workers with Static Assets, Cloudflare Pages, Vercel
