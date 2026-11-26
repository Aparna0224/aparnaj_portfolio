'use client';

import { useEffect, type RefObject } from 'react';
import { animate, createAnimatable, createScope, splitText, stagger, svg, utils } from 'animejs';

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

/** True on devices with a precise pointer (mouse/trackpad), where hover effects make sense. */
export function finePointer() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
}

/**
 * Splits each `[data-heading]` into words and slides them up from behind a
 * mask when the heading scrolls into view.
 */
export function revealHeadings({ root, inView }: AnimeContext) {
  const splits: { revert: () => void }[] = [];
  root.querySelectorAll<HTMLElement>('[data-heading]').forEach((heading) => {
    const split = splitText(heading, { words: { wrap: 'clip', class: 'word' } });
    splits.push(split);
    utils.set(heading, { opacity: 1 });
    utils.set(split.words, { y: '110%' });
    const anim = animate(split.words, {
      y: ['110%', '0%'],
      duration: 1100,
      delay: stagger(70),
      ease: 'outExpo',
      autoplay: false,
    });
    inView(heading, () => anim.play());
  });
  return () => splits.forEach((s) => s.revert());
}

/** Elements marked `[data-magnetic]` drift toward the cursor and spring back on leave. */
export function magnetic(root: HTMLElement, strength = 0.35) {
  if (!finePointer()) return () => {};
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const pull = createAnimatable(el, { x: 400, y: 400, ease: 'out(3)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pull.x((e.clientX - r.left - r.width / 2) * strength);
      pull.y((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => {
      pull.x(0, 900, 'outElastic(1, .4)');
      pull.y(0, 900, 'outElastic(1, .4)');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Elements marked `[data-tilt]` tilt in 3D toward the cursor. */
export function tilt(root: HTMLElement, maxDeg = 5) {
  if (!finePointer()) return () => {};
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const t = createAnimatable(el, { rotateX: 500, rotateY: 500, ease: 'out(3)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      t.rotateY(px * maxDeg * 2);
      t.rotateX(-py * maxDeg * 2);
    };
    const leave = () => {
      t.rotateX(0, 1000, 'outElastic(1, .5)');
      t.rotateY(0, 1000, 'outElastic(1, .5)');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Draws the strokes of every SVG inside `[data-draw]` when it scrolls into view. */
export function drawIcons({ root, inView }: AnimeContext) {
  root.querySelectorAll('[data-draw]').forEach((wrap) => {
    const shapes = wrap.querySelectorAll<SVGGeometryElement>('path, circle, rect, line, polyline');
    if (!shapes.length) return;
    const drawables = svg.createDrawable(shapes);
    utils.set(drawables, { draw: '0 0' });
    const anim = animate(drawables, {
      draw: ['0 0', '0 1'],
      duration: 1400,
      delay: stagger(120, { start: 300 }),
      ease: 'inOutQuad',
      autoplay: false,
    });
    inView(wrap, () => anim.play());
  });
}
