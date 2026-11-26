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

    // The timeline draws itself downward as it scrolls into view.
    const line = ctx.root.querySelector('[data-timeline-line]');
    if (line) {
      const anim = animate(line, { scaleY: [0, 1], duration: 1800, ease: 'inOutQuart', autoplay: false });
      ctx.inView(line, () => anim.play());
    }

    // Each milestone dot pops in with a spring as its role arrives.
    ctx.root.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
      const anim = animate(dot, { scale: [0, 1], ease: spring({ bounce: 0.55, duration: 700 }), delay: 250, autoplay: false });
      ctx.inView(dot, () => anim.play());
    });

    return revealHeadings(ctx);
  });

  return (
    <section ref={ref} id="experience" className="section-band relative px-6 py-28 md:px-12 md:py-40 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="02"
          label="Experience"
          description="Three internships across enterprise AI, data pipelines and cloud web platforms."
        >
          Where I&apos;ve <em className="serif-accent">shipped.</em>
        </SectionHeading>

        <div className="relative">
          <span
            data-timeline-line
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-saffron/70 via-cream/15 to-transparent md:left-[calc(25%+7px)]"
          />

          <ol data-reveal-group className="space-y-14">
            {EXPERIENCE.map((job) => (
              <li key={job.company} data-reveal className="relative grid gap-3 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
                <div className="md:pr-10 md:pt-1.5 md:text-right">
                  <p className="font-mono text-xs text-cream/70">{job.period}</p>
                  <p className="label mt-1.5">{job.location}</p>
                </div>

                <span
                  data-dot
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-saffron/70 bg-ink-950 md:left-[25%]"
                >
                  <span className="absolute inset-[4px] rounded-full bg-saffron" />
                </span>

                <div className="md:col-span-3 md:pl-10">
                  <h3 className="text-2xl font-normal tracking-[-0.025em] text-cream">
                    {job.role} <span className="text-cream/30">/</span>{' '}
                    <span className="font-serif italic text-saffron-300">{job.company}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-cream/60">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-shrink-0 bg-cream/30" />
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
