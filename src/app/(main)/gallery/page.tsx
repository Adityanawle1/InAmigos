import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { galleryHero, galleryImages } from '@/content/gallery';

export const metadata: Metadata = {
  alternates: {
    canonical: '/gallery/',
  },
  title: 'Our Gallery',
  description: galleryHero.subtext,
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Gallery', url: '/gallery/' }]} />
      <PageHero
        headline={galleryHero.headline}
        subtext={galleryHero.subtext}
        backgroundImage={galleryHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-2xl mx-auto">
          {/* CSS Grid for masonry approximation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[minmax(350px,auto)]">
            {galleryImages.map((img, index) => (
              <FadeUp
                key={index}
                className={`${img.span} group`}
                delay={(index % 4) * 120}
              >
                <div className="relative w-full h-full min-h-[250px] md:min-h-[350px] overflow-hidden rounded-[4px] ambient-shadow bg-[var(--color-surface-dim)]">
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
                    <p className="text-body-md text-white font-bold tracking-wide">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
