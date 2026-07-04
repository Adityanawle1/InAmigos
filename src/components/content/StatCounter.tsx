'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { OBSERVER_OPTIONS, DURATIONS } from '@/lib/animations';

interface StatCounterProps {
  target: number;
  label: string;
  description: string;
}

export default function StatCounter({ target, label, description }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasCounted, setHasCounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { suffix, formattedFinal } = useMemo(() => {
    if (target >= 1000000) {
      return { suffix: 'M+', formattedFinal: (target / 1000000).toFixed(2) + 'M+' };
    }
    if (target >= 1000) {
      return { suffix: 'K+', formattedFinal: Math.floor(target / 1000) + 'K+' };
    }
    return { suffix: '+', formattedFinal: target.toLocaleString('en-IN') + '+' };
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasCounted) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          observer.unobserve(entry.target);

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplayValue(formattedFinal);
            return;
          }

          let startTimestamp: number | null = null;
          const duration = DURATIONS.counterAnimation;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeProgress * target);
            setDisplayValue(current.toLocaleString('en-IN') + '+');
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(formattedFinal);
            }
          };

          requestAnimationFrame(step);
        }
      });
    }, OBSERVER_OPTIONS);

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasCounted, formattedFinal]);

  return (
    <div ref={ref} className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <div
        className="text-impact-number"
        style={{ color: 'var(--color-primary-fixed)' }}
        role="text"
        aria-label={`${formattedFinal} ${label}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {displayValue}
      </div>
      <h3
        className="text-label-caps mt-2 tracking-widest text-white"
      >
        {label}
      </h3>
      <p
        className="mt-4 leading-relaxed text-body-md"
        style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}
      >
        {description}
      </p>
    </div>
  );
}
