'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, DURATIONS.heroSlideInterval);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate offset from center (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const renderHeadline = (text: string) => {
    const highlights = [
      'Young Minds',
      'Bright Futures',
      'Brighter Future',
      'Lives',
      'Compassion',
      'Humanity',
      'Better Tomorrow'
    ];
    
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
    const parts: (string | React.ReactNode)[] = [text];
    
    sortedHighlights.forEach((phrase) => {
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (typeof part === 'string') {
          const index = part.toLowerCase().indexOf(phrase.toLowerCase());
          if (index !== -1) {
            const before = part.substring(0, index);
            const match = part.substring(index, index + phrase.length);
            const after = part.substring(index + phrase.length);
            
            parts.splice(
              i, 
              1, 
              before, 
              <span 
                key={phrase} 
                className="italic font-display text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-fixed-dim)] to-[var(--color-accent-terracotta)]"
              >
                {match}
              </span>, 
              after
            );
            i += 2;
          }
        }
      }
    });
    
    return parts;
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--color-ink)]"
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {/* Background Image Container (Handles Mouse Parallax) */}
            <div 
              className="absolute inset-0 z-0 scale-105"
              style={{
                transform: isActive 
                  ? `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` 
                  : 'translate(0, 0)',
                transition: isActive ? 'transform 0.3s ease-out' : 'transform 1s ease-in-out',
              }}
            >
              {/* Image itself (Handles Ken Burns Continuous Zoom) */}
              <div className={cn(
                'relative w-full h-full object-cover origin-center',
                isActive ? 'ken-burns-active' : ''
              )}>
                <Image
                  src={slide.backgroundImage}
                  alt={slide.headline}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              {/* Gradients Overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* Content Container (Handles opposite Mouse Parallax) */}
            <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col justify-center">
              <div 
                className={cn(
                  'max-w-3xl transform transition-all duration-1000 delay-300',
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
                style={{
                  transform: isActive 
                    ? `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` 
                    : 'translate(0, 0)',
                  transition: isActive ? 'transform 0.3s ease-out' : 'transform 1s ease-in-out',
                }}
              >
                <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-[0.2em] mb-4 block font-bold">
                  {slide.subheadline}
                </span>
                <h1 className="text-display-mobile md:text-display text-white mb-8 leading-tight drop-shadow-md">
                  {renderHeadline(slide.headline)}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/about/"
                    className="bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] px-8 py-4 rounded-[4px] text-label-caps font-bold transition-all hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/programs/"
                    className="border border-white text-white px-8 py-4 rounded-[4px] text-label-caps font-bold transition-all hover:bg-white/10 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Our Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-12 h-1.5 rounded-full transition-all duration-300',
              index === currentSlide ? 'bg-[var(--color-primary-fixed)] w-16' : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pulsing Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none opacity-60">
        <span className="text-white text-[9px] uppercase tracking-[0.25em] font-semibold">
          Scroll Down
        </span>
        <div className="w-[18px] h-[30px] rounded-full border border-white/40 flex justify-center p-1">
          <div className="w-[2.5px] h-[5px] rounded-full bg-white/80 animate-scroll-dot" />
        </div>
      </div>

      {/* Local CSS Animations */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06) translate(-0.5%, -0.2%);
          }
          100% {
            transform: scale(1);
          }
        }
        .ken-burns-active {
          animation: kenburns 24s ease-in-out infinite;
        }

        @keyframes scrollDot {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            transform: translateY(11px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }
        .animate-scroll-dot {
          animation: scrollDot 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
