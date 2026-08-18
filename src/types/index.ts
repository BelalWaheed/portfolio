export interface ProjectChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectArchitectureLayer {
  layer: string;
  tech: string;
  details: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  longDescription?: string;
  image: string;
  imageMobile?: string;
  images?: string[];
  imagesMobile?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  videoUrl?: string;
  videoWebmUrl?: string;
  role?: string;
  timeline?: string;
  team?: string;
  features?: string[];
  architecture?: string[];
  architectureLayers?: ProjectArchitectureLayer[];
  challenges?: string[];
  detailedChallenges?: ProjectChallenge[];
  metrics?: string[];
  detailedMetrics?: ProjectMetric[];
  techStackMatrix?: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops?: string[];
  };
  learnings?: string[];
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
