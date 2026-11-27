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
    const undoTilt = tilt(ctx.root, 2.5);
    const undoHeadings = revealHeadings(ctx);
    return () => {
      undoTilt();
      undoHeadings();
    };
  });

  return (
    <section ref={ref} id="projects" className="relative px-6 py-28 md:px-12 md:py-40 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="03"
          label="Work"
          description="Projects spanning agentic AI, backend APIs, machine learning and data engineering."
        >
          Selected <em className="serif-accent">work.</em>
        </SectionHeading>

        <div data-reveal-group className="grid gap-5 [perspective:1400px]">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-reveal
              data-tilt
              onPointerMove={trackSpotlight}
              className="group card relative overflow-hidden transition-colors duration-500 hover:border-cream/20"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative grid gap-6 p-7 md:grid-cols-12 md:gap-10 md:p-10">
                <div className="flex items-baseline gap-4 md:col-span-2 md:flex-col md:gap-2">
                  <span className="text-4xl font-light leading-none tracking-[-0.04em] text-cream/25 transition-colors duration-500 group-hover:text-saffron md:text-5xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {project.year && <span className="label">{project.year}</span>}
                </div>

                <div className="md:col-span-10">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-2xl font-normal tracking-[-0.03em] text-cream sm:text-[1.75rem]">
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
                      className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-cream group-hover:bg-cream group-hover:text-ink-950"
                    >
                      <ArrowUpRightIcon width={16} height={16} />
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-cream/55">{project.description}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tech.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <span className="label inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-cream/80">
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
