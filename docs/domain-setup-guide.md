---
title: Step-by-Step Domain Registration & Cloudflare Setup Guide
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
tags:
  - guide
  - domain
  - is-a-dev
  - cloudflare
  - tutorial
---

# Step-by-Step Domain Registration & Cloudflare Setup Guide

This guide details the exact, ordered procedure for registering **`belal.is-a.dev`** and linking it to your Cloudflare deployment.

---

## 1. Prerequisites Checklist
- [x] Cloudflare Worker deployed (`portfolio.belwaheed.workers.dev`).
- [x] GitHub Account logged in (`BelalWaheed`).
- [x] Portfolio screenshot ready for pull request attachment.

---

## 2. Ordered Registration Procedure

### Step 1: Fork the `is-a-dev/register` Repository
1. Navigate to: **[https://github.com/is-a-dev/register/fork](https://github.com/is-a-dev/register/fork)**.
2. Leave the repository name as `register`.
3. Click **"Create fork"**.

---

### Step 2: Create the `domains/belal.json` Configuration File
1. In your fork on GitHub (`https://github.com/BelalWaheed/register`), click on the **`domains`** folder.
2. Click **"Add file"** → **"Create new file"**.
3. In the file path input, type:
   ```text
   domains/belal.json
   ```
4. Paste the following exact JSON structure:
   ```json
   {
     "owner": {
       "username": "BelalWaheed",
       "email": "belalwaheed000@gmail.com"
     },
     "records": {
       "CNAME": "belalwaheed.pages.dev"
     }
   }
   ```
5. Click **"Commit changes..."** (commit message: `feat: add belal.is-a.dev`).

---

### Step 3: Open the Pull Request
1. At the top of your forked repository, click **"Contribute"** → **"Open pull request"**.
2. Set the PR title:
   ```text
   Register: belal.is-a.dev
   ```
3. In the PR body, complete the checklist:
   - Mark the agreement checkboxes (`[x]`).
   - Provide your live site URL: `https://portfolio.belwaheed.workers.dev`.
   - Drag and drop a screenshot image of your portfolio into the description box.
4. Click **"Create pull request"**.

---

### Step 4: Add the Custom Domain in Cloudflare
1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)**.
2. Navigate to **Workers & Pages** → click your **portfolio** worker.
3. Click the **Domains** tab (or **Settings** → **Domains & Routes**).
4. Click **"Add"** → **"Custom Domain"**.
5. Enter **`belal.is-a.dev`** and click **Continue**.
6. Cloudflare will automatically verify the CNAME record and activate your free SSL/TLS certificate.
