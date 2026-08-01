import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/data/constants';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Hide header on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollState = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isMobileMenuOpen) {
        setIsVisible(false); // scrolling down -> hide
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);  // scrolling up -> reveal
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener('scroll', handleScrollState, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollState);
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'skills', 'projects', 'about'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection('/');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-300 ease-out"
      style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <motion.div 
        className="absolute inset-0 -z-10 border-b"
        style={{ 
          opacity: headerBg,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          borderColor: 'rgba(226, 232, 240, 0.8)',
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group cursor-pointer">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="text-slate-900 font-display font-bold text-lg">
                Belal<span className="text-indigo-600">.</span>
              </span>
            </motion.div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === item.href
                    ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-indigo-600"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {SOCIAL_LINKS.slice(0, 2).map((link) => {
              const Icon = iconMap[link.icon];
              return Icon ? (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-indigo-600 transition-colors duration-300"
                  aria-label={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ) : null;
            })}
            <Button size="sm" onClick={() => handleNavClick('#contact')}>
              Let's Talk
            </Button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-slate-200 text-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Menu Backdrop & Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Tap Outside Backdrop */}
              <motion.div 
                className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Drawer Container */}
              <motion.div
                className="md:hidden mt-3 relative z-50"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="studio-card p-4 space-y-1.5 shadow-xl bg-white/95 border-white">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        activeSection === item.href
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-700 hover:bg-slate-100/60'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.03 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-3 mt-2 border-t border-slate-200/80">
                    <Button className="w-full" onClick={() => handleNavClick('#contact')}>
                      Let's Talk
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
