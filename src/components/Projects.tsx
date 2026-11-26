'use client';

import { useRef } from 'react';
import { revealGroups, revealHeadings, tilt, useAnime } from '@/lib/motion';
import type { Project } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { ArrowUpRightIcon, GitHubIcon } from './icons';

interface ProjectsProps {
  projects: Project[];
}

function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

export function Projects({ projects }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  useAnime(ref, (ctx) => {
    revealGroups(ctx);
    const undoTilt = tilt(ctx.root, 3);
    const undoHeadings = revealHeadings(ctx);
    return () => {
      undoTilt();
      undoHeadings();
    };
  });

  return (
    <section
      ref={ref}
      id="projects"
      className="relative px-6 py-28 md:py-36 section"
      style={{ '--accent': '129 140 248' } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="03"
          label="Work"
          description="Projects spanning agentic AI, backend APIs, machine learning and data engineering."
        >
          Selected <span className="text-gradient">work</span>
        </SectionHeading>

        <div data-reveal-group className="grid gap-5 [perspective:1400px]">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-reveal
              data-tilt
              onPointerMove={trackSpotlight}
              className="group glass relative overflow-hidden rounded-2xl transition-colors duration-500 hover:border-white/15"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative grid gap-6 p-7 md:grid-cols-12 md:gap-10 md:p-9">
                <div className="flex items-baseline gap-4 font-mono text-xs text-slate-500 md:col-span-2 md:flex-col md:gap-2">
                  <span className="text-[rgb(var(--accent))]">{String(index + 1).padStart(2, '0')}</span>
                  {project.year && <span>{project.year}</span>}
                </div>

                <div className="md:col-span-10">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.title}
                      </a>
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 flex-shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    >
                      <ArrowUpRightIcon width={20} height={20} />
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">{project.description}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tech.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
                      <GitHubIcon width={14} height={14} />
                      View source
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
