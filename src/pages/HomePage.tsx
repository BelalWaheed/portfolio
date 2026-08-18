import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero, About, Projects, Skills, Contact } from '@/components/sections';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Project } from '@/types';

interface HomePageProps {
  onSelectProject?: (project: Project) => void;
}

export function HomePage({ onSelectProject }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const location = useLocation();

  // Handle hash scrolling when arriving from other routes (e.g. /#projects, /#skills)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <SEO />
      <JsonLd />
      <Hero />
      <About />
      <Projects
        onSelectProject={onSelectProject}
        selectedTag={selectedTag}
        onTagSelect={(tag) => setSelectedTag(tag)}
      />
      <Skills
        activeTag={selectedTag}
        onSelectTag={(tag) => setSelectedTag(tag)}
      />
      <Contact />
    </>
  );
}

export default HomePage;
