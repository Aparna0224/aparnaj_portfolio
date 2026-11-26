'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { animate, createTimeline, splitText, stagger, utils } from 'animejs';
import { useAnime } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, ({ root }) => {
    const name = root.querySelector<HTMLElement>('[data-hero-name]')!;
    const split = splitText(name, { chars: true });
    utils.set(name, { opacity: 1 });
    utils.set(split.chars, { opacity: 0 });

    createTimeline({ defaults: { ease: 'outExpo', duration: 1100 } })
      .add('[data-hero="badge"]', { opacity: [0, 1], y: [12, 0] }, 150)
      .add(split.chars, { opacity: [0, 1], y: ['0.5em', 0], filter: ['blur(8px)', 'blur(0px)'], delay: stagger(40) }, 300)
      .add('[data-hero="text"]', { opacity: [0, 1], y: [20, 0], delay: stagger(100) }, '-=800')
      .add('[data-hero="photo"]', { opacity: [0, 1], scale: [0.92, 1], duration: 1600 }, 400)
      .add('[data-hero="scroll"]', { opacity: [0, 0.6] }, '-=600');

    animate('[data-orbit]', { rotate: 360, duration: 40000, ease: 'linear', loop: true });
    animate('[data-halo]', { opacity: [0.5, 0.9], scale: [0.95, 1.05], duration: 5000, ease: 'inOutSine', loop: true, alternate: true });
    animate('[data-pulse]', { scale: [1, 2.4], opacity: [0.6, 0], duration: 1800, ease: 'outQuad', loop: true });
    animate('[data-scroll-dot]', { y: [0, 10], opacity: [1, 0], duration: 1600, ease: 'inOutQuad', loop: true });

    return () => split.revert();
  });

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div data-reveal data-hero="badge" className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span data-pulse className="absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{SITE.location}</span>
            </div>

            <h1 className="mt-7 font-display text-6xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              <span data-reveal data-hero-name className="split-chars">
                Aparna J
              </span>
            </h1>

            <p data-reveal data-hero="text" className="mt-4 font-display text-xl text-gradient sm:text-2xl">
              {SITE.role}
            </p>

            <p data-reveal data-hero="text" className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Final-year AI &amp; Data Science student building scalable backend systems, REST APIs and AI-powered
              applications with Python, FastAPI and the cloud. Most recently an AI Intern at Ford Motor Company.
            </p>

            <div data-reveal data-hero="text" className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">
                View my work
                <ArrowUpRightIcon width={16} height={16} />
              </a>
              <a href="#contact" className="btn-ghost">
                Contact me
              </a>
              <span className="mx-2 hidden h-6 w-px bg-white/10 sm:block" />
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                <GitHubIcon />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:col-span-5 md:justify-end">
            <div data-reveal data-hero="photo" className="relative h-64 w-64 sm:h-80 sm:w-80">
              <div data-halo className="absolute -inset-12 rounded-full bg-violet-600/20 blur-3xl" />
              <div data-orbit className="absolute -inset-7 rounded-full border border-white/[0.07]">
                <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_3px_rgba(165,243,252,0.5)]" />
                <span className="absolute -left-[3px] top-1/3 h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_10px_2px_rgba(196,181,253,0.5)]" />
              </div>
              <div className="relative h-full w-full rounded-full border border-white/15 p-1.5">
                <Image
                  src="/images/aparnaj.jpg"
                  alt="Portrait of Aparna J"
                  width={384}
                  height={384}
                  priority
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-reveal
        data-hero="scroll"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <span data-scroll-dot className="h-1.5 w-1 rounded-full bg-white" />
        </span>
      </a>
    </section>
  );
}
