'use client';

import { useRef } from 'react';
import { animate, stagger } from 'animejs';
import { revealGroups, useAnime } from '@/lib/motion';
import { EDUCATION, STATS } from '@/lib/site';
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
        delay: stagger(25, { start: 300 }),
        ease: 'outQuad',
        autoplay: false,
      });
      ctx.inView(chips, () => anim.play());
    }
  });

  return (
    <section ref={ref} id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="01" label="About">
          Building backend systems that make <span className="text-gradient">AI useful</span>
        </SectionHeading>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div data-reveal-group className="space-y-5 lg:col-span-6">
            <p data-reveal className="text-base leading-relaxed text-slate-300 sm:text-lg">
              I&apos;m a final-year B.Tech student in Artificial Intelligence and Data Science with strong backend and
              Python experience. I build REST APIs, FastAPI applications, cloud-based solutions and AI-powered systems
              that bring multiple services together.
            </p>
            <p data-reveal className="text-base leading-relaxed text-slate-400 sm:text-lg">
              I work with Docker, PostgreSQL, AWS and Azure, and I&apos;m most interested in scalable backend systems,
              enterprise integrations and automation, from AI pricing engines to agentic RAG pipelines.
            </p>

            <dl data-reveal className="grid grid-cols-3 divide-x divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-5 sm:px-6">
                  <dt className="text-xs text-slate-500">{stat.label}</dt>
                  <dd
                    data-count={stat.value}
                    data-decimals={stat.decimals}
                    data-suffix={stat.suffix}
                    className="mt-1 font-display text-3xl font-semibold text-white"
                  >
                    {formatStat(stat.value, stat.decimals, stat.suffix)}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-reveal className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <span className="icon-btn flex-shrink-0">
                <CapIcon />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{EDUCATION.school}</p>
                <p className="mt-0.5 text-sm text-slate-400">{EDUCATION.degree}</p>
                <p className="mt-2 font-mono text-xs text-slate-500">
                  {EDUCATION.period} · {EDUCATION.grade}
                </p>
              </div>
            </div>
          </div>

          <div data-reveal-group className="lg:col-span-6">
            <div data-reveal data-skills className="glass divide-y divide-white/[0.06] rounded-2xl">
              {skills.map((group) => (
                <div key={group.category} className="grid gap-3 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <h3 className="pt-1 text-sm font-medium text-white">{group.category}</h3>
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
    </section>
  );
}
