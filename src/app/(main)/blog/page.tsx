import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { blogHero, blogArticles } from '@/content/blog';
import BlogListClient from '@/components/content/BlogListClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/blog/',
  },
  title: 'Blog & Updates',
  description: blogHero.subtext,
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Blog', url: '/blog/' }]} />
      <PageHero
        headline={blogHero.headline}
        subtext={blogHero.subtext}
        backgroundImage={blogHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto">
          <BlogListClient articles={blogArticles} />
        </div>
      </section>
    </>
  );
}

