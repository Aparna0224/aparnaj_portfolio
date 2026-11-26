'use client';

import { useRef } from 'react';
import { revealGroups, useAnime } from '@/lib/motion';
import { SectionHeading } from './SectionHeading';

interface Project {
  title: string;
  tech: string[];
  description: string;
  year: string;
  link: string;
}

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
  useAnime(ref, revealGroups);

  return (
    <section ref={ref} id="projects" className="relative flex min-h-screen items-center px-6 py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="02"
          label="Work"
          description="A few missions I've launched — from flood prediction to AI-powered hiring tools."
        >
          Featured <span className="text-gradient">missions</span>
        </SectionHeading>

        <div data-reveal-group className="grid gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-reveal
              onPointerMove={trackSpotlight}
              className="group glass relative overflow-hidden rounded-3xl p-8 transition-colors duration-500 hover:border-violet-300/30 md:p-10"
            >
              <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative space-y-5">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
                  <span className="text-cyan-300">Mission {String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  <span className="text-slate-500">{project.year}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-violet-100 md:text-3xl">
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
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-violet-300/50 group-hover:text-white"
                  >
                    →
                  </span>
                </div>

                <p className="max-w-3xl leading-relaxed text-slate-400">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
