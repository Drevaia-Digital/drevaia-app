import { useEffect } from 'react';

export function GlowCursor() {
  useEffect(() => {
    const glow = document.getElementById('glow-cursor');

    const move = (e: MouseEvent) => {
      if (!glow) return;
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      id="glow-cursor"
      className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
    />
  );
}