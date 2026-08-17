export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  videoUrl?: string;
  architecture?: string[];
  challenges?: string[];
  features?: string[];
  metrics?: string[];
  role?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
