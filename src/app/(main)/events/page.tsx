import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { eventsHero, eventsList } from '@/content/events';

export const metadata: Metadata = {
  alternates: {
    canonical: '/events/',
  },
  title: 'Events',
  description: eventsHero.subtext,
};

export default function EventsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Events', url: '/events/' }]} />
      <PageHero
        headline={eventsHero.headline}
        subtext={eventsHero.subtext}
        backgroundImage={eventsHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
          {eventsList.map((event, index) => (
            <FadeUp key={index} delay={120}>
              <div className="bg-white rounded-[4px] border border-[var(--color-alabaster)] overflow-hidden hover:border-[var(--color-primary-fixed)] transition-colors ambient-shadow flex flex-col md:flex-row group">
                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover img-hover-scale"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-[4px] text-label-caps font-bold">
                    {event.category}
                  </div>
                </div>
                <div className="p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-label-caps text-[var(--color-accent-terracotta)] mb-4">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">event</span>
                    {event.date}
                  </div>
                  <h3 className="text-section-header-mobile text-[var(--color-primary)] mb-4 group-hover:text-[var(--color-primary-fixed-dim)] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-8">
                    {event.description}
                  </p>
                  <div>
                    {/* Placeholder action */}
                    <button 
                      className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-3 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-not-allowed opacity-50"
                      disabled
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
