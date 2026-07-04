import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/feedback/FadeUp';
import HeroCarousel from '@/components/layout/HeroCarousel';
import StatCounter from '@/components/content/StatCounter';
import DonationCalculator from '@/components/content/DonationCalculator';
import TestimonialsSlider from '@/components/content/TestimonialsSlider';
import FaqAccordion from '@/components/content/FaqAccordion';
import InteractiveMap from '@/components/content/InteractiveMap';
import BeforeAfterSlider from '@/components/content/BeforeAfterSlider';
import { heroSlides, featureCtas, aboutPreview, impactStats, impactBackgroundImage, actionCta } from '@/content/home';
import { programsList } from '@/content/programs';
import { teamMembers } from '@/content/team';
import { eventsList } from '@/content/events';
import { galleryImages } from '@/content/gallery';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const featuredTeam = teamMembers.filter(m => m.category === 'field').slice(0, 3);
  const featuredEvents = eventsList.slice(0, 3);
  const featuredGallery = galleryImages.slice(0, 4);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      {/* Dynamic Donation Calculator */}
      <section className="py-20 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Floating background graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent-terracotta)]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <DonationCalculator />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">

        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden ambient-shadow">
            <Image
              src={aboutPreview.image}
              alt={aboutPreview.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <FadeUp>
              <h2 className="text-section-header text-[var(--color-primary)] mb-6">
                {aboutPreview.headline}
              </h2>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-6">
                {aboutPreview.body}
              </p>
            </FadeUp>
            <FadeUp delay={240}>
              <p className="text-body-lg text-[var(--color-primary)] font-bold mb-8">
                {aboutPreview.closingStatement}
              </p>
            </FadeUp>
            <FadeUp delay={360}>
              <Link
                href={aboutPreview.ctaHref}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-[4px] text-label-caps font-bold transition-opacity hover:opacity-90"
              >
                {aboutPreview.ctaLabel}
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Impact Stats (Parallax-style Dark Overlay) */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={impactBackgroundImage}
            alt="Impact background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0A1F14]/90" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {impactStats.map((stat, index) => (
              <StatCounter
                key={index}
                target={stat.value}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive India Map */}
      <InteractiveMap />

      {/* Programs Preview */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-section-header text-[var(--color-primary)] mb-4">Our Causes</h2>
            <p className="text-body-lg text-[var(--color-on-surface-variant)]">
              We focus on making the maximum positive effort for our community.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsList.map((program, index) => (
              <FadeUp key={program.title} delay={index * 120} className="group">
                <Link href="/programs/" className="block h-full border border-[var(--color-alabaster)] rounded-[4px] overflow-hidden hover:border-[var(--color-primary-fixed)] transition-colors">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover img-hover-scale"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-8 bg-white relative">
                    <div className="absolute -top-10 right-8 w-16 h-16 bg-[var(--color-primary)] text-white flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                      <span className="material-symbols-outlined text-[28px]" aria-hidden="true">{program.icon}</span>
                    </div>
                    <h3 className="text-section-header-mobile text-[var(--color-primary)] mb-4 mt-2">
                      {program.title}
                    </h3>
                    <p className="text-body-md text-[var(--color-on-surface-variant)] line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/programs/"
              className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              View All Causes
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Transformation Slider */}
      <BeforeAfterSlider />

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 bg-[var(--color-surface-linen)] border-t border-[var(--color-alabaster)] relative">
        <div className="max-w-screen-2xl mx-auto">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-widest font-bold mb-2 block">
              Voices of Change
            </span>
            <h2 className="text-section-header text-[var(--color-primary)]">What People Say About Us</h2>
          </FadeUp>
          <TestimonialsSlider />
        </div>
      </section>

      {/* Volunteers Preview */}
      <section className="py-24 px-6 md:px-12 bg-white">

        <div className="max-w-screen-2xl mx-auto">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-section-header text-[var(--color-primary)] mb-4">Our Volunteers</h2>
            <p className="text-body-lg text-[var(--color-on-surface-variant)]">
              The driving force behind our mission and impact on the ground.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTeam.map((member, index) => (
              <FadeUp key={member.name} delay={index * 120} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white ambient-shadow">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    className="object-cover img-hover-scale"
                    sizes="192px"
                  />
                </div>
                <h3 className="text-body-lg font-bold text-[var(--color-primary)]">{member.name}</h3>
                <p className="text-label-caps text-[var(--color-stone)] mt-1">{member.role}</p>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/team/"
              className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              View All Volunteers
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-[var(--color-surface-linen)] border-t border-[var(--color-alabaster)]">
        <div className="max-w-screen-2xl mx-auto">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-widest font-bold mb-2 block">
              Common Questions
            </span>
            <h2 className="text-section-header text-[var(--color-primary)]">Frequently Asked Questions</h2>
            <p className="text-body-sm text-[var(--color-on-surface-variant)] mt-2">
              Have doubts? Find quick answers here regarding registrations, tax exemptions, and transparency.
            </p>
          </FadeUp>
          <FaqAccordion />
        </div>
      </section>

      {/* Action CTA */}
      <section className="py-24 px-6 md:px-12 bg-[var(--color-primary-container)] text-center text-white">

        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <FadeUp>
            <h2 className="text-display-mobile mb-6">
              {actionCta.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="text-body-lg text-[var(--color-primary-fixed)] mb-12">
              {actionCta.subStatement}
            </p>
          </FadeUp>
          <FadeUp delay={240} className="flex flex-wrap justify-center gap-4">
            <Link
              href={actionCta.cta2.href}
              className="bg-[var(--color-accent-terracotta)] text-white px-8 py-4 rounded-[4px] text-label-caps font-bold transition-opacity hover:opacity-90"
            >
              {actionCta.cta2.label}
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
