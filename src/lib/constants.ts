import type { Project, Skill, SocialLink, NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/BelalWaheed', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/belalwhaeed', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/belalwaheed_/', icon: 'instagram' },
  { name: 'Email', url: 'mailto:belalwaheed000@gmail.com', icon: 'mail' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Moviq - Movie & TV Discovery',
    description: 'A comprehensive movie and TV discovery platform with TMDB integration, featuring content browsing, trailers, cast info, user authentication, and responsive dark theme design.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Vite', 'TMDB API'],
    liveUrl: 'https://moviqq.vercel.app',
    githubUrl: 'https://github.com/BelalWaheed/moviq',
    featured: true,
  },
  {
    id: '2',
    title: 'React Commerce',
    description: 'A modern and responsive full-stack e-commerce platform with user-facing storefront and admin panel, built with React, Vite, and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Axios'],
    liveUrl: 'https://github.com/BelalWaheed/eCommerce',
    githubUrl: 'https://github.com/BelalWaheed/eCommerce',
    featured: true,
  },
  {
    id: '3',
    title: 'Store Management System',
    description: 'A C# Windows Forms application for store management using SQL Server database to handle products, customers, and orders with a complete admin interface.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['C#', 'Windows Forms', 'SQL Server', '.NET'],
    githubUrl: 'https://github.com/BelalWaheed/Store-Management-System',
    featured: true,
  },
  {
    id: '4',
    title: 'Weather App',
    description: 'A weather application that provides real-time weather data and forecasts for any location using weather APIs.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    tags: ['JavaScript', 'API', 'CSS'],
    githubUrl: 'https://github.com/BelalWaheed/belal_WeatherAPP',
  },
  {
    id: '5',
    title: 'Travel Guide',
    description: 'A travel guide application helping users discover destinations and plan their trips.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/BelalWaheed/travel-guide',
  },
  {
    id: '6',
    title: 'Currency Converter',
    description: 'A currency converter tool for converting between different currencies with real-time exchange rates.',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80',
    tags: ['JavaScript', 'API', 'CSS'],
    githubUrl: 'https://github.com/BelalWaheed/currency_converter',
  },
  {
    id: '7',
    title: 'QR Code Generator',
    description: 'A simple and effective QR code generator for creating scannable codes.',
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&q=80',
    tags: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/BelalWaheed/QR-code',
  },
  {
    id: '8',
    title: 'React Cart',
    description: 'A shopping cart implementation using React with state management for e-commerce applications.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    tags: ['React', 'JavaScript', 'CSS'],
    githubUrl: 'https://github.com/BelalWaheed/react_cart',
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'Redux Toolkit', level: 88, category: 'frontend' },
  { name: 'Next.js', level: 75, category: 'frontend' },
  { name: 'HTML/CSS', level: 95, category: 'frontend' },
  { name: 'Vite', level: 85, category: 'frontend' },
  // Backend
  { name: 'C#', level: 80, category: 'backend' },
  { name: 'C++', level: 75, category: 'backend' },
  { name: 'SQL Server', level: 78, category: 'backend' },
  { name: 'REST APIs', level: 85, category: 'backend' },
  { name: 'Axios', level: 88, category: 'backend' },
  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
  { name: 'Figma', level: 70, category: 'tools' },
  { name: 'Vercel', level: 85, category: 'tools' },
];

export const PROFILE = {
  name: 'Belal Waheed',
  title: 'Frontend Developer',
  tagline: 'Building modern web experiences with React & TypeScript',
  bio: `Information Technology student specializing in Front-End Development with 
        hands-on experience building scalable and responsive web applications using 
        React, TypeScript, Redux Toolkit, and Tailwind CSS. Strong understanding of 
        state management, REST API integration, authentication systems, and 
        performance optimization.`,
  location: 'Cairo, Egypt',
  email: 'belalwaheed000@gmail.com',
  availability: true,
};

export const SEO_CONFIG = {
  siteUrl: 'https://belal-waheed.vercel.app',
  siteName: 'Belal Waheed | Frontend Developer',
  siteDescription:
    'Belal Waheed — Frontend Developer based in Cairo, crafting modern web experiences with React, TypeScript & Tailwind CSS. View my portfolio, projects, and get in touch.',
  keywords: [
    'Belal Waheed',
    'Frontend Developer',
    'React Developer',
    'TypeScript Developer',
    'Portfolio',
    'Web Developer Cairo',
    'React Portfolio',
    'Tailwind CSS',
    'JavaScript Developer',
    'UI Developer',
    'Frontend Engineer',
  ],
  ogImage: '/profile.jpg',
  twitterHandle: '@BelalWah8ed',
};
