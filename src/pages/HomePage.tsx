import { useState } from 'react';
import { Hero, About, Projects, Skills, Contact } from '@/components/sections';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Project } from '@/types';

interface HomePageProps {
  onSelectProject?: (project: Project) => void;
}

export function HomePage({ onSelectProject }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
