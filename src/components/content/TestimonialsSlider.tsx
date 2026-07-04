'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Through the support of InAmigos and Project Udaan, our self-help group in Bilaspur received sewing machines and vocational training. Today, twelve women in our village are running their own tailoring setups and are completely self-reliant.",
    author: "Rajeshwari Sahu",
    role: "Beneficiary, Project Udaan",
    location: "Bilaspur, Chhattisgarh",
  },
  {
    quote: "Partnering with InAmigos for our annual CSR initiative was seamless. Their compliance with CSR-1, 80G tax exemptions, and prompt transparency in reporting the planting of 5,000+ saplings under Project Prakriti made them an outstanding partner.",
    author: "Devendra Singh",
    role: "CSR Director, Nexus Corp",
    location: "Mumbai, Maharashtra",
  },
  {
    quote: "Volunteering with Project BachpanShala has changed my outlook on education. Teaching basic digital literacy to kids who had never seen a tablet before and seeing their eyes light up was the most rewarding experience of my life.",
    author: "Anjali Sharma",
    role: "Field Volunteer & Intern",
    location: "Raipur, Chhattisgarh",
  },
];

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      {/* Testimonials Wrapper */}
      <div className="grid grid-cols-1 relative w-full items-center justify-center">
        {TESTIMONIALS.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`col-start-1 row-start-1 w-full text-center transition-all duration-700 ease-in-out transform ${
                isActive
                  ? 'opacity-100 translate-x-0 scale-100 z-10'
                  : 'opacity-0 translate-x-12 scale-95 pointer-events-none z-0'
              }`}
            >
              <span className="material-symbols-outlined text-[var(--color-accent-terracotta)] text-[48px] opacity-35 block mb-2" aria-hidden="true">
                format_quote
              </span>
              <p className="text-lg md:text-xl text-[var(--color-primary)] font-serif italic mb-6 leading-relaxed max-w-3xl mx-auto px-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4">
                <h4 className="font-bold text-[var(--color-ink)] text-body-lg">
                  {testimonial.author}
                </h4>
                <p className="text-label-caps text-[var(--color-stone)] mt-1">
                  {testimonial.role} &bull; {testimonial.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Slide Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-[var(--color-outline-variant)] text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all focus:outline-none"
          aria-label="Previous testimonial"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-[var(--color-primary)] scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-[var(--color-outline-variant)] text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all focus:outline-none"
          aria-label="Next testimonial"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
