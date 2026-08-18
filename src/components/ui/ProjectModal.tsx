import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { X, ExternalLink, Github, ShieldCheck, Cpu, ChevronLeft, ChevronRight, Check, Play, Image as ImageIcon, ArrowRight, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui';
import { ImageLightbox } from '@/components/ui/ImageLightbox';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <ProjectModalContent key={project.id} project={project} onClose={onClose} />
  );
}

function ProjectModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState<'images' | 'video'>(
    project.videoUrl ? 'video' : 'images'
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) return; // Lightbox handles its own keys
      if (e.key === 'Escape') onClose();
      if (project?.images && project.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : project.images!.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveImgIndex((prev) => (prev < project.images!.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, project, isLightboxOpen]);

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto studio-card bg-zinc-900 border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl my-auto text-zinc-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Close Button */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Quick Architecture Preview
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-zinc-400">{project.category}</span>
              </div>
              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 mt-1">
                {project.title}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 border border-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Metrics Ribbon */}
          {project.detailedMetrics && project.detailedMetrics.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {project.detailedMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-base sm:text-lg font-bold font-display text-emerald-400">{m.value}</div>
                  <div className="text-xs text-zinc-400 font-sans leading-tight mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          ) : project.metrics && project.metrics.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-xs text-zinc-300 font-sans leading-tight">{m}</div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Segmented Media Mode Switcher (if video available) */}
          {project.videoUrl && (
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setActiveMediaTab('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeMediaTab === 'video'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                <Play size={13} className={activeMediaTab === 'video' ? 'fill-emerald-400' : ''} />
                Video Demo
              </button>
              <button
                onClick={() => setActiveMediaTab('images')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeMediaTab === 'images'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                <ImageIcon size={14} />
                Screenshots ({images.length} Captures)
              </button>
            </div>
          )}

          {/* Media Frame */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-6 bg-zinc-950 group">
            {activeMediaTab === 'video' && project.videoUrl ? (
              <video
                poster={project.image}
                preload="none"
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                {project.videoWebmUrl && <source src={project.videoWebmUrl} type="video/webm" />}
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <picture>
                  {project.imagesMobile && project.imagesMobile[activeImgIndex] && (
                    <source media="(max-width: 640px)" srcSet={project.imagesMobile[activeImgIndex]} type="image/webp" />
                  )}
                  <img
                    src={images[activeImgIndex]}
                    alt={`${project.title} capture ${activeImgIndex + 1}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </picture>

                {/* Floating Fullscreen / Expand Badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-lg hover:bg-black/90 transition-colors">
                  <Maximize2 size={13} className="text-emerald-400" />
                  <span>Tap to expand</span>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/15 hover:scale-105 transition-transform cursor-pointer shadow-lg z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/15 hover:scale-105 transition-transform cursor-pointer shadow-lg z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 z-10">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex(i);
                          }}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            i === activeImgIndex ? 'bg-emerald-400 w-5' : 'bg-zinc-600 w-2 hover:bg-zinc-400'
                          }`}
                          aria-label={`Go to capture ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2.5 py-1 text-xs font-mono bg-zinc-800/80 border-white/5 text-zinc-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Grid Sections: Architecture & Features */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            
            {/* Architecture Details */}
            {project.architecture && (
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-3">
                <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-sm">
                  <Cpu size={16} className="text-emerald-400" />
                  Engineering Architecture
                </h3>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {project.architecture.map((arch, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-mono shrink-0">›</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Engineering Features */}
            {project.features && (
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-3">
                <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-sm">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Core Capabilities
                </h3>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {project.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <Link
              to={`/project/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <span>Read Full Case Study</span>
              <ArrowRight size={16} />
            </Link>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-xs font-medium text-zinc-200 transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-xs font-medium text-emerald-400 transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile & Desktop Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        images={images}
        imagesMobile={project.imagesMobile}
        activeIndex={activeImgIndex}
        title={project.title}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setActiveImgIndex}
      />
    </>
  );
}

export default ProjectModal;
