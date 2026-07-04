'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeUp from '@/components/feedback/FadeUp';
import { GalleryImage } from '@/types/content';

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close, Next, Prev functions
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  // Keyboard Navigation & Scroll Lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* CSS Grid for masonry approximation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[minmax(350px,auto)]">
        {images.map((img, index) => (
          <FadeUp
            key={index}
            className={`${img.span} group cursor-pointer`}
            delay={(index % 4) * 120}
          >
            <div 
              onClick={() => setLightboxIndex(index)}
              className="relative w-full h-full min-h-[250px] md:min-h-[350px] overflow-hidden rounded-[4px] ambient-shadow bg-[var(--color-surface-dim)] group/item"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover img-hover-scale"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="material-symbols-outlined text-[var(--color-primary-fixed)] text-[32px] absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 duration-500">
                  zoom_in
                </span>
                <p className="text-body-md text-white font-bold tracking-wide">
                  {img.caption}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 select-none">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between z-10 text-white select-none">
            <div className="text-body-md font-semibold text-gray-300">
              {lightboxIndex + 1} / {images.length} — {images[lightboxIndex].caption}
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed)]"
              aria-label="Close Lightbox"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative w-full flex-grow flex items-center justify-center p-4">
            {/* Left Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed)]"
              aria-label="Previous Image"
            >
              <span className="material-symbols-outlined text-[28px]">chevron_left</span>
            </button>

            {/* Lightbox Image */}
            <div className="relative w-full max-w-5xl h-[70vh] md:h-[75vh] transition-all duration-300 ease-out animate-hero-fade">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Right Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed)]"
              aria-label="Next Image"
            >
              <span className="material-symbols-outlined text-[28px]">chevron_right</span>
            </button>
          </div>

          {/* Bottom Bar / Caption */}
          <div className="w-full text-center text-gray-400 text-body-sm pb-2">
            Use Left and Right arrow keys to navigate. Escape to close.
          </div>
        </div>
      )}
    </>
  );
}
