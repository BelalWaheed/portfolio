import { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Layers, ShieldCheck, Cpu, ChevronLeft, ChevronRight, Check, Play, Image as ImageIcon } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [onClose, project]);

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl p-6 sm:p-8 text-zinc-100 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer border border-white/5"
          aria-label="Close modal (Escape)"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6 pr-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono">
              Engineering Case Study
            </Badge>
            {project.liveUrl && (
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live in Production
              </span>
            )}
          </div>
          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
            {project.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{project.description}</p>
        </div>

        {/* Media Tab Controls (if video available) */}
        {project.videoUrl && (
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setActiveMediaTab('video')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeMediaTab === 'video'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              <Play size={14} />
              Interactive Video Demo
            </button>
            <button
              onClick={() => setActiveMediaTab('images')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeMediaTab === 'images'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              <ImageIcon size={14} />
              Screenshots ({images.length} Captures)
            </button>
          </div>
        )}

        {/* Media Frame */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-6 bg-zinc-950">
          {activeMediaTab === 'video' && project.videoUrl ? (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <>
              <img
                src={images[activeImgIndex]}
                alt={`${project.title} capture ${activeImgIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 hover:scale-105 transition-transform cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 hover:scale-105 transition-transform cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImgIndex(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === activeImgIndex ? 'bg-emerald-400 w-5' : 'bg-zinc-600 w-2 hover:bg-zinc-400'
                        }`}
                        aria-label={`Go to capture ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
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
                <span>System Architecture</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Features */}
          {project.features && (
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/20 space-y-3">
              <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-sm">
                <Layers size={16} className="text-amber-400" />
                <span>Key Platform Features</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {project.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Engineering Challenges Solved */}
        {project.challenges && (
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2.5 mb-6">
            <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-sm">
              <ShieldCheck size={16} className="text-cyan-400" />
              <span>Engineering Challenges Solved</span>
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          {project.liveUrl && (
            <Button asChild size="lg" className="flex-1">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> Open Live Web App
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="lg" asChild className="flex-1">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> View Source Code
              </a>
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
