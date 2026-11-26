'use client';

import { useRef } from 'react';
import { animate, spring } from 'animejs';
import { revealGroups, revealHeadings, useAnime } from '@/lib/motion';
import { EXPERIENCE } from '@/lib/site';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, (ctx) => {
    revealGroups(ctx);

    // Draw the timeline line downward as it scrolls into view.
    const line = ctx.root.querySelector('[data-timeline-line]');
    if (line) {
      const anim = animate(line, { scaleY: [0, 1], duration: 1800, ease: 'inOutQuart', autoplay: false });
      ctx.inView(line, () => anim.play());
    }

    // Each milestone dot pops in with a spring as its role scrolls into view.
    ctx.root.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
      const anim = animate(dot, { scale: [0, 1], ease: spring({ bounce: 0.55, duration: 700 }), delay: 250, autoplay: false });
      ctx.inView(dot, () => anim.play());
    });

    return revealHeadings(ctx);
  });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative px-6 py-28 md:py-36 section section-band"
      style={{ '--accent': '103 232 249' } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="02" label="Experience">
          Where I&apos;ve <span className="text-gradient">worked</span>
        </SectionHeading>

        <div className="relative">
          <span
            data-timeline-line
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-[rgb(var(--accent)/0.6)] via-white/15 to-transparent md:left-[calc(25%+7px)]"
          />

          <ol data-reveal-group className="space-y-12">
            {EXPERIENCE.map((job) => (
              <li key={job.company} data-reveal className="relative grid gap-3 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
                <div className="md:pr-10 md:pt-1 md:text-right">
                  <p className="font-mono text-xs text-slate-400">{job.period}</p>
                  <p className="mt-1 text-xs text-slate-500">{job.location}</p>
                </div>

                <span
                  data-dot
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-[rgb(var(--accent)/0.6)] bg-space-950 md:left-[calc(25%)]"
                >
                  <span className="absolute inset-[4px] rounded-full bg-[rgb(var(--accent))]" />
                </span>

                <div className="md:col-span-3 md:pl-10">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {job.role} <span className="text-slate-500">·</span>{' '}
                    <span className="text-gradient">{job.company}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-slate-400">
                        <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 flex-shrink-0 rounded-full bg-slate-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
