'use client';

import Link from 'next/link';
import { siteConfig, footerUsefulLinks, footerPageLinks } from '@/content/navigation';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white pt-16 md:pt-24 pb-8 border-t-[4px] border-[var(--color-primary)]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col gap-6">
            <Link 
              href="/" 
              className="inline-block focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed)] rounded-full" 
              aria-label={`${siteConfig.name} Home`}
            >
              <div className="h-16 w-16 rounded-full overflow-hidden bg-white shadow-md border border-[var(--color-alabaster)] flex items-center justify-center">
                <img 
                  src={siteConfig.logo.footer} 
                  alt={siteConfig.fullName} 
                  className="w-full h-full object-cover scale-[1.3] origin-center"
                />
              </div>
            </Link>
            <p className="text-body-sm text-[var(--color-surface-dim)] leading-relaxed">
              {siteConfig.description}
            </p>
            <div>
              <h4 className="text-label-caps mb-4 text-[var(--color-primary-fixed)]">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href={siteConfig.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A3D2C] flex items-center justify-center hover:bg-[var(--color-primary-fixed)] hover:text-[var(--color-on-primary-fixed)] transition-colors"
                  aria-label="Facebook"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">facebook</span>
                </a>
                <a 
                  href={siteConfig.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A3D2C] flex items-center justify-center hover:bg-[var(--color-primary-fixed)] hover:text-[var(--color-on-primary-fixed)] transition-colors"
                  aria-label="Instagram"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-label-caps mb-6 text-[var(--color-primary-fixed)]">Useful Links</h4>
            <ul className="flex flex-col gap-4">
              {footerUsefulLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-body-sm text-[var(--color-surface-dim)] hover:text-white transition-colors underline-reveal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pages */}
          <div>
            <h4 className="text-label-caps mb-6 text-[var(--color-primary-fixed)]">Pages</h4>
            <ul className="flex flex-col gap-4">
              {footerPageLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-body-sm text-[var(--color-surface-dim)] hover:text-white transition-colors underline-reveal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-label-caps text-[var(--color-primary-fixed)]">Contact Us</h4>
            <div className="flex flex-col gap-4 text-body-sm text-[var(--color-surface-dim)]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[var(--color-accent-terracotta)] mt-0.5" aria-hidden="true">location_on</span>
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[var(--color-accent-terracotta)]" aria-hidden="true">mail</span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[var(--color-accent-terracotta)]" aria-hidden="true">call</span>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{siteConfig.phone}</a>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-label-caps mb-4 text-[var(--color-primary-fixed)]">Newsletter</h4>
              <form className="flex" onSubmit={(e) => { e.preventDefault(); alert('Newsletter signup is handled via external form in production.'); }}>
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  required
                  className="bg-[#1A3D2C] text-white px-4 py-3 rounded-l-[4px] w-full text-body-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-fixed)] border-none"
                />
                <button 
                  type="submit"
                  className="bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] px-4 py-3 rounded-r-[4px] hover:bg-[var(--color-primary-fixed-dim)] transition-colors"
                  aria-label="Subscribe"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">send</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1A3D2C] flex flex-col items-center justify-center text-[12px] text-[var(--color-surface-dim)]">
          <p>{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
