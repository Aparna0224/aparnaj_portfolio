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
    const undoTilt = tilt(ctx.root, 5);
    const undoHeadings = revealHeadings(ctx);
    return () => {
      undoTilt();
      undoHeadings();
    };
  });

  return (
    <section ref={ref} id="achievements" className="section-band relative px-6 py-28 md:px-12 md:py-40 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="04" label="Recognition">
          Wins, training &amp; <em className="serif-accent">certifications.</em>
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-12">
          <ul data-reveal-group className="grid gap-5 [perspective:1200px] sm:grid-cols-3 lg:col-span-8 lg:grid-cols-1 xl:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <li key={item.title} data-reveal data-tilt className="card flex flex-col p-6">
                <span data-draw className="icon-btn text-saffron-300">
                  <TrophyIcon />
                </span>
                <h3 className="mt-6 text-lg font-normal leading-snug tracking-[-0.02em] text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{item.detail}</p>
              </li>
            ))}
          </ul>

          <div data-reveal-group className="lg:col-span-4">
            <div data-reveal className="card h-full p-6">
              <h3 data-draw className="label flex items-center gap-2 text-cream/70">
                <BadgeIcon width={15} height={15} className="text-saffron-300" />
                Certifications &amp; training
              </h3>
              <ul className="mt-5 divide-y divide-cream/[0.07]">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert} className="py-3 text-sm leading-relaxed text-cream/70 first:pt-0">
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
