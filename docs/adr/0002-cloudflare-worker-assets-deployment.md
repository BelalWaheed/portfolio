---
title: "ADR 0002: Cloudflare Workers with Static Assets & Serverless Resend Engine"
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
status: accepted
tags:
  - adr
  - cloudflare
  - serverless
  - deployment
---

# ADR 0002: Cloudflare Workers with Static Assets & Serverless Resend Engine

## Status
**Accepted**

## Context & Problem Statement
The portfolio needs to deliver high-bandwidth media (1080p MP4 demo videos and 3x Retina captures) without bandwidth throttling or credit card requirements, while executing a secure server-side API endpoint for delivering contact emails via the Resend API without exposing credentials in client-side JavaScript.

## Considered Options
1. **Option 1: Pure Static Host (GitHub Pages / Render Static)**: Zero serverless execution capability; requires exposing third-party API tokens client-side or relying entirely on `mailto:`.
2. **Option 2: Vercel Hobby**: Fast, but bandwidth is capped at 100 GB/month and terms restrict usage to personal non-commercial projects.
3. **Option 3: Cloudflare Workers with Static Assets**: Unlimited free bandwidth across 330+ global edge locations, zero cold-start V8 isolates, native edge handler (`src/worker.ts`) with encrypted secrets (`RESEND_API_KEY`), and automatic SPA routing (`"not_found_handling": "single-page-application"`).

## Decision & Rationale
We chose **Option 3: Cloudflare Workers with Static Assets** (with Vercel and direct email fallbacks maintained in code for redundancy).
- **Zero Card Requirement**: 100% permanent free tier with unlimited bandwidth.
- **Unified Edge Runtime**: Static assets (`dist/`) and `/api/contact` handler run in the same unified edge deployment.

## Consequences
- **Positive**: Blazing fast load times globally; zero bandwidth anxiety; API keys remain strictly server-side.
- **Requirements**: Requires defining `src/worker.ts` with `env.ASSETS.fetch(request)` binding.
