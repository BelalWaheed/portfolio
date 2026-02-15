import { motion, type Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, ExternalLink, Github, Linkedin,
  GraduationCap, Briefcase, Code2, Wrench, Globe,
  Download, ArrowLeft, ChevronRight, Layers,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';
import { SEO } from '@/components/SEO';
import { PROFILE, SEO_CONFIG } from '@/lib/constants';

/* ── Data ── */
const contactInfo = [
  { icon: MapPin, value: 'Cairo, Egypt' },
  { icon: Mail, value: 'belalwaheed000@gmail.com', href: 'mailto:belalwaheed000@gmail.com' },
  { icon: Phone, value: '+20 1111004353', href: 'tel:+201111004353' },
  { icon: Globe, value: 'belal-waheed.vercel.app', href: SEO_CONFIG.siteUrl },
];

const profileLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belalwhaeed' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/BelalWaheed' },
];

const skills = {
  Languages: ['JavaScript (ES6+)', 'TypeScript', 'C++', 'C#'],
  'Front-End': ['React', 'Redux Toolkit', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  Concepts: ['State Management', 'REST APIs', 'Authentication & Authorization', 'Component-Based Architecture', 'Performance Optimization'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vite', 'Axios'],
};

const skillIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Languages: Code2,
  'Front-End': Layers,
  Concepts: Wrench,
  Tools: Wrench,
};

const experienceBullets = [
  'Built responsive single-page applications (SPA) using React and TypeScript.',
  'Implemented global state management using Redux Toolkit.',
  'Integrated RESTful APIs and developed authentication workflows.',
  'Optimized application performance and improved loading speed.',
  'Applied clean code principles and modular component architecture.',
];

const projects = [
  {
    title: 'Moviq — Movie & TV Discovery Platform',
    url: 'https://moviqq.vercel.app',
    tech: ['React', 'Redux', 'Tailwind CSS', 'TMDB API'],
    description: 'Comprehensive movie and TV discovery platform with TMDB integration, content browsing, trailers, cast info, user authentication, and responsive dark theme design.',
  },
  {
    title: 'React Commerce — Full-Stack E-Commerce',
    url: 'https://github.com/BelalWaheed/eCommerce',
    tech: ['React', 'Redux Toolkit', 'Axios'],
    description: 'Full-stack e-commerce platform with user storefront, admin dashboard, cart management, product CRUD, user administration, and store activity overview.',
  },
  {
    title: 'Store Management System — Desktop App',
    url: 'https://github.com/BelalWaheed/Store-Management-System',
    tech: ['C#', '.NET', 'SQL Server'],
    description: 'Windows Forms application for store management using SQL Server to handle products, customers, and orders with a complete admin interface.',
  },
];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Section heading ── */
function SectionHeading({ icon: Icon, title, delay = 0 }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-5"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-2 rounded-xl bg-accent-1/10 print:bg-gray-100">
        <Icon size={17} className="text-accent-1 print:text-gray-600" />
      </div>
      <h2 className="text-lg font-bold font-display tracking-tight print:text-black">{title}</h2>
      <div className="flex-1 h-px bg-border/40 ml-2 print:bg-gray-200" />
    </motion.div>
  );
}

/* ── Page ── */
export function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <>
      <SEO
        title="Resume — Belal Waheed | Frontend Developer"
        description="Belal Waheed's resume — Frontend Developer specializing in React, TypeScript, and modern web technologies. View education, skills, projects, and experience."
        canonical={`${SEO_CONFIG.siteUrl}/resume`}
      />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:min-h-0">
        {/* Top bar */}
        <motion.div
          className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
              Back to Portfolio
            </Button>
          </Link>
          <Button size="sm" onClick={handlePrint}>
            <Download size={16} />
            Download PDF
          </Button>
        </motion.div>

        {/* Resume Card */}
        <div className="max-w-4xl mx-auto glass rounded-3xl glow-border overflow-hidden print:rounded-none print:border-none print:shadow-none print:bg-white print:text-black">

          {/* ─── HEADER ─── */}
          <motion.header
            className="p-8 sm:p-10 border-b border-border/30 print:border-gray-200 print:pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold font-display text-gradient print:text-black mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              className="text-lg text-accent-1 font-semibold print:text-gray-600 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Front-End Developer &nbsp;|&nbsp; React &amp; TypeScript Specialist
            </motion.p>

            {/* Contact row */}
            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((c) => (
                <motion.span key={c.value} variants={fadeUp} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground print:text-gray-600">
                  <c.icon size={13} className="text-accent-1/70 print:text-gray-400 shrink-0" />
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-1 transition-colors print:text-blue-600 print:underline">{c.value}</a>
                  ) : (
                    c.value
                  )}
                </motion.span>
              ))}
              <span className="text-border print:text-gray-300">|</span>
              {profileLinks.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent-1 transition-colors print:text-blue-600 print:underline"
                >
                  <l.icon size={13} />
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.header>

          {/* ─── BODY ─── */}
          <div className="p-8 sm:p-10 space-y-9 print:space-y-6 print:pt-6">

            {/* Professional Summary */}
            <section>
              <SectionHeading icon={Briefcase} title="Professional Summary" delay={0.15} />
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed print:text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Information Technology student specializing in Front-End Development with hands-on experience
                building scalable and responsive web applications using React, TypeScript, Redux Toolkit, and
                Tailwind CSS. Strong understanding of state management, REST API integration, authentication
                systems, and performance optimization. Passionate about writing clean, maintainable code and
                delivering high-quality user experiences.
              </motion.p>
            </section>

            {/* Technical Skills */}
            <section>
              <SectionHeading icon={Code2} title="Technical Skills" delay={0.2} />
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items], i) => {
                  const Icon = skillIcons[category] || Code2;
                  return (
                    <motion.div
                      key={category}
                      className="glass rounded-xl p-4 glow-border print:border print:border-gray-200 print:bg-gray-50"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                    >
                      <h3 className="text-xs font-bold text-accent-1 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 print:text-gray-700">
                        <Icon size={13} />
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg text-xs bg-muted text-muted-foreground print:bg-gray-100 print:text-gray-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Experience */}
            <section>
              <SectionHeading icon={Briefcase} title="Experience" delay={0.3} />
              <motion.div
                className="glass rounded-xl p-5 glow-border print:border print:border-gray-200 print:bg-gray-50"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground print:text-black">Front-End Developer</h3>
                    <p className="text-sm text-accent-1 font-medium print:text-gray-600">Freelance / Self Projects</p>
                  </div>
                  <span className="text-xs text-muted-foreground print:text-gray-500 font-mono shrink-0">Aug 2024 — Present</span>
                </div>
                <motion.ul
                  className="space-y-2"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                >
                  {experienceBullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      variants={fadeUp}
                      className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2 print:text-gray-700"
                    >
                      <ChevronRight size={14} className="text-accent-1/60 shrink-0 mt-0.5 print:text-gray-400" />
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </section>

            {/* Projects */}
            <section>
              <SectionHeading icon={ExternalLink} title="Projects" delay={0.35} />
              <motion.div
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeUp}
                    className="glass rounded-xl p-5 glow-border group hover:bg-muted/20 transition-all duration-300 print:border print:border-gray-200 print:bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground print:text-black group-hover:text-accent-1 transition-colors text-sm">
                        {project.title}
                      </h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-1 hover:text-accent-2 transition-colors shrink-0 print:text-blue-600"
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 print:text-gray-600">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent-1/8 text-accent-1/80 print:bg-gray-100 print:text-gray-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Education */}
            <section>
              <SectionHeading icon={GraduationCap} title="Education" delay={0.4} />
              <motion.div
                className="glass rounded-xl p-5 glow-border print:border print:border-gray-200 print:bg-gray-50"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-foreground print:text-black">Bachelor of Information Technology</h3>
                    <p className="text-sm text-accent-1 font-medium mt-0.5 print:text-gray-600">Sinai University — Arish, Egypt</p>
                  </div>
                  <span className="text-xs text-muted-foreground print:text-gray-500 font-mono shrink-0">Sep 2023 — Present</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 print:text-gray-600">
                  GPA: <span className="text-foreground font-semibold print:text-black">3.3</span>
                </p>
              </motion.div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
