'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { useAnime } from '@/lib/motion';
import { NAV_LINKS } from '@/lib/site';

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Highlight the section currently in the middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useAnime(ref, () => {
    animate('[data-reveal]', {
      opacity: [0, 1],
      y: [-12, 0],
      delay: stagger(70, { start: 1200 }),
      duration: 900,
      ease: 'outExpo',
    });
  });

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled ? 'border-white/[0.06] bg-space-950/70 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a data-reveal href="#home" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-xs">AJ</span>
          Aparna J
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} data-reveal>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === link.id ? 'bg-white/[0.06] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a data-reveal href="#contact" className="btn-primary ml-2 px-4 py-2">
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
