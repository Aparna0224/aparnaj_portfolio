'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { useAnime } from '@/lib/motion';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useAnime(ref, () => {
    animate('[data-reveal]', {
      opacity: [0, 1],
      y: [-16, 0],
      delay: stagger(80, { start: 1400 }),
      duration: 900,
      ease: 'outExpo',
    });
  });

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-white/10 bg-space-950/60 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a data-reveal href="#home" className="group flex items-center gap-2 font-display text-lg font-semibold text-white">
          <span className="text-cyan-300 transition-transform duration-500 group-hover:rotate-90">✦</span>
          Aparna
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <li key={link.href} data-reveal>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-slate-400 transition-colors duration-300 hover:bg-white/5 hover:text-white sm:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
