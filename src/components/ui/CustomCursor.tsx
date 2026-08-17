import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(pointer: fine)').matches;
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a, button, [data-cursor="hover"], .studio-card, input, textarea, select');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Emerald Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.9), 0 0 20px rgba(16, 185, 129, 0.4)',
        }}
      />

      {/* Atmospheric Outer Ring */}
      <div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-emerald-500/40 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 2.2 : 1})`,
          background: isHovered ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.3)',
        }}
      />
    </>
  );
}
