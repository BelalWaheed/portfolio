import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { Code2, Palette, Zap, Coffee, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE } from '@/data/constants';

const experiences = [
  {
    title: 'Bachelor of Information Technology',
    company: 'Sinai University – Arish',
    period: 'Sep 2023 – Present',
    description: 'Studying Information Technology with a focus on full-stack development, software engineering, and database management. GPA: 3.3',
    icon: GraduationCap,
    color: '#4f46e5',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Self-Initiated & Client Projects',
    period: 'Aug 2024 – Present',
    description: 'Delivering client-facing applications like Tivaq and Moviq. Implementing JWT authentication, RBAC, RESTful APIs, and responsive React interfaces.',
    icon: Briefcase,
    color: '#f472b6',
  },
];

const passions = [
  { icon: Code2, label: 'Clean Code', desc: 'Maintainable, scalable architecture' },
  { icon: Palette, label: 'UI Design', desc: 'Crafting intuitive user interfaces' },
  { icon: Zap, label: 'Performance', desc: 'Optimizing speed and responsiveness' },
  { icon: Coffee, label: 'Continuous Learning', desc: 'Exploring modern tools & stacks' },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        className="absolute left-0 top-1/4 w-[350px] h-[350px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, #f472b6, transparent 70%)',
          y: bgY,
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-indigo-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 font-mono">// about</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
            A bit about <span className="text-gradient">me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Bio + Passions */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Bio */}
            <div className="space-y-4 studio-card p-6 sm:p-8">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {PROFILE.bio}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                When I'm not coding, I'm exploring new web technologies, contributing to projects, and continuously refining my skill set.
              </p>
              <div className="flex items-center gap-2.5 pt-2 text-indigo-700 font-medium text-sm">
                <MapPin size={16} className="text-indigo-600 shrink-0" />
                <span>Based in {PROFILE.location}</span>
              </div>
            </div>

            {/* Passions Grid — 2 columns on mobile */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {passions.map((item) => (
                <motion.div 
                  key={item.label}
                  variants={staggerItem}
                  className="studio-card p-5 group hover:border-indigo-300 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
                    <item.icon size={18} />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Experience Timeline */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-bold mb-6 font-display text-slate-900">Experience &amp; Education</h3>
            
            <div className="relative space-y-6">
              {/* Timeline vertical line */}
              <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-indigo-200" />
              
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-11"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md border border-slate-200"
                  >
                    <exp.icon size={15} style={{ color: exp.color }} />
                  </div>
                  
                  <div className="studio-card p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
                      <Calendar size={13} />
                      <span>{exp.period}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{exp.title}</h4>
                    <p className="text-sm font-semibold mb-3" style={{ color: exp.color }}>{exp.company}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
