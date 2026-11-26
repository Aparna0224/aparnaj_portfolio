'use client';

import { useEffect, useRef } from 'react';
import { createAnimatable } from 'animejs';
import { finePointer, motionEnabled } from '@/lib/motion';

const INTERACTIVE = 'a, button, input, textarea, label, [data-tilt]';

/** A saffron ring that trails the cursor and opens up over interactive elements. */
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || !motionEnabled() || !finePointer()) return;

    const r = createAnimatable(ring, { x: 450, y: 450, scale: 350, opacity: 300, ease: 'out(3)' });
    const d = createAnimatable(dot, { x: 60, y: 60, opacity: 200, ease: 'out(2)' });

    const onMove = (e: PointerEvent) => {
      r.x(e.clientX - 16);
      r.y(e.clientY - 16);
      d.x(e.clientX - 2);
      d.y(e.clientY - 2);
      r.opacity(1);
      d.opacity(1);
      const overInteractive = (e.target as Element | null)?.closest?.(INTERACTIVE);
      r.scale(overInteractive ? 1.7 : 1);
    };
    const onLeave = () => {
      r.opacity(0);
      d.opacity(0);
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      r.revert();
      d.revert();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60]">
      <div ref={ringRef} className="absolute h-8 w-8 rounded-full border border-saffron/70 opacity-0" />
      <div ref={dotRef} className="absolute h-1 w-1 rounded-full bg-saffron opacity-0" />
    </div>
  );
}
