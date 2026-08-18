import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, FileText, Download, Copy, Check, Github, Linkedin, Mail, X, Sparkles, Code2, Layers, ArrowRight } from 'lucide-react';
import { PROJECTS, PROFILE } from '@/data/constants';
import type { Project } from '@/types';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenResume?: () => void;
}

export function CommandMenu({ isOpen, onClose, onSelectProject, onOpenResume }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1200);
  };

  const scrollTo = (id: string) => {
    handleClose();
    if (window.location.pathname !== '/') {
      navigate(`/#${id}`);
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Define commands list
  const navItems = [
    { id: 'home', label: 'Home — Introduction', category: 'Navigation', icon: Sparkles, action: () => scrollTo('home') },
    { id: 'about', label: 'About — Engineering Pillars & Background', category: 'Navigation', icon: Code2, action: () => scrollTo('about') },
    { id: 'projects', label: 'Projects — Production Work', category: 'Navigation', icon: Layers, action: () => scrollTo('projects') },
    { id: 'skills', label: 'Skills — Technologies & Tooling', category: 'Navigation', icon: Code2, action: () => scrollTo('skills') },
    { id: 'contact', label: 'Contact — Get in Touch', category: 'Navigation', icon: Mail, action: () => scrollTo('contact') },
  ];

  // Dedicated project direct page items
  const projectItems = PROJECTS.flatMap((p) => [
    {
      id: `case-study-${p.slug}`,
      label: `Case Study: ${p.title} (/project/${p.slug})`,
      category: 'Case Studies',
      icon: ArrowRight,
      action: () => {
        handleClose();
        navigate(`/project/${p.slug}`);
      },
    },
    {
      id: `preview-${p.slug}`,
      label: `Quick Preview: ${p.title} (${p.tags.slice(0, 2).join(', ')})`,
      category: 'Quick Previews',
      icon: Layers,
      action: () => {
        handleClose();
        onSelectProject?.(p);
      },
    },
  ]);

  const actionItems = [
    {
      id: 'copy-email',
      label: copied ? 'Email Copied to Clipboard!' : `Copy Email (${PROFILE.email})`,
      category: 'Quick Actions',
      icon: copied ? Check : Copy,
      action: copyEmail,
    },
    {
      id: 'download-resume',
      label: 'Download Resume PDF',
      category: 'Quick Actions',
      icon: Download,
      action: () => {
        handleClose();
        const a = document.createElement('a');
        a.href = '/Belal_Waheed_Resume.pdf';
        a.download = 'Belal_Waheed_Resume.pdf';
        a.click();
      },
    },
    {
      id: 'view-resume',
      label: 'View Interactive Resume (/resume)',
      category: 'Quick Actions',
      icon: FileText,
      action: () => {
        handleClose();
        if (onOpenResume) {
          onOpenResume();
        } else {
          navigate('/resume');
        }
      },
    },
    {
      id: 'github',
      label: 'Open GitHub Profile (BelalWaheed)',
      category: 'Social & External',
      icon: Github,
      action: () => {
        handleClose();
        window.open('https://github.com/BelalWaheed', '_blank');
      },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Social & External',
      icon: Linkedin,
      action: () => {
        handleClose();
        window.open('https://www.linkedin.com/in/belalwhaeed', '_blank');
      },
    },
  ];

  const allItems = [...navItems, ...projectItems, ...actionItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/75 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden text-zinc-100"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-zinc-950/60">
              <Search size={18} className="text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                dir="auto"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, project, or section..."
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none font-sans"
              />
              <button
                onClick={handleClose}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'text-zinc-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon size={15} className={isSelected ? 'text-emerald-400' : 'text-zinc-400'} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-2">
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer keyboard shortcuts */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 bg-zinc-950/40 text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-emerald-500/80">Command Menu</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
