import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { Layers, Server, Wrench, Layout } from 'lucide-react';
import { SKILLS } from '@/data/constants';
import { Badge } from '@/components/ui';

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  other: Layers,
};

const categoryTitles = {
  frontend: 'Frontend Development',
  backend: 'Backend & Database',
  tools: 'Tools & Platforms',
  other: 'Other Skills',
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const categories = ['frontend', 'backend', 'tools'] as const;

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        className="absolute left-0 top-1/3 w-[450px] h-[450px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, #4f46e5, transparent 70%)',
          x: bgX,
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-indigo-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 font-mono">// technical proficiency</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Core <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Technologies and tools I work with to build high-performance applications.
          </p>
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {categories.map((category) => {
            const categorySkills = SKILLS.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            const Icon = categoryIcons[category];

            return (
              <motion.div
                key={category}
                variants={staggerItem}
                className="studio-card studio-card-hover p-6 sm:p-8 flex flex-col h-full"
              >
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">{categoryTitles[category]}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {categorySkills.map((skill) => (
                    <Badge 
                      key={skill.name} 
                      variant="secondary" 
                      className="px-3.5 py-1.5 text-xs sm:text-sm bg-white/90 border-slate-200/80 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
