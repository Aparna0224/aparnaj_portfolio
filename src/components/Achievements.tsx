'use client';

import { useRef } from 'react';
import { drawIcons, revealGroups, revealHeadings, tilt, useAnime } from '@/lib/motion';
import { ACHIEVEMENTS, CERTIFICATIONS } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { BadgeIcon, TrophyIcon } from './icons';

export function Achievements() {
  const ref = useRef<HTMLElement>(null);
  useAnime(ref, (ctx) => {
    revealGroups(ctx);
    drawIcons(ctx);
    const undoTilt = tilt(ctx.root, 6);
    const undoHeadings = revealHeadings(ctx);
    return () => {
      undoTilt();
      undoHeadings();
    };
  });

  return (
    <section
      ref={ref}
      id="achievements"
      className="relative px-6 py-28 md:py-36 section section-band"
      style={{ '--accent': '252 211 77' } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="04" label="Recognition">
          Achievements &amp; <span className="text-gradient">certifications</span>
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-12">
          <ul data-reveal-group className="grid gap-5 [perspective:1200px] sm:grid-cols-3 lg:col-span-8 lg:grid-cols-1 xl:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <li key={item.title} data-reveal data-tilt className="glass flex flex-col rounded-2xl p-6">
                <span data-draw className="icon-btn text-[rgb(var(--accent))]">
                  <TrophyIcon />
                </span>
                <h3 className="mt-5 font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
              </li>
            ))}
          </ul>

          <div data-reveal-group className="lg:col-span-4">
            <div data-reveal className="glass h-full rounded-2xl p-6">
              <h3 data-draw className="flex items-center gap-2 text-sm font-medium text-white">
                <BadgeIcon width={16} height={16} className="text-cyan-200" />
                Certifications &amp; training
              </h3>
              <ul className="mt-5 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-cyan-200/70" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
