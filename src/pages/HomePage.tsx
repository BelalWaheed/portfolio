import { Hero, About, Projects, Skills, Contact } from '@/components/sections';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';

export function HomePage() {
  return (
    <>
      <SEO />
      <JsonLd />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
