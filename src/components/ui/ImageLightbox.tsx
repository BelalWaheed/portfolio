import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

export interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  imagesMobile?: string[];
  activeIndex: number;
  title: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  imagesMobile,
  activeIndex,
  title,
  onClose,
  onIndexChange,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    setIsZoomed(false);
    onClose();
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          onIndexChange((activeIndex - 1 + images.length) % images.length);
        } else if (e.key === 'ArrowRight') {
          onIndexChange((activeIndex + 1) % images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length, handleClose, onIndexChange]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diffX > minSwipeDistance && images.length > 1) {
      // Swiped Left -> Next image
      onIndexChange((activeIndex + 1) % images.length);
    } else if (diffX < -minSwipeDistance && images.length > 1) {
      // Swiped Right -> Previous image
      onIndexChange((activeIndex - 1 + images.length) % images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen) return null;

  const currentImage = images[activeIndex];
  const currentMobileImage = imagesMobile && imagesMobile[activeIndex] ? imagesMobile[activeIndex] : undefined;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl select-none"
        onClick={handleClose}
      >
        {/* Top Control Bar */}
        <div
          className="relative z-10 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
              Capture {activeIndex + 1} of {images.length}
            </span>
            <span className="text-zinc-200 text-sm sm:text-base font-bold truncate max-w-[200px] sm:max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-3 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/10 hover:bg-zinc-800 transition-colors cursor-pointer"
              title={isZoomed ? "Fit to Screen" : "Fill Viewport"}
              aria-label="Toggle Zoom"
            >
              {isZoomed ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/10 hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Lightbox (Escape)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Main Image Canvas */}
        <div
          className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={() => onIndexChange((activeIndex - 1 + images.length) % images.length)}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/15 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Screenshot Display */}
          <div className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ${isZoomed ? 'scale-110 sm:scale-125' : 'scale-100'}`}>
            <picture>
              {currentMobileImage && (
                <source media="(max-width: 640px)" srcSet={currentMobileImage} type="image/webp" />
              )}
              <img
                src={currentImage}
                alt={`${title} capture ${activeIndex + 1}`}
                className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </picture>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={() => onIndexChange((activeIndex + 1) % images.length)}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/15 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip & Mobile Swipe Hint */}
        <div
          className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {images.length > 1 ? (
            <div className="flex items-center gap-2 sm:gap-3 max-w-full overflow-x-auto px-2 py-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onIndexChange(idx)}
                  className={`relative w-16 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeIndex === idx
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105 opacity-100'
                      : 'border-white/10 opacity-50 hover:opacity-90'
                  }`}
                  aria-label={`Jump to screenshot ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          ) : null}

          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="sm:hidden">Swipe left/right to browse captures</span>
            <span className="hidden sm:inline">Use Left/Right arrow keys to navigate • Escape to close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
