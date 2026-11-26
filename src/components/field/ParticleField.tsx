'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { motionEnabled } from '@/lib/motion';

const Z_NEAR = 1.1;
const Z_FAR = 9;
const CAMERA_HEIGHT = 1.5;
// Pre-built fill styles (alpha 0..1 in 24 steps) so the draw loop never builds strings.
const FILLS = Array.from({ length: 25 }, (_, i) => `rgba(245,150,52,${(i / 24).toFixed(3)})`);

/**
 * A field of saffron particles rolling like wind over a crop field. Rendered on
 * a fixed canvas; the cursor lifts nearby particles and anime.js drives the
 * intro swell.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animated = motionEnabled();
    const swell = { amp: animated ? 0 : 1, fade: animated ? 0 : 1 };
    const intro = animated
      ? animate(swell, { amp: 1, fade: 1, duration: 2800, delay: 150, ease: 'outCubic' })
      : null;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let frame = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const dust: { x: number; y: number; v: number; r: number; a: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = width < 768;
      cols = small ? 90 : 170;
      rows = small ? 46 : 70;
      dust.length = 0;
      for (let i = 0; i < (small ? 35 : 80); i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          v: 0.08 + Math.random() * 0.3,
          r: Math.random() * 1.1 + 0.3,
          a: Math.random() * 0.35 + 0.1,
        });
      }
    };

    const draw = (time: number) => {
      const t = animated ? time * 0.001 : 0;
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;

      ctx.clearRect(0, 0, width, height);
      // Far rows sit just below the top third, near rows sweep past the bottom.
      const horizon = height * 0.2;
      const depthScale = height * 0.72;
      const focal = Math.min(width, height * 1.6) * 0.9;
      const spread = 7.5;

      for (let j = 0; j < rows; j++) {
        const z = Z_FAR - (j / (rows - 1)) * (Z_FAR - Z_NEAR);
        const nearness = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR);
        for (let i = 0; i < cols; i++) {
          const x = (i / (cols - 1) - 0.5) * spread * 2;
          const y =
            swell.amp *
            (0.34 * Math.sin(x * 0.75 + t * 0.9 + z * 0.35) +
              0.22 * Math.sin(z * 1.15 - t * 0.7 + x * 0.2) +
              0.1 * Math.sin((x - z) * 2.1 + t * 1.6));

          const sx = width / 2 + (x / z) * focal;
          if (sx < -4 || sx > width + 4) continue;
          let sy = horizon + ((CAMERA_HEIGHT - y) / z) * depthScale;
          if (sy > height + 4) continue;

          let alpha = (0.2 + nearness ** 1.2 * 0.8) * (0.6 + y * 0.85) * swell.fade;
          const d = Math.hypot(sx - pointer.x, sy - pointer.y);
          if (d < 170) {
            const lift = (1 - d / 170) ** 2;
            sy -= lift * 30 * (0.4 + nearness);
            alpha += lift * 0.4;
          }

          const size = Math.max(0.6, Math.min(2.6, 2.4 / z + nearness * 0.6));
          ctx.fillStyle = FILLS[Math.max(0, Math.min(24, Math.round(alpha * 24)))];
          ctx.fillRect(sx, sy, size, size);
        }
      }

      // Pollen drifting up through the air.
      for (const p of dust) {
        if (animated) {
          p.y -= p.v;
          p.x += Math.sin(t * 0.6 + p.y * 0.01) * 0.15;
          if (p.y < -5) {
            p.y = height + 5;
            p.x = Math.random() * width;
          }
        }
        ctx.fillStyle = `rgba(247,200,140,${(p.a * swell.fade).toFixed(3)})`;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }

      // Dim the field once the visitor scrolls past the intro so text stays readable.
      canvas.style.opacity = String(1 - Math.min(window.scrollY / height, 1) * 0.6);

      if (animated) frame = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onScroll = () => {
      if (!animated) draw(0);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (animated) {
      window.addEventListener('pointermove', onPointer);
      document.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      intro?.revert();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0806_0%,#0a0806_18%,#1c1007_48%,#0a0806_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
