import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, type Variants } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { SKILLS } from '@/lib/constants';
import type { Skill } from '@/types';

const categoryConfig: Record<Skill['category'], { color: string; label: string }> = {
  frontend: { color: 'var(--color-accent-1)', label: 'Frontend' },
  backend: { color: 'var(--color-accent-2)', label: 'Backend' },
  tools: { color: 'var(--color-accent-3)', label: 'Tools' },
  other: { color: 'var(--color-accent-4)', label: 'Other' },
};

const skillEmojis: Record<string, string> = {
  'React': '⚛️', 'TypeScript': '💎', 'JavaScript': '⚡', 'Tailwind CSS': '🎨',
  'Redux': '🔄', 'HTML/CSS': '🌐', 'Vite': '⚡', 'Node.js': '💚',
  'C#': '🔷', 'SQL Server': '🗃️', 'REST APIs': '🔗', 'Git': '📦',
  'VS Code': '💻', 'Figma': '🎨', 'Vercel': '▲',
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Skill['category'] | 'all'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const categories = ['all', 'frontend', 'backend', 'tools'] as const;
  const filteredSkills = activeCategory === 'all' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden">
      {/* Parallax bg */}
      <motion.div 
        className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-1), transparent 70%)',
          filter: 'blur(100px)',
          x: bgX,
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent-2 text-sm font-semibold tracking-widest uppercase mb-3 font-mono">// skills</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            My <span className="text-gradient">toolkit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Technologies I use daily to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent-1 text-background shadow-lg shadow-accent-1/15'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {cat === 'all' ? 'All' : categoryConfig[cat].label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <Tooltip.Provider delayDuration={200}>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            key={activeCategory}
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const config = categoryConfig[skill.category];
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    variants={staggerItem}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div className="glass rounded-2xl p-5 cursor-pointer glow-border group hover:bg-muted/20 transition-all duration-300 text-center">
                          <div 
                            className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${config.color}10` }}
                          >
                            {skillEmojis[skill.name] || '🚀'}
                          </div>
                          <p className="font-medium text-sm mb-3 group-hover:text-accent-1 transition-colors duration-300">
                            {skill.name}
                          </p>
                          <div className="h-1 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: config.color }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="glass-strong px-4 py-3 rounded-xl z-50" sideOffset={8}>
                          <p className="font-semibold text-sm">{skill.name}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex-1 h-1 bg-border/50 rounded-full w-20 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: config.color }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Tooltip.Arrow className="fill-card" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Tooltip.Provider>

        {/* Legend */}
        <motion.div 
          className="flex flex-wrap gap-5 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {(['frontend', 'backend', 'tools'] as const).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryConfig[cat].color }} />
              <span className="text-xs text-muted-foreground">{categoryConfig[cat].label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
