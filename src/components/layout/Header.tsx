import { Button } from "@/components/ui";
import { NAV_ITEMS } from "@/data/constants";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FileText, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

interface HeaderProps {
  onOpenCommand?: () => void;
  onOpenResume?: () => void;
}

export function Header({ onOpenCommand, onOpenResume }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 80], [0, 20]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Smart bi-directional scroll detection
  useEffect(() => {
    const handleScrollState = () => {
      const currentScrollY = window.scrollY;
      
      // Always show near the top
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide
        if (!isMobileMenuOpen) setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> show smoothly
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollState, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollState);
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommand?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommand]);

  // Section observer with threshold calculation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "skills", "projects", "about"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection("#home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#home" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        const yOffset = -70;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-3 transition-transform duration-300 ease-out"
      style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <motion.div
        className="absolute inset-0 -z-10 border-b"
        style={{
          opacity: headerBg,
          backgroundColor: "rgba(9, 9, 11, 0.88)",
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      />

      <div className="container mx-auto px-5 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo & Available Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group cursor-pointer flex items-center gap-2 text-left"
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:border-emerald-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BW
              </motion.div>
              <div className="flex flex-col">
                <span className="text-zinc-100 font-display font-bold text-sm sm:text-base tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
                  Belal Waheed
                </span>
                <span className="text-[10px] font-mono text-zinc-500 leading-tight">
                  Full-Stack Dev
                </span>
              </div>
            </button>

            {/* Live Availability Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-white/5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeSection === item.href
                    ? "text-emerald-400 font-semibold bg-emerald-500/10"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Actions (Command Search, Resume, Contact CTA) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Spotlight Trigger */}
            <button
              onClick={onOpenCommand}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-zinc-200 text-xs transition-all cursor-pointer"
              title="Open Command Menu (Ctrl+K)"
            >
              <Search size={13} />
              <span className="text-[11px] text-zinc-500 font-mono">⌘K</span>
            </button>

            {/* Resume Button */}
            {onOpenResume ? (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <FileText size={13} className="text-emerald-400" />
                <span>CV</span>
              </button>
            ) : (
              <Link
                to="/resume"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <FileText size={13} className="text-emerald-400" />
                <span>CV</span>
              </Link>
            )}

            {/* Let's Talk CTA */}
            <Button size="sm" onClick={() => handleNavClick("#contact")}>
              Let's Talk
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCommand}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300"
              aria-label="Quick Search (Command Menu)"
            >
              <Search size={16} />
            </button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200 cursor-pointer"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="md:hidden mt-3 relative z-50"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 space-y-2 rounded-2xl bg-zinc-900/98 border border-white/10 shadow-2xl backdrop-blur-xl">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        activeSection === item.href
                          ? "bg-emerald-500/15 text-emerald-400 font-semibold"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.03 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <div className="pt-3 mt-2 border-t border-white/10 space-y-2">
                    <Link
                      to="/resume"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-zinc-200 text-sm font-medium border border-white/10"
                    >
                      <FileText size={15} className="text-emerald-400" />
                      View Interactive Resume
                    </Link>

                    <Button
                      className="w-full"
                      onClick={() => handleNavClick("#contact")}
                    >
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
