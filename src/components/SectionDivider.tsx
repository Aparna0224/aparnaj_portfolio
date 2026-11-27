'use client';

import { useRef } from 'react';
import { animate, spring } from 'animejs';
import { useAnime } from '@/lib/motion';

/** Thin line with a star at its centre that draws itself between two sections. */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useAnime(ref, ({ root, inView }) => {
    const line = animate(root.querySelectorAll('[data-divider-line]'), {
      scaleX: [0, 1],
      duration: 1400,
      ease: 'inOutExpo',
      autoplay: false,
    });
    const star = animate(root.querySelector('[data-divider-star]')!, {
      opacity: [0, 1],
      scale: [0, 1],
      rotate: [-180, 0],
      ease: spring({ bounce: 0.5, duration: 900 }),
      delay: 500,
      autoplay: false,
    });
    inView(root, () => {
      line.play();
      star.play();
    });
  });

  return (
    <div ref={ref} aria-hidden="true" className="mx-auto flex max-w-6xl items-center gap-4 px-5 sm:px-6 md:px-12 lg:pr-36">
      <span data-divider-line className="h-px flex-1 origin-right bg-gradient-to-l from-cream/20 to-transparent" />
      <span data-divider-star className="text-xs text-saffron">
        ✦
      </span>
      <span data-divider-line className="h-px flex-1 origin-left bg-gradient-to-r from-cream/20 to-transparent" />
    </div>
  );
}
