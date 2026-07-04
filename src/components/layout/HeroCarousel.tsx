'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSlide } from '@/types/content';
import { DURATIONS } from '@/lib/animations';
import { cn } from '@/lib/cn';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, DURATIONS.heroSlideInterval);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--color-ink)]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.backgroundImage}
              alt={slide.headline}
              fill
              priority={index === 0}
              className={cn(
                'object-cover origin-center transition-transform duration-[6000ms] ease-out',
                index === currentSlide ? 'scale-105' : 'scale-100'
              )}
              sizes="100vw"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col justify-center">
            <div className={cn(
              'max-w-3xl transform transition-all duration-1000 delay-300',
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-[0.2em] mb-4 block">
                {slide.subheadline}
              </span>
              <h1 className="text-display-mobile md:text-display text-white mb-8 leading-tight">
                {slide.headline}
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about/"
                  className="bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] px-8 py-4 rounded-[4px] text-label-caps font-bold transition-colors hover:bg-white"
                >
                  Learn More
                </Link>
                <Link
                  href="/programs/"
                  className="border border-white text-white px-8 py-4 rounded-[4px] text-label-caps font-bold transition-colors hover:bg-white/10"
                >
                  Our Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-12 h-1 rounded-full transition-all duration-300',
              index === currentSlide ? 'bg-[var(--color-primary-fixed)]' : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
