'use client';

import { useRef } from 'react';
import { animate } from 'animejs';
import { useAnime } from '@/lib/motion';

interface PlanetProps {
  className?: string;
  /** Tailwind gradient stops for the sphere, e.g. "from-violet-400 to-indigo-900". */
  tone?: string;
  ring?: boolean;
}

/** Decorative floating planet with an optional tilted ring. */
export function Planet({ className = '', tone = 'from-violet-300 via-violet-600 to-indigo-950', ring = true }: PlanetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useAnime(ref, ({ root }) => {
    animate(root, {
      y: [-14, 14],
      rotate: [-4, 4],
      duration: 6000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });
  });

  return (
    <div ref={ref} className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${tone} shadow-[inset_-18px_-18px_40px_rgba(0,0,0,0.65),0_0_60px_-10px_rgba(167,139,250,0.5)]`} />
        {ring && (
          <div className="absolute left-1/2 top-1/2 h-[38%] w-[175%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border-2 border-violet-200/30" />
        )}
      </div>
    </div>
  );
}
