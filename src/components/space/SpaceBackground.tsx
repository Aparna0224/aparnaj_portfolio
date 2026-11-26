'use client';

import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';
import { motionEnabled, useAnime } from '@/lib/motion';
import { Starfield } from './Starfield';

/** Fixed galaxy backdrop: nebula clouds, starfield and occasional shooting stars. */
export function SpaceBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const meteorLayer = useRef<HTMLDivElement>(null);

  // Slowly drifting nebula clouds.
  useAnime(rootRef, () => {
    animate('[data-nebula]', {
      x: () => utils.random(-120, 120),
      y: () => utils.random(-90, 90),
      scale: () => utils.random(0.85, 1.25, 2),
      rotate: () => utils.random(-25, 25),
      duration: () => utils.random(14000, 22000),
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });
  });

  // Shooting stars at random intervals.
  useEffect(() => {
    const layer = meteorLayer.current;
    if (!layer || !motionEnabled()) return;
    let timeout: ReturnType<typeof setTimeout>;

    const launch = () => {
      const wrap = document.createElement('div');
      wrap.className = 'absolute';
      wrap.style.left = `${utils.random(20, 100)}%`;
      wrap.style.top = `${utils.random(-5, 45)}%`;
      wrap.style.transform = `rotate(${utils.random(145, 160)}deg)`;

      const trail = document.createElement('div');
      trail.className = 'h-px w-32 rounded-full bg-gradient-to-r from-white via-cyan-200/70 to-transparent';
      wrap.appendChild(trail);
      layer.appendChild(wrap);

      animate(trail, {
        x: [0, utils.random(500, 900)],
        opacity: [{ from: 0, to: 1, duration: 200 }, { to: 0, duration: 900 }],
        scaleX: [0.3, 1],
        ease: 'outQuad',
        duration: 1100,
        onComplete: () => wrap.remove(),
      });

      timeout = setTimeout(launch, utils.random(2500, 7000));
    };

    timeout = setTimeout(launch, 1800);
    return () => {
      clearTimeout(timeout);
      layer.replaceChildren();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0e1233_0%,#03040d_60%)]" />
      <div data-nebula className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-violet-700/25 blur-[120px]" />
      <div data-nebula className="absolute right-[-15%] top-[30%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-700/15 blur-[120px]" />
      <div data-nebula className="absolute bottom-[-20%] left-[20%] h-[36rem] w-[36rem] rounded-full bg-cyan-600/15 blur-[130px]" />
      <Starfield />
      <div ref={meteorLayer} className="absolute inset-0" />
    </div>
  );
}
