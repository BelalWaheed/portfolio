---
title: "ADR 0004: Dedicated Deep-Dive Project Case Study Routes (/project/:slug)"
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
status: accepted
tags:
  - adr
  - routing
  - spa
  - case-study
  - architecture
---

# ADR 0004: Dedicated Deep-Dive Project Case Study Routes (`/project/:slug`)

## Status
**Accepted**

## Context & Problem Statement
Previously, projects were accessible solely via a popup dialog modal (`ProjectModal.tsx`) on the home page. This created several critical limitations:
1. **Lack of Direct Deep-Linking**: Recruiters, clients, and engineering leads could not bookmark or share direct links to specific projects (e.g. `https://belalwaheed.pages.dev/project/loop`).
2. **SEO & Social Sharing Degradation**: Search engines and preview bots could not index dedicated project metadata, case study diagrams, or media assets.
3. **Screen Real Estate Constraints**: Complex layered architecture diagrams, performance benchmark tables, and detailed engineering challenge breakdowns could not be comfortably presented in a modal window.

## Considered Options
1. **Option 1: Modal-Only with Query Param Hash (`/?project=tivaq`)**: Keeps all code in the index page, but lacks dedicated page hierarchy and SEO indexing.
2. **Option 2: Multi-Page Static HTML Generation (`/project-tivaq.html`)**: Requires multi-entrypoint build configuration and duplicate navigation headers.
3. **Option 3: Single-Page Application (SPA) Dynamic Routing (`/project/:slug`)**: Uses React Router v7 with Cloudflare Pages `"not_found_handling": "single-page-application"`, instant `ScrollToTop` restoration, and tabbed engineering deep-dives.

## Decision & Rationale
We chose **Option 3: SPA Dynamic Routing (`/project/:slug`)**.
- **Shareability**: Every project now has a clean, memorable URL (`/project/tivaq`, `/project/moviq`, `/project/loop`, `/project/obel`, `/project/cema`).
- **Deep Technical Presentation**: Provides dedicated tabs for System Architecture, Challenges & Solutions, Tech Stack Matrix, and Performance Metrics.
- **Cross-System Accessibility**: Seamlessly linked from the Bento grid cards, quick-preview modal, and `Cmd+K` spotlight command palette.
- **Edge Deployment Compatibility**: Handled seamlessly by Cloudflare Static Assets SPA routing.

## Consequences
- **Positive**: Exceptional technical showcase capability, shareable links for recruiters, and full 60fps Framer Motion tab transitions.
- **Verification**: Verified zero 404s via Cloudflare SPA rewrite rules and comprehensive TypeScript type safety.
