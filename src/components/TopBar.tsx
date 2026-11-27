'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { magnetic, motionEnabled, useAnime } from '@/lib/motion';
import { SECTIONS, SITE } from '@/lib/site';
import { GitHubIcon, LinkedInIcon } from './icons';

function chennaiTime() {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
}

export function TopBar() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Mobile menu: lock page scroll, close on Esc or when the screen grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    const menu = menuRef.current;
    if (menu && motionEnabled()) {
      animate(menu, { opacity: [0, 1], duration: 400, ease: 'outQuad' });
      animate(menu.querySelectorAll('[data-menu-item]'), {
        opacity: [0, 1],
        y: [28, 0],
        delay: stagger(60, { start: 80 }),
        duration: 800,
        ease: 'outExpo',
      });
    }

    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        scrolled && !menuOpen ? 'bg-ink-950/60 backdrop-blur-xl' : ''
      }`}
    >
      <div className="relative z-10 mx-auto flex h-16 items-center justify-between px-5 sm:px-6 md:h-20 md:px-12">
        <a
          data-reveal
          href="#home"
          onClick={closeMenu}
          className="-mx-2 px-2 py-2.5 text-[17px] font-medium tracking-[-0.03em] text-cream"
        >
          aparna<span className="text-saffron">.</span>
        </a>

        <p data-reveal className="label hidden items-center gap-2.5 md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span data-live-dot className="absolute inset-0 rounded-full bg-saffron" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-saffron" />
          </span>
          Open to opportunities
        </p>

        <div className="flex items-center gap-2 sm:gap-4">
          <span data-reveal className="label hidden tabular-nums lg:inline" suppressHydrationWarning>
            Chennai {time ?? '--:--'}
          </span>
          <a data-reveal data-magnetic href="#contact" onClick={closeMenu} className="btn-primary min-h-11 px-4 py-2.5 sm:px-5">
            Get in touch
          </a>
          <button
            data-reveal
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-cream/15 lg:hidden"
          >
            <span
              className={`h-px w-4 bg-cream transition-transform duration-300 ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-4 bg-cream transition-transform duration-300 ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 flex flex-col bg-ink-950/95 px-5 pb-10 pt-24 backdrop-blur-xl sm:px-6 md:px-12 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex-1">
            <ol className="divide-y divide-cream/[0.08] border-y border-cream/[0.08]">
              {SECTIONS.map((s, i) => (
                <li key={s.id} data-menu-item>
                  <a href={`#${s.id}`} onClick={closeMenu} className="flex items-baseline gap-4 py-4">
                    <span className="font-mono text-xs text-saffron">{String(i).padStart(2, '0')}</span>
                    <span className="text-[clamp(1.75rem,8vw,2.75rem)] leading-none tracking-[-0.04em] text-cream">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div data-menu-item className="mt-8 flex items-center justify-between gap-4">
            <span className="label">
              {SITE.location} · {time ?? '--:--'}
            </span>
            <div className="flex gap-2">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn h-11 w-11">
                <GitHubIcon />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn h-11 w-11">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
