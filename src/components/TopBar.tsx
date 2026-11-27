'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { magnetic, useAnime } from '@/lib/motion';
import { SITE } from '@/lib/site';

function chennaiTime() {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
}

export function TopBar() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => setTime(chennaiTime());
    tick();
    const id = setInterval(tick, 30_000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useAnime(ref, ({ root }) => {
    animate('[data-reveal]', {
      opacity: [0, 1],
      y: [-12, 0],
      delay: stagger(80, { start: 200 }),
      duration: 900,
      ease: 'outExpo',
    });
    animate('[data-live-dot]', { scale: [1, 2.6], opacity: [0.7, 0], duration: 1800, ease: 'outQuad', loop: true });
    return magnetic(root, 0.25);
  });

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        scrolled ? 'bg-ink-950/60 backdrop-blur-xl' : ''
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6 md:h-20 md:px-12">
        <a data-reveal href="#home" className="text-[17px] font-medium tracking-[-0.03em] text-cream">
          aparna<span className="text-saffron">.</span>
        </a>

        <p data-reveal className="label hidden items-center gap-2.5 md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span data-live-dot className="absolute inset-0 rounded-full bg-saffron" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-saffron" />
          </span>
          Open to opportunities
        </p>

        <div className="flex items-center gap-5">
          <span data-reveal className="label hidden tabular-nums lg:inline" suppressHydrationWarning>
            Chennai {time ?? '--:--'}
          </span>
          <a data-reveal data-magnetic href="#contact" className="btn-primary px-5 py-2.5">
            Get in touch
          </a>
        </div>
      </div>
      <span className="sr-only">{SITE.role}</span>
    </header>
  );
}
