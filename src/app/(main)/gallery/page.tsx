import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { galleryHero, galleryImages } from '@/content/gallery';
import GalleryGrid from '@/components/content/GalleryGrid';

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
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </>
  );
}

