import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';
import { PROFILE } from '@/data/constants';

export function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const heroY = useTransform(scrollY, [0, 600], [0, 60]);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-12 lg:py-0 overflow-hidden"
      style={{ opacity: heroOpacity }}
    >
      <motion.div 
        className="container mx-auto px-6 lg:px-8 relative z-10"
        style={{ y: heroY, scale: heroScale }}
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Name */}
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-slate-500 font-medium text-xl sm:text-2xl lg:text-3xl block mb-1">
                Hello, I'm
              </span>
              <span className="text-gradient block">{PROFILE.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p 
              className="text-xl sm:text-2xl text-slate-700 font-semibold mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {PROFILE.title}
            </motion.p>

            {/* Tagline */}
            <motion.p 
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {PROFILE.tagline}. I build <span className="text-indigo-600 font-medium">pixel-perfect</span> interfaces with clean code and smooth interactions.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Button size="lg" className="w-full sm:w-auto" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <Sparkles size={18} />
                View Projects
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/resume">
                  Resume
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Photo */}
          <motion.div 
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Soft ambient glow behind photo */}
              <div 
                className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #f472b6)' }}
              />
              
              {/* Photo Card Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-3xl sm:rounded-[2.2rem] overflow-hidden glass shadow-2xl border border-white/90">
                <img 
                  src="/profile.jpg"
                  alt={`${PROFILE.name} - ${PROFILE.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-linear-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center">
                        <span class="text-6xl font-bold text-gradient">BW</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Inline Scroll Indicator with clean margin */}
        <motion.div 
          className="mt-12 lg:mt-16 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
            aria-label="Scroll down"
          >
            <span className="text-[11px] text-slate-500 font-mono tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={15} className="text-indigo-500 group-hover:text-indigo-700 transition-colors" />
            </motion.div>
          </button>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}
