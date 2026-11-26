'use client';

import { useRef } from 'react';
import { animate, stagger } from 'animejs';
import { revealGroups, useAnime } from '@/lib/motion';
import { SectionHeading } from './SectionHeading';
import { Planet } from './space/Planet';

interface SkillGroup {
  category: string;
  items: string[];
}

interface AboutProps {
  skills: SkillGroup[];
}

const STATS = [
  { value: 5, label: 'Projects' },
  { value: 10, label: 'Technologies' },
  { value: 2, label: 'Years' },
];

export function About({ skills }: AboutProps) {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, (ctx) => {
    revealGroups(ctx);

    // Count the stats up from zero.
    ctx.root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      const counter = { value: 0 };
      el.textContent = '0+';
      const anim = animate(counter, {
        value: target,
        duration: 1800,
        ease: 'outExpo',
        autoplay: false,
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}+`;
        },
      });
      ctx.inView(el, () => anim.play());
    });

    // Skill chips pop in like stars lighting up.
    ctx.root.querySelectorAll('[data-skill-group]').forEach((group) => {
      const anim = animate(group.querySelectorAll('[data-chip]'), {
        opacity: [0, 1],
        scale: [0.4, 1],
        duration: 700,
        delay: stagger(45, { start: 250 }),
        ease: 'outBack(1.7)',
        autoplay: false,
      });
      ctx.inView(group, () => anim.play());
    });
  });

  return (
    <section ref={ref} id="about" className="relative flex min-h-screen items-center px-6 py-28">
      <Planet className="right-[6%] top-16 hidden h-28 w-28 lg:block" />

      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="01" label="About">
          Exploring the <span className="text-gradient">universe of AI</span>
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal-group className="space-y-6">
            <p data-reveal className="text-lg leading-relaxed text-slate-300">
              My fascination with artificial intelligence began with a simple question: how can we make machines learn
              and adapt? This curiosity led me down a path of exploring neural networks, training models, and building
              intelligent systems.
            </p>
            <p data-reveal className="text-lg leading-relaxed text-slate-300">
              I specialize in developing machine learning solutions using Python, PyTorch, and TensorFlow. My work
              spans from computer vision projects to natural language processing applications. Beyond ML, I have strong
              backend development skills and enjoy creating full-stack applications with React.
            </p>
            <p data-reveal className="text-lg leading-relaxed text-slate-300">
              When I&apos;m not training models or debugging code, I&apos;m probably exploring new research papers or
              experimenting with emerging AI technologies.
            </p>

            <div data-reveal className="grid grid-cols-3 gap-4 pt-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5 text-center">
                  <div data-count={stat.value} className="font-display text-3xl font-semibold text-gradient">
                    {stat.value}+
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal-group className="space-y-5">
            {skills.map((group) => (
              <div
                key={group.category}
                data-reveal
                data-skill-group
                className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-violet-300/30"
              >
                <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-violet-200">
                  <span className="text-cyan-300">✦</span>
                  {group.category}
                </h3>
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
    </section>
  );
}
