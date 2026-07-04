import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { 
  overviewSection, 
  missionSection, 
  visionSection, 
  credentials, 
  initiatives, 
  values 
} from '@/content/about';

export const metadata: Metadata = {
  alternates: {
    canonical: '/about/',
  },
  title: 'About Us',
  description: overviewSection.body,
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'About Us', url: '/about/' }]} />
      <PageHero
        headline="About Us"
        subtext="Creating Lasting Social Impact Across India."
        backgroundImage={overviewSection.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-12">
            <FadeUp>
              <h2 className="text-section-header text-[var(--color-primary)] mb-6">
                Organization Overview
              </h2>
              <p className="text-body-lg text-[var(--color-on-surface-variant)]">
                {overviewSection.body}
              </p>
            </FadeUp>

            <FadeUp delay={120}>
              <h2 className="text-section-header-mobile text-[var(--color-primary)] mb-4">
                {missionSection.headline}
              </h2>
              <p className="text-body-lg text-[var(--color-on-surface-variant)]">
                {missionSection.body}
              </p>
            </FadeUp>

            <FadeUp delay={240}>
              <h2 className="text-section-header-mobile text-[var(--color-primary)] mb-4">
                {visionSection.headline}
              </h2>
              <p className="text-body-lg text-[var(--color-on-surface-variant)]">
                {visionSection.body}
              </p>
            </FadeUp>
          </div>
          
          <FadeUp delay={360} className="relative aspect-square md:aspect-auto h-full min-h-[400px] rounded-[4px] overflow-hidden ambient-shadow">
            <Image 
              src="https://inamigosfoundation.org.in/public/storage/settings/1738236437.jpg"
              alt="InAmigos Foundation Team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </FadeUp>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-section-header text-[var(--color-primary)]">Credentials & Recognitions</h2>
            <p className="text-body-lg text-[var(--color-on-surface-variant)] mt-4 max-w-2xl mx-auto">
              Committed to maintaining high-quality standards, transparency, and accountability in our operations.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, index) => (
              <FadeUp key={cred.label} delay={index * 120} className="bg-white p-6 rounded-[4px] ambient-shadow flex items-start gap-4">
                <span className="material-symbols-outlined text-[32px] text-[var(--color-accent-terracotta)]" aria-hidden="true">
                  {cred.icon}
                </span>
                <div>
                  <h3 className="text-body-lg font-bold text-[var(--color-primary)] mb-1">{cred.label}</h3>
                  <p className="text-body-sm text-[var(--color-on-surface-variant)]">{cred.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-section-header text-[var(--color-primary)]">Key Initiatives & Impact</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((init, index) => (
              <FadeUp key={init.title} delay={index * 120} className="border-l-4 border-[var(--color-primary)] pl-6 py-2">
                <h3 className="text-section-header-mobile text-[var(--color-primary)] mb-2">{init.title}</h3>
                <p className="text-body-md text-[var(--color-on-surface-variant)]">{init.impact}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-primary-container)] text-white text-center">
        <div className="max-w-screen-md mx-auto">
          <FadeUp>
            <h2 className="text-section-header mb-8">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((value, index) => (
                <span key={index} className="bg-white/10 px-6 py-3 rounded-full text-body-md border border-white/20">
                  {value}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
