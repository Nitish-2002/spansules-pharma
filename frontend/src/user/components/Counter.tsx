'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

/** Number that counts up the first time it scrolls into view. */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, prefersReducedMotion]);

  // With reduced motion the final figure is shown straight away.
  const shown = prefersReducedMotion ? value : current;

  return (
    <span ref={ref} className={`u-numeral ${className}`}>
      {prefix}
      {Math.round(shown)}
      {suffix}
    </span>
  );
}
