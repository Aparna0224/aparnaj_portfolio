'use client';

import { useEffect, type RefObject } from 'react';
import { animate, createScope, stagger } from 'animejs';

/** True when the browser supports animation and the user hasn't asked for reduced motion. */
export function motionEnabled() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

type InView = (target: Element, onEnter: () => void) => void;

export interface AnimeContext {
  root: HTMLElement;
  inView: InView;
}

/**
 * Runs anime.js setup code inside a scope bound to `root`, so every animation
 * it creates is reverted on unmount. `inView` fires once when an element
 * scrolls into the viewport.
 */
export function useAnime<T extends HTMLElement>(
  root: RefObject<T | null>,
  setup: (ctx: AnimeContext) => void | (() => void),
) {
  useEffect(() => {
    const el = root.current;
    if (!el || !motionEnabled()) return;

    const observers: IntersectionObserver[] = [];
    const inView: InView = (target, onEnter) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            onEnter();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(target);
      observers.push(io);
    };

    const scope = createScope({ root }).add(() => setup({ root: el, inView }));

    return () => {
      observers.forEach((io) => io.disconnect());
      scope.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Fades, lifts and un-blurs every `[data-reveal]` inside each `[data-reveal-group]` as it scrolls into view. */
export function revealGroups({ root, inView }: AnimeContext) {
  root.querySelectorAll('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    const anim = animate(items, {
      opacity: [0, 1],
      y: [36, 0],
      filter: ['blur(6px)', 'blur(0px)'],
      duration: 1100,
      delay: stagger(90),
      ease: 'outExpo',
      autoplay: false,
    });
    inView(group, () => anim.play());
  });
}
