import type { Project, Skill, SocialLink, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/BelalWaheed", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/belalwhaeed",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/belalwaheed_/",
    icon: "instagram",
  },
  { name: "Email", url: "mailto:belalwaheed000@gmail.com", icon: "mail" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Tivaq — Fragrance E-commerce",
    description:
      "Polished UI, comprehensive admin dashboard, multi-lingual i18n support, and a unique product authenticity verification system.",
    image: "/projects/tivaq/1.png",
    images: [
      "/projects/tivaq/1.png",
      "/projects/tivaq/2.png",
      "/projects/tivaq/3.png",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "i18n"],
    liveUrl: "https://www.tivaqfragrance.com/",
    featured: true,
    features: [
      "Product Authenticity Verification Code Scanner",
      "Full Admin Portal with Inventory & Order Analytics",
      "Multi-lingual i18n Internationalization (English & Arabic)",
      "Optimized Shopping Cart with Local & Cloud Sync",
    ],
    architecture: [
      "React + Vite frontend with Tailwind CSS styling",
      "Node.js & Express RESTful API backend",
      "MongoDB database with indexed product search and caching",
      "JWT-based Secure Authentication & Role-Based Access",
    ],
    challenges: [
      "Designing a high-speed product lookup mechanism for instant authenticity checks.",
      "Managing complex internationalized state across client and server interactions.",
    ],
  },
  {
    id: "2",
    title: "Moviq — Movie & TV Discovery",
    description:
      "A comprehensive movie and TV discovery platform with TMDB integration, featuring content browsing, trailers, cast info, user authentication, and responsive dark theme design.",
    image: "/projects/moviqq/1.png",
    images: [
      "/projects/moviqq/1.png",
      "/projects/moviqq/2.png",
      "/projects/moviqq/3.png",
    ],
    tags: ["React", "Node.js", "TMDB API", "Tailwind CSS", "Redux"],
    liveUrl: "https://moviqq.vercel.app",
    githubUrl: "https://github.com/BelalWaheed/moviq",
    featured: true,
    features: [
      "Real-time TMDB API Integration for Trending & Top-Rated Content",
      "Video Trailer Player & Cast Details View",
      "Custom Watchlist & Favorites Management",
      "Advanced Multi-Filter Search by Genre, Year, and Rating",
    ],
    architecture: [
      "React Single Page Application with Redux Toolkit state management",
      "Asynchronous data fetching with optimistic caching",
      "Custom responsive CSS Grid & Dark-mode glassmorphic theme",
    ],
    challenges: [
      "Optimizing API query rates to TMDB while maintaining 60fps infinite scroll.",
      "Building smooth trailer modal playback across mobile and desktop browsers.",
    ],
  },
  {
    id: "3",
    title: "Loop — Social Platform & Media Workspace",
    description:
      "Modern social and content web app featuring rich media feeds, interactive UI state management, real-time activity, and polished user workflows.",
    image: "/projects/loop/1.png",
    images: [
      "/projects/loop/1.png",
      "/projects/loop/2.png",
      "/projects/loop/3.png",
    ],
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/BelalWaheed/loop",
    videoUrl: "/projects/loop/loop-intro.mp4",
    featured: true,
    features: [
      "Interactive Media Feed with Image & Video Cards",
      "Real-time Likes, Comments, and Social Interactions",
      "User Profile & Customizable Activity Timeline",
      "Dark-mode first responsive UI with micro-animations",
    ],
    architecture: [
      "TypeScript + React frontend with modular component architecture",
      "Express backend server handling real-time posts & user payloads",
      "MongoDB database for users, relations, and post storage",
    ],
    challenges: [
      "Handling real-time UI state updates without re-rendering unnecessary feed components.",
      "Optimizing image upload pipelines for fast load times.",
    ],
  },
  {
    id: "4",
    title: "Obel — Productivity Workspace",
    description:
      "Unified task management and note-taking workspace inspired by Obsidian, with a RESTful API and flexible MongoDB storage.",
    image: "/projects/obel/1.png",
    images: [
      "/projects/obel/1.png",
      "/projects/obel/2.png",
      "/projects/obel/3.png",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/BelalWaheed/Obel",
    liveUrl: "https://obel.vercel.app",
    featured: true,
    features: [
      "Markdown-first note editor with live preview",
      "Categorized task board with drag-and-drop state management",
      "Full offline caching and rapid MongoDB persistence",
    ],
    architecture: [
      "React + Vite frontend with Tailwind CSS",
      "Express REST API with clean controller-service architecture",
      "MongoDB schema design for flexible nested document notes",
    ],
  },
  {
    id: "5",
    title: "Cema — Cinema & Ticket Platform",
    description:
      "A comprehensive cinema and show booking system with movies list, schedules, and ticketing management.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    tags: ["ASP.Net MVC", "SQL Server", "Bootstrap"],
    githubUrl: "https://github.com/BelalWaheed/cema-mvc",
    featured: false,
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React.js", category: "frontend", description: "Hooks, Context, State Management" },
  { name: "JavaScript (ES6+)", category: "frontend", description: "Async/Await, DOM, Concepts" },
  { name: "TypeScript", category: "frontend", description: "Type Safety, Interfaces, Generics" },
  { name: "Tailwind CSS", category: "frontend", description: "Glassmorphism, Responsive Design" },
  { name: "Redux Toolkit", category: "frontend", description: "Global Store, Async Thunks" },
  { name: "Next.js", category: "frontend", description: "SSR, SSG, App Router" },
  { name: "GSAP & Framer Motion", category: "frontend", description: "ScrollTrigger, Micro-interactions" },
  { name: "HTML5 / CSS3", category: "frontend", description: "Semantic Markup, Modern Layouts" },

  // Backend & Database
  { name: "Node.js", category: "backend", description: "Event Loop, Express Servers" },
  { name: "Express.js", category: "backend", description: "RESTful Routing, Middleware" },
  { name: "MongoDB", category: "backend", description: "Mongoose ODM, Aggregations" },
  { name: "REST APIs", category: "backend", description: "API Design, JSON, JWT Auth" },
  { name: "C# / ASP.NET", category: "backend", description: "MVC Architecture, Web APIs" },
  { name: "SQL Server", category: "backend", description: "Relational Schemas, Queries" },

  // Tools & Ecosystem
  { name: "Git & GitHub", category: "tools", description: "Version Control, Feature Branches" },
  { name: "VS Code", category: "tools", description: "Extensions, Debugging" },
  { name: "Vercel", category: "tools", description: "Deployment, CI/CD, Analytics" },
  { name: "Postman", category: "tools", description: "API Testing & Documentation" },
  { name: "Figma", category: "tools", description: "UI Wireframing & Design Tokens" },
];

export const PROFILE = {
  name: "Belal Waheed",
  title: "Full-Stack Developer",
  tagline: "Building modern web experiences with React, Node.js & MongoDB",
  bio: `Full-Stack Developer and Information Technology student. Proficient in React, Node.js, and MongoDB, 
        with a strong focus on clean architecture, performance, and user experience. Experienced in building 
        scalable applications, RESTful APIs, and responsive frontends.`,
  location: "Cairo, Egypt",
  email: "belalwaheed000@gmail.com",
  availability: true,
};

export const SEO_CONFIG = {
  siteUrl: "https://belalwaheed.vercel.app",
  siteName: "Belal Waheed | Full-Stack Developer",
  siteDescription:
    "Belal Waheed — Full-Stack Developer based in Cairo, crafting modern web experiences with React, Node.js, and MongoDB. View my portfolio, projects, and get in touch.",
  keywords: [
    "Belal Waheed",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Portfolio",
    "Web Developer Cairo",
    "React Portfolio",
    "Tailwind CSS",
    "JavaScript Developer",
    "Software Engineer",
  ],
  ogImage: "/profile.jpg",
  twitterHandle: "@BelalWah8ed",
};
