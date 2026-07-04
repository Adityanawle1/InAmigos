import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import FadeUp from '@/components/feedback/FadeUp';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { contactHero, contactInfo } from '@/content/contact';

export const metadata: Metadata = {
  alternates: {
    canonical: '/contact/',
  },
  title: 'Contact Us',
  description: contactHero.subtext,
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Contact', url: '/contact/' }]} />
      <PageHero
        headline={contactHero.headline}
        subtext={contactHero.subtext}
        backgroundImage={contactHero.backgroundImage}
      />

      <section className="py-16 md:py-24 px-6 md:px-12 flex-grow bg-[var(--color-surface-linen)]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <FadeUp>
              <h2 className="text-section-header-mobile text-[var(--color-primary)] mb-8">
                Our Office
              </h2>
              <div className="p-8 rounded-[4px] bg-white ambient-shadow flex flex-col gap-8">
                <div className="flex flex-col gap-4 text-body-md text-[var(--color-on-surface-variant)]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[24px] text-[var(--color-accent-terracotta)] mt-0.5" aria-hidden="true">location_on</span>
                    <div>
                      <h3 className="font-bold text-[var(--color-primary)] mb-1">Headquarters</h3>
                      <span>{contactInfo.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[24px] text-[var(--color-accent-terracotta)]" aria-hidden="true">call</span>
                    <div>
                      <h3 className="font-bold text-[var(--color-primary)] mb-1">Phone</h3>
                      <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-[var(--color-primary-fixed-dim)] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[24px] text-[var(--color-accent-terracotta)]" aria-hidden="true">mail</span>
                    <div>
                      <h3 className="font-bold text-[var(--color-primary)] mb-1">Email</h3>
                      <a href={`mailto:${contactInfo.email}`} className="hover:text-[var(--color-primary-fixed-dim)] transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Static Contact Form */}
          <FadeUp className="lg:col-span-7" delay={120}>
            <div className="p-8 md:p-12 rounded-[4px] ambient-shadow bg-white h-full border border-[var(--color-alabaster)]">
              <h2 className="text-section-header-mobile text-[var(--color-primary)] mb-2">
                Send a Message
              </h2>
              <p className="text-body-sm text-[var(--color-on-surface-variant)] mb-8">
                Fill out the form below or email us directly at <a href={`mailto:${contactInfo.email}`} className="text-[var(--color-accent-terracotta)] font-bold">{contactInfo.email}</a>.
              </p>
              
              {/* Note: This is a static form designed to work with mailto as a fallback since there is no backend API defined */}
              <form 
                action={`mailto:${contactInfo.email}`}
                method="POST"
                encType="text/plain"
                className="flex flex-col gap-6"
              >
                <div>
                  <label htmlFor="name" className="block text-label-caps text-[var(--color-stone)] mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-label-caps text-[var(--color-stone)] mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-label-caps text-[var(--color-stone)] mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--color-primary)] text-white px-8 py-4 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary-container)] transition-colors mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
