import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { programsHero, programsList } from '@/content/programs';
import { siteConfig } from '@/content/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: '/programs/',
  },
  title: 'Our Programs',
  description: programsHero.subtext,
};

export default function ProgramsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Programs', url: '/programs/' }]} />
      <PageHero
        headline={programsHero.headline}
        subtext={programsHero.subtext}
        backgroundImage={programsHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16 md:gap-24">
          {programsList.map((program, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={program.title} 
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:grid-flow-col-dense'}`}
              >
                <FadeUp delay={120} className={isEven ? 'md:col-start-1' : 'md:col-start-2'}>
                  <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden ambient-shadow">
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-6 right-6 w-16 h-16 bg-white text-[var(--color-primary)] flex items-center justify-center rounded-full shadow-lg">
                      <span className="material-symbols-outlined text-[32px]" aria-hidden="true">{program.icon}</span>
                    </div>
                  </div>
                </FadeUp>
                
                <div className={`flex flex-col gap-6 ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}>
                  <FadeUp>
                    <h2 className="text-section-header-mobile text-[var(--color-primary)]">
                      {program.title}
                    </h2>
                  </FadeUp>
                  <FadeUp delay={120}>
                    <p className="text-body-lg text-[var(--color-on-surface-variant)]">
                      {program.description}
                    </p>
                  </FadeUp>
                  <FadeUp delay={240}>
                    <div className="bg-white p-6 rounded-[4px] border-l-4 border-[var(--color-accent-terracotta)] ambient-shadow">
                      <p className="text-label-caps text-[var(--color-stone)] mb-1">Impact</p>
                      <p className="text-body-md font-bold text-[var(--color-primary)]">{program.impact}</p>
                    </div>
                  </FadeUp>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
