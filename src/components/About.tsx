'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { animate, stagger } from 'animejs';
import { drawIcons, revealGroups, revealHeadings, useAnime } from '@/lib/motion';
import { EDUCATION, SITE, STATS } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { CapIcon } from './icons';

interface SkillGroup {
  category: string;
  items: string[];
}

interface AboutProps {
  skills: SkillGroup[];
}

const formatStat = (value: number, decimals = 0, suffix = '') => `${value.toFixed(decimals)}${suffix}`;

export function About({ skills }: AboutProps) {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, (ctx) => {
    revealGroups(ctx);
    drawIcons(ctx);

    ctx.root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const decimals = Number(el.dataset.decimals ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const counter = { value: 0 };
      el.textContent = formatStat(0, decimals, suffix);
      const anim = animate(counter, {
        value: Number(el.dataset.count),
        duration: 1800,
        ease: 'outExpo',
        autoplay: false,
        onUpdate: () => {
          el.textContent = formatStat(counter.value, decimals, suffix);
        },
      });
      ctx.inView(el, () => anim.play());
    });

    const chips = ctx.root.querySelector('[data-skills]');
    if (chips) {
      const anim = animate(chips.querySelectorAll('[data-chip]'), {
        opacity: [0, 1],
        y: [8, 0],
        duration: 600,
        delay: stagger(22, { start: 300 }),
        ease: 'outQuad',
        autoplay: false,
      });
      ctx.inView(chips, () => anim.play());
    }

    // Portrait settles from a slight zoom as it enters.
    const portrait = ctx.root.querySelector('[data-portrait]');
    if (portrait) {
      const anim = animate(portrait, { scale: [1.12, 1], duration: 1800, ease: 'outExpo', autoplay: false });
      ctx.inView(portrait, () => anim.play());
    }

    return revealHeadings(ctx);
  });

  return (
    <section ref={ref} id="about" className="relative px-5 py-28 sm:px-6 md:px-12 md:py-40 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="01" label="About">
          From research questions <br className="hidden md:block" />
          to <em className="serif-accent">production APIs.</em>
        </SectionHeading>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div data-reveal-group className="lg:col-span-4">
            <figure data-reveal className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[28px] border border-cream/10">
                <Image
                  data-portrait
                  src="/images/aparnaj.jpg"
                  alt="Portrait of Aparna J"
                  width={520}
                  height={650}
                  className="aspect-[4/5] w-full object-cover [filter:sepia(0.18)_saturate(0.9)_contrast(1.05)]"
                />
              </div>
              <figcaption className="label mt-4 flex justify-between">
                <span>{SITE.name}</span>
                <span>13.08° N, 80.27° E</span>
              </figcaption>
            </figure>
          </div>

          <div className="space-y-12 lg:col-span-8">
            <div data-reveal-group className="space-y-5">
              <p data-reveal className="text-lg leading-relaxed text-cream/80 md:text-xl">
                I&apos;m a final-year B.Tech student in Artificial Intelligence and Data Science with strong backend and
                Python experience. I build REST APIs, FastAPI applications, cloud-based solutions and AI-powered systems
                that bring multiple services together.
              </p>
              <p data-reveal className="text-[15px] leading-relaxed text-cream/55 md:text-base">
                I work with Docker, PostgreSQL, AWS and Azure, and I&apos;m most interested in scalable backend systems,
                enterprise integrations and automation, from AI pricing engines to agentic RAG pipelines.
              </p>

              <dl data-reveal className="grid grid-cols-3 gap-4 border-y border-cream/10 py-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <dd
                      data-count={stat.value}
                      data-decimals={stat.decimals}
                      data-suffix={stat.suffix}
                      className="text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-none tracking-[-0.04em] text-cream tabular-nums"
                    >
                      {formatStat(stat.value, stat.decimals, stat.suffix)}
                    </dd>
                    <dt className="label mt-3 tracking-[0.12em] sm:tracking-[0.22em]">{stat.label}</dt>
                  </div>
                ))}
              </dl>

              <div data-reveal className="flex gap-4 py-2">
                <span data-draw className="icon-btn flex-shrink-0 text-saffron-300">
                  <CapIcon />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-cream">{EDUCATION.school}</p>
                  <p className="mt-0.5 text-sm text-cream/55">{EDUCATION.degree}</p>
                  <p className="label mt-2">
                    {EDUCATION.period} · {EDUCATION.grade}
                  </p>
                </div>
              </div>
            </div>

            <div data-reveal-group>
              <p data-reveal className="label mb-5">
                Toolkit
              </p>
              <div data-reveal data-skills className="card divide-y divide-cream/[0.07]">
                {skills.map((group) => (
                  <div key={group.category} className="grid gap-3 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <h3 className="pt-0.5 text-sm font-medium text-cream">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span key={skill} data-chip className="chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
