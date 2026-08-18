---
title: "ADR 0001: Adoption of Dark Obsidian Architectural Design System"
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
status: accepted
tags:
  - adr
  - design-system
  - ui-ux
---

# ADR 0001: Adoption of Dark Obsidian Architectural Design System

## Status
**Accepted**

## Context & Problem Statement
The previous portfolio suffered from common design pitfalls: generic dark slate surfaces, cluttered icons/emojis, uncalibrated contrast, and lack of visual depth. We needed an authoritative visual identity for a Full-Stack Software Engineer that signals engineering rigor, precision, and modern UI craft.

## Considered Options
1. **Option 1: Standard AI SaaS Dark Mode**: Neon violet/purple gradients, generic glass cards, heavy emoji usage.
2. **Option 2: Minimalist White Theme**: Strict black-and-white brutalist aesthetic.
3. **Option 3: Dark Obsidian with Architectural Accents**: Deep obsidian black canvas (`#09090b`), 1px precision borders (`rgba(255, 255, 255, 0.08)`), multi-layered backdrop blurs, curated OKLCH/HSL accents (Emerald `#10b981`, Amber `#f59e0b`, Cyan `#06b6d4`), and paired *Geist* / *Geist Mono* typography.

## Decision & Rationale
We chose **Option 3: Dark Obsidian with Architectural Accents**.
- **WCAG AA / AAA Compliance**: Text contrast exceeds 6.8:1 against deep obsidian backgrounds.
- **Brand Differentiation**: Rejects cliché neon purple gradients in favor of emerald precision and technical mono typography.
- **Zero Emojis in UI**: Uses clean vector SVG icons from Lucide exclusively.

## Consequences
- **Positive**: Cohesive, state-of-the-art aesthetic that stands out in recruiter and engineering reviews.
- **Trade-off**: Requires strict color token adherence across all components via Tailwind CSS v4 `@theme`.
