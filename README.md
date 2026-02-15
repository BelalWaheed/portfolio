# Belal Waheed — Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Frontend Developer.

**[🌐 Live Demo](https://belal-waheed.vercel.app)** · **[📧 Contact](mailto:belalwaheed000@gmail.com)**

---

## ✨ Features

- **Scroll-triggered animations** powered by Framer Motion
- **Earthy green dark theme** with custom design system
- **Fully responsive** — optimized for all screen sizes
- **Accessible UI** components built with Radix UI
- **Blazing fast** — React 19 + Vite + React Compiler

## 🛠 Tech Stack

| Category          | Technologies                             |
| ----------------- | ---------------------------------------- |
| **Framework**     | React 19, TypeScript                     |
| **Styling**       | Tailwind CSS 4, class-variance-authority |
| **Animation**     | Framer Motion                            |
| **UI Primitives** | Radix UI (Tooltip, Slot)                 |
| **Icons**         | Lucide React                             |
| **Routing**       | React Router                             |
| **Build**         | Vite, React Compiler (Babel)             |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/BelalWaheed/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Layout
│   ├── sections/     # Hero, About, Projects, Skills, Contact
│   └── ui/           # Button, Card, Badge, Input, Textarea
├── lib/
│   ├── constants.ts  # Projects, skills, social links, profile data
│   ├── utils.ts      # cn() class-merge utility
│   └── useScrollAnimation.ts
├── pages/
│   └── HomePage.tsx
└── types/
    └── index.ts      # TypeScript interfaces
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Belal Waheed</strong>
</p>
