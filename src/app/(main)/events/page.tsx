import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { eventsHero, eventsList } from '@/content/events';
import EventsListClient from '@/components/content/EventsListClient';

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
        <div className="max-w-screen-xl mx-auto">
          <EventsListClient events={eventsList} />
        </div>
      </section>
    </>
  );
}

