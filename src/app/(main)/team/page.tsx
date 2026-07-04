import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { teamHero, teamMembers } from '@/content/team';

export const metadata: Metadata = {
  alternates: {
    canonical: '/team/',
  },
  title: 'Our Team',
  description: teamHero.subtext,
};

export default function TeamPage() {
  const leadership = teamMembers.filter(m => m.category === 'leadership');
  const core = teamMembers.filter(m => m.category === 'core');
  const operations = teamMembers.filter(m => m.category === 'operations');
  const field = teamMembers.filter(m => m.category === 'field');

  const TeamSection = ({ title, members }: { title: string, members: typeof teamMembers }) => (
    <div className="mb-24 last:mb-0">
      <FadeUp className="text-center mb-12">
        <h2 className="text-section-header text-[var(--color-primary)]">{title}</h2>
      </FadeUp>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
        {members.map((member, index) => (
          <FadeUp key={member.name} delay={(index % 4) * 120} className="group text-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white ambient-shadow">
              <Image
                src={member.image}
                alt={member.imageAlt}
                fill
                className="object-cover img-hover-scale"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </div>
            <h3 className="text-body-lg font-bold text-[var(--color-primary)]">{member.name}</h3>
            <p className="text-label-caps text-[var(--color-stone)] mt-1">{member.role}</p>
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[var(--color-primary)] hover:text-[var(--color-primary-fixed)] transition-colors"
                aria-label={`${member.name}'s LinkedIn Profile`}
              >
                {/* Fallback link icon for LinkedIn since Material Symbols doesn't have brand icons */}
                <span className="material-symbols-outlined" aria-hidden="true">link</span>
              </a>
            )}
          </FadeUp>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Team', url: '/team/' }]} />
      <PageHero
        headline={teamHero.headline}
        subtext={teamHero.subtext}
        backgroundImage={teamHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto">
          {leadership.length > 0 && <TeamSection title="Leadership" members={leadership} />}
          {core.length > 0 && <TeamSection title="Core Team" members={core} />}
          {operations.length > 0 && <TeamSection title="Operations & Support" members={operations} />}
          {field.length > 0 && <TeamSection title="Field Volunteers" members={field} />}
        </div>
      </section>
    </>
  );
}
