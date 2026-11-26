'use client';

import { useRef } from 'react';
import { createTimeline, splitText, stagger, utils } from 'animejs';
import { magnetic, useAnime } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from './icons';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, ({ root }) => {
    const title = root.querySelector<HTMLElement>('[data-hero-title]')!;
    const split = splitText(title, { words: { wrap: 'clip', class: 'word' } });
    utils.set(title, { opacity: 1 });
    utils.set(split.words, { y: '110%' });

    createTimeline({ defaults: { ease: 'outExpo', duration: 1300 } })
      .add('[data-hero="ghost"]', { opacity: [0, 1], y: [60, 0], duration: 2200 }, 0)
      .add('[data-hero="eyebrow"]', { opacity: [0, 1], y: [16, 0] }, 450)
      .add(split.words, { y: ['110%', '0%'], delay: stagger(70) }, 550)
      .add('[data-hero="side"]', { opacity: [0, 1], y: [24, 0], delay: stagger(110) }, 900);

    const undoMagnetic = magnetic(root);
    return () => {
      split.revert();
      undoMagnetic();
    };
  });

  return (
    <section ref={ref} id="home" className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden px-6 md:px-12">
      <span
        data-reveal
        data-hero="ghost"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3.5vw] -left-[1.5vw] select-none text-[27vw] font-medium leading-[0.8] tracking-[-0.07em] text-cream/[0.045]"
      >
        aparna
      </span>

      <div className="flex-1" />

      <div className="relative grid gap-10 pb-16 md:grid-cols-12 md:items-end md:pb-20 lg:pr-24">
        <div className="md:col-span-8">
          <p data-reveal data-hero="eyebrow" className="label flex items-center gap-3">
            <span className="whitespace-nowrap text-saffron">[ 00 ]</span>
            <span className="hidden sm:inline">{SITE.name} —</span>
            {SITE.role}
          </p>
          <h1
            data-reveal
            data-hero-title
            className="mt-6 text-[clamp(2.75rem,7.2vw,6.75rem)] font-normal leading-[0.95] tracking-[-0.045em] text-cream"
          >
            <span className="block md:whitespace-nowrap">Backend systems</span>
            <span className="block md:whitespace-nowrap">
              that make <em className="serif-accent pr-2">AI useful.</em>
            </span>
          </h1>
        </div>

        <div className="space-y-7 md:col-span-4">
          <p data-reveal data-hero="side" className="max-w-sm text-[15px] leading-relaxed text-cream/60">
            Final-year AI &amp; Data Science student in {SITE.location.split(',')[0]}. I build REST APIs, FastAPI services
            and AI-powered systems, most recently as an AI Intern at Ford Motor Company.
          </p>
          <div data-reveal data-hero="side" className="flex flex-wrap items-center gap-3">
            <a href="#projects" data-magnetic className="btn-primary">
              View my work
              <ArrowUpRightIcon width={16} height={16} />
            </a>
            <a href="#contact" data-magnetic className="btn-ghost">
              Contact me
            </a>
          </div>
          <div data-reveal data-hero="side" className="flex items-center gap-3">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-magnetic className="icon-btn">
              <GitHubIcon />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-magnetic className="icon-btn">
              <LinkedInIcon />
            </a>
            <span className="label ml-2">{SITE.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
