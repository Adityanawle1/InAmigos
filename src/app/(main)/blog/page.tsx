import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { blogHero, blogArticles } from '@/content/blog';

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <FadeUp key={index} delay={(index % 3) * 120} className="h-full">
                <article className="flex flex-col h-full bg-white rounded-[4px] border border-[var(--color-alabaster)] overflow-hidden hover:border-[var(--color-primary-fixed)] transition-colors ambient-shadow group">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover img-hover-scale"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-label-caps text-[var(--color-stone)] mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">calendar_today</span>
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">visibility</span>
                        {article.views}
                      </span>
                    </div>
                    <h3 className="text-body-lg font-bold text-[var(--color-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-accent-terracotta)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-body-sm text-[var(--color-on-surface-variant)] mb-6 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto">
                      {/* For now, linking back to home since full blog posts aren't provided */}
                      <Link 
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-label-caps underline-reveal"
                        title="Blog article content not provided in master file. Link redirects to Home."
                      >
                        Read More
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
