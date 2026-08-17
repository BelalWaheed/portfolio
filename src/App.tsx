import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from '@/components/layout';
import { CustomCursor, CommandMenu, ProjectModal } from '@/components/ui';
import { HomePage, ResumePage } from '@/pages';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    // Only initialize Lenis smooth scroll on non-touch desktop devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(project) => {
          setIsCommandOpen(false);
          setActiveModalProject(project);
        }}
      />

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      <Routes>
        <Route element={<Layout onOpenCommand={() => setIsCommandOpen(true)} />}>
          <Route path="/" element={<HomePage onSelectProject={(p) => setActiveModalProject(p)} />} />
        </Route>
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
