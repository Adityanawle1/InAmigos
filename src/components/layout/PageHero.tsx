import Image from 'next/image';
import FadeUp from '@/components/feedback/FadeUp';

interface PageHeroProps {
  headline: string;
  subtext?: string;
  backgroundImage?: string;
}

export default function PageHero({ headline, subtext, backgroundImage }: PageHeroProps) {
  // If there's a background image, render the dark immersive hero
  if (backgroundImage) {
    return (
      <section className="relative pt-[var(--spacing-nav-height)] min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F14]/80 via-[#0A1F14]/60 to-[#0A1F14]/90" />
        
        <div className="relative z-10 w-full max-w-screen-md mx-auto px-6 text-center text-white py-16">
          <FadeUp>
            <h1 className="text-display-mobile md:text-display mb-6">
              {headline}
            </h1>
          </FadeUp>
          {subtext && (
            <FadeUp delay={120}>
              <p className="text-body-lg text-[var(--color-surface-dim)] max-w-2xl mx-auto">
                {subtext}
              </p>
            </FadeUp>
          )}
        </div>
      </section>
    );
  }

  // Otherwise render a clean, minimal hero
  return (
    <section className="pt-[calc(var(--spacing-nav-height)+64px)] pb-16 px-6 md:px-16" style={{ backgroundColor: 'var(--color-surface-linen)' }}>
      <div className="max-w-screen-md mx-auto text-center">
        <FadeUp>
          <h1 className="text-display-mobile md:text-display mb-6" style={{ color: 'var(--color-primary)' }}>
            {headline}
          </h1>
        </FadeUp>
        {subtext && (
          <FadeUp delay={120}>
            <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--color-on-surface-variant)' }}>
              {subtext}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
