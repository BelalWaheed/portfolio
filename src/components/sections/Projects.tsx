import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { PROJECTS } from '@/data/constants';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, #818cf8, transparent 70%)',
          y: bgY,
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
          <p className="text-indigo-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 font-mono">// projects</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Selected <span className="text-gradient-warm">work</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Projects I've built with passion, precision, and a focus on clean code and great UX.
          </p>
        </motion.div>

        {/* Featured Project — Hero Card */}
        {featured[0] && (
          <motion.div 
            className="mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="studio-card studio-card-hover group">
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-[420px] overflow-hidden">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white/70 backdrop-blur-md">
                  <Badge className="w-fit mb-3 bg-indigo-500/10 text-indigo-700 border-indigo-200">
                    <Sparkles size={13} className="mr-1 inline" /> Featured Project
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">{featured[0].title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">{featured[0].description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
                    {featured[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {featured[0].liveUrl && (
                      <Button asChild className="w-full sm:w-auto">
                        <a href={featured[0].liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Button>
                    )}
                    {featured[0].githubUrl && (
                      <Button variant="outline" asChild className="w-full sm:w-auto">
                        <a href={featured[0].githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[...featured.slice(1), ...others].map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <div className="studio-card studio-card-hover h-full flex flex-col group">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Desktop Hover overlay */}
                  <div className="hidden lg:flex absolute inset-0 bg-slate-950/40 backdrop-blur-md items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-white/95 text-indigo-600 hover:bg-white hover:scale-110 shadow-lg transition-all" aria-label="Live demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-white/95 text-slate-900 hover:bg-white hover:scale-110 shadow-lg transition-all" aria-label="Source code">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold font-display text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                      {project.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">+{project.tags.length - 4}</Badge>
                      )}
                    </div>

                    {/* Touch Action Bar for mobile/tablet */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors ml-auto"
                        >
                          <Github size={14} /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
