---
title: System Workflows & Data Flows
type: project-doc
project: belalwaheed-portfolio
author: Belal Waheed
date: 2026-08-17
tags:
  - workflows
  - sequence-diagrams
  - data-flow
---

# System Workflows & Data Flows

## 1. Contact Form Dispatch & Fail-Safe Fallback Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as Contact.tsx (UI)
    participant Worker as src/worker.ts (Edge)
    participant Resend as Resend API
    actor Belal as belalwaheed000@gmail.com

    User->>UI: Fills Form & Selects Topic Pill
    User->>UI: Clicks "Send Message"
    UI->>UI: Validate Fields (Name, Email, Message)
    
    alt Valid Payload
        UI->>Worker: POST /api/contact {name, email, subject, message}
        alt Server Key Configured & API Success
            Worker->>Resend: POST https://api.resend.com/emails (Auth Bearer RESEND_API_KEY)
            Resend-->>Worker: HTTP 200 {id: "email_123"}
            Worker-->>UI: HTTP 200 {success: true}
            UI->>User: Displays Green Success Checkmark
            Resend->>Belal: Delivers Formatted HTML Email
        else Key Missing or Network Offline
            Worker-->>UI: HTTP 500 / Fetch Error
            UI->>UI: Catch block triggers
            UI->>User: Triggers mailto: fallback & 1-Click Copy Tooltip
        end
    else Validation Failed
        UI->>User: Highlight invalid input with red border
    end
```

---

## 2. Command Menu (`Cmd+K`) Navigation & Spotlight Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Keyboard as Key Listener (Cmd+K / Ctrl+K)
    participant CmdMenu as CommandMenu.tsx
    participant App as App.tsx
    participant Modal as ProjectModal.tsx

    User->>Keyboard: Presses Cmd+K (or Clicks Search in Header)
    Keyboard->>App: Sets isCommandOpen = true
    App->>CmdMenu: Mounts Spotlight Dialog & Focuses Input
    User->>CmdMenu: Types Search Query (e.g. "Loop" or "CV")
    CmdMenu->>CmdMenu: Filters Navigation, Projects, & Quick Actions
    
    alt User Selects Project
        User->>CmdMenu: Presses Enter on "Loop"
        CmdMenu->>App: Triggers onSelectProject(Loop)
        CmdMenu->>CmdMenu: Closes Spotlight
        App->>Modal: Opens Case Study Modal (Video Player + Arch)
    else User Selects "Copy Email"
        User->>CmdMenu: Presses Enter on "Copy Email"
        CmdMenu->>User: Writes to Clipboard & Shows Animated Check
    else User Selects "View Resume"
        User->>CmdMenu: Presses Enter on "Resume"
        CmdMenu->>App: Navigates to /resume
    end
```

---

## 3. Coordinated Technology Filter Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Skills as Skills.tsx
    participant Home as HomePage.tsx
    participant Projects as Projects.tsx

    User->>Skills: Clicks "React.js" in Skills Matrix
    Skills->>Home: Invokes onSelectTag("React.js")
    Home->>Home: Updates selectedTag = "React.js"
    Home->>Projects: Passes activeFilter = "React.js"
    Home->>Skills: Passes activeTag = "React.js"
    Skills->>Skills: Highlights "React.js" pill with emerald border
    Projects->>Projects: Smoothly re-animates Bento Grid via Framer Motion
    Skills->>Projects: Scrolls viewport to #projects
```

---

## 4. Git-Driven Cloudflare Deployment Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant Git as GitHub (BelalWaheed/portfolio:main)
    participant CF as Cloudflare Workers & Static Assets
    participant CDN as Global Edge Cache

    Dev->>Git: git push origin main
    Git->>CF: Webhook notification
    CF->>CF: Clones repository (branch: main)
    CF->>CF: npm ci
    CF->>CF: npm run build (tsc -b && vite build)
    CF->>CF: Bundles src/worker.ts & dist/ static assets
    CF->>CDN: Deploys Worker script & static assets to 330+ edge locations
    CDN-->>Dev: Live at https://portfolio.belwaheed.workers.dev (and belal.is-a.dev)
```
