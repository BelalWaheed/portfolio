import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { SOCIAL_LINKS, PROFILE } from '@/data/constants';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const { scrollYProgress } = useScroll();
  const footerOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <motion.footer 
      className="border-t border-slate-200/60 bg-transparent relative"
      style={{ opacity: footerOpacity }}
    >
      <div className="container mx-auto px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display font-bold text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
              Belal<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return Icon ? (
                <motion.a
                  key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 text-slate-600 hover:text-indigo-600 transition-colors duration-300 rounded-xl hover:bg-white/60"
                  aria-label={link.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ) : null;
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/50 text-center">
          <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
            © {currentYear} Made with
            <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="inline-flex items-center justify-center">
              <Heart size={13} className="text-rose-500 fill-rose-500" />
            </motion.span>
            by {PROFILE.name}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
