'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { animate, createTimeline, splitText, stagger, utils } from 'animejs';
import { useAnime } from '@/lib/motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useAnime(ref, ({ root }) => {
    const name = root.querySelector<HTMLElement>('[data-hero-name]')!;
    const split = splitText(name, { chars: true });
    utils.set(name, { opacity: 1 });
    utils.set(split.chars, { opacity: 0 });

    createTimeline({ defaults: { ease: 'outExpo', duration: 1200 } })
      .add('[data-hero="eyebrow"]', { opacity: [0, 1], x: [-24, 0] }, 200)
      .add(
        split.chars,
        {
          opacity: [0, 1],
          y: [90, 0],
          rotate: () => [utils.random(-40, 40), 0],
          filter: ['blur(12px)', 'blur(0px)'],
          delay: stagger(60),
        },
        350,
      )
      .add('[data-hero="j"]', { opacity: [0, 1], scale: [0, 1], rotate: [-180, 0], ease: 'outElastic(1, .6)', duration: 1600 }, '-=900')
      .add('[data-hero="text"]', { opacity: [0, 1], y: [24, 0], delay: stagger(120) }, '-=1300')
      .add('[data-hero="photo"]', { opacity: [0, 1], scale: [0.6, 1], duration: 1600 }, 500)
      .add('[data-hero="scroll"]', { opacity: [0, 0.7] }, '-=600');

    // Orbiting moons around the portrait.
    animate('[data-orbit="slow"]', { rotate: 360, duration: 26000, ease: 'linear', loop: true });
    animate('[data-orbit="fast"]', { rotate: -360, duration: 16000, ease: 'linear', loop: true });

    // Pulsing halo behind the portrait.
    animate('[data-halo]', { scale: [0.92, 1.08], opacity: [0.6, 1], duration: 4000, ease: 'inOutSine', loop: true, alternate: true });

    // Scroll cue.
    animate('[data-scroll-dot]', { y: [0, 12], opacity: [1, 0], duration: 1600, ease: 'inOutQuad', loop: true });

    return () => split.revert();
  });

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <div className="space-y-8 md:col-span-7">
            <p data-reveal data-hero="eyebrow" className="eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-300/50" />
              Developer &amp; AI Enthusiast
            </p>

            <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
              <span data-reveal data-hero-name className="split-chars">
                APARNA
              </span>{' '}
              <span data-reveal data-hero="j" className="text-gradient inline-block">
                J
              </span>
            </h1>

            <p data-reveal data-hero="text" className="max-w-xl text-lg leading-relaxed text-slate-400">
              Building intelligent systems through machine learning and deep learning. I work at the intersection of
              artificial intelligence and practical applications, creating solutions that make a difference.
            </p>

            <div data-reveal data-hero="text" className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary">
                View Projects
                <span aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="btn-ghost">
                Contact Me
              </a>
            </div>
          </div>

          <div className="flex justify-center md:col-span-5 md:justify-end">
            <div data-reveal data-hero="photo" className="relative h-64 w-64 sm:h-80 sm:w-80">
              <div data-halo className="absolute -inset-10 rounded-full bg-violet-600/30 blur-3xl" />

              <div data-orbit="slow" className="absolute -inset-8 rounded-full border border-white/10">
                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(103,232,249,0.6)]" />
              </div>
              <div data-orbit="fast" className="absolute -inset-16 rounded-full border border-dashed border-white/[0.07]">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_14px_4px_rgba(240,171,252,0.55)]" />
              </div>

              <div className="relative h-full w-full rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 p-[2px]">
                <Image
                  src="/images/aparnaj.jpg"
                  alt="Aparna J"
                  width={384}
                  height={384}
                  priority
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-reveal
        data-hero="scroll"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <span data-scroll-dot className="h-2 w-1 rounded-full bg-white" />
        </span>
      </a>
    </section>
  );
}
