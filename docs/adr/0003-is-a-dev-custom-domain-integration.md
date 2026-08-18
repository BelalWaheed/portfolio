---
title: "ADR 0003: is-a.dev Free Developer Custom Domain Integration"
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
status: accepted
tags:
  - adr
  - domain
  - dns
  - is-a-dev
---

# ADR 0003: is-a.dev Free Developer Custom Domain Integration

## Status
**Accepted**

## Context & Problem Statement
Top-level domains (such as `.dev`) require annual registration fees (~$12/year) through ICANN registrars. We need a permanent, zero-cost, branded developer domain (`belal.is-a.dev`) that routes cleanly to our Cloudflare edge deployment with automatic HTTPS/TLS.

## Considered Options
1. **Option 1: Purchase `.dev` Domain**: Requires recurring annual fee and credit card on file.
2. **Option 2: Default `*.workers.dev` Subdomain**: Functional, but results in multi-level subdomains (`portfolio.belwaheed.workers.dev`).
3. **Option 3: Register `belal.is-a.dev` via is-a.dev Open-Source Registry**: Free open-source registry maintained by the developer community for developer portfolios, providing a clean `belal.is-a.dev` CNAME directly to Cloudflare.

## Decision & Rationale
We chose **Option 3: Register `belal.is-a.dev`**.
- **Permanent Zero-Cost**: 100% free forever for developer portfolios.
- **Clean Single-Level Domain**: Solves double-subdomain issues.
- **Automatic HTTPS**: Cloudflare handles SSL provisioning automatically.

## Consequences
- **Positive**: Clean, professional `https://belal.is-a.dev` URL.
- **Workflow**: Requires opening a GitHub PR to `is-a-dev/register` with `domains/belal.json`.
