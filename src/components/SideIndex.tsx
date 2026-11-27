'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { useAnime } from '@/lib/motion';
import { SECTIONS } from '@/lib/site';

/** Fixed numbered index on the right edge; the current section shows its name. */
export function SideIndex() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useAnime(ref, () => {
    animate('[data-reveal]', {
      opacity: [0, 1],
      x: [16, 0],
      delay: stagger(70, { start: 900 }),
      duration: 900,
      ease: 'outExpo',
    });
  });

  return (
    <nav ref={ref} aria-label="Sections" className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ol className="flex flex-col items-end gap-3.5">
        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} data-reveal>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.12em]"
              >
                <span
                  className={`uppercase transition-all duration-500 ${
                    isActive ? 'translate-x-0 text-cream opacity-100' : 'translate-x-2 text-cream/50 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  {s.label}
                </span>
                <span className={`tabular-nums transition-colors duration-300 ${isActive ? 'text-cream' : 'text-cream/35'}`}>
                  {String(i).padStart(2, '0')}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    isActive ? 'scale-100 bg-saffron shadow-[0_0_10px_2px_rgba(242,140,40,0.5)]' : 'scale-75 bg-cream/30'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
