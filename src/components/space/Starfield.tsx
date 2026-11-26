'use client';

import { useEffect, useRef } from 'react';
import { motionEnabled } from '@/lib/motion';

interface Star {
  x: number;
  y: number;
  depth: number;
  r: number;
  phase: number;
  speed: number;
  color: string;
}

const COLORS = ['255,255,255', '221,214,254', '207,250,254', '251,207,232'];

/** Canvas starfield with twinkle, mouse parallax and scroll drift. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animated = motionEnabled();
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 2600);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() ** 2 * 0.9 + 0.1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          r: depth * 1.4 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (time: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const x = (((s.x + pointer.x * s.depth * 24) % width) + width) % width;
        const y = (((s.y + pointer.y * s.depth * 24 - scroll * s.depth * 0.12) % height) + height) % height;
        const twinkle = animated ? 0.55 + 0.45 * Math.sin(time * 0.001 * s.speed + s.phase) : 0.8;
        ctx.fillStyle = `rgba(${s.color},${(twinkle * (0.35 + s.depth * 0.65)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (animated) frame = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / width - 0.5) * 2;
      pointer.ty = (e.clientY / height - 0.5) * 2;
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    if (animated) window.addEventListener('pointermove', onPointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
