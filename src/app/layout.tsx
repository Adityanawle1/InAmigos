import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CookieBanner from '@/components/layout/CookieBanner';
import QuickActionFAB from '@/components/feedback/QuickActionFAB';
import { siteConfig } from '@/content/navigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    locale: siteConfig.locale,
    type: 'website',
    images: [{ url: siteConfig.logo.header, width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [{ url: siteConfig.logo.header, alt: siteConfig.fullName }],
  },
  other: {
    'theme-color': '#004D2F',
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        <noscript>
          <style>{'.fade-up { opacity: 1 !important; transform: none !important; }'}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["NGO", "Organization"],
                  "@id": `${siteConfig.url}/#organization`,
                  "name": siteConfig.fullName,
                  "url": siteConfig.url,
                  "logo": {
                    "@type": "ImageObject",
                    "url": siteConfig.logo.header,
                    "width": 1200,
                    "height": 630
                  },
                  "description": siteConfig.description,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": siteConfig.phone,
                    "email": siteConfig.email,
                    "contactType": "customer support",
                    "availableLanguage": ["en", "hi"]
                  },
                  "sameAs": [
                    siteConfig.social.facebook,
                    siteConfig.social.instagram
                  ],
                  "areaServed": "IN"
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  "url": siteConfig.url,
                  "name": siteConfig.fullName,
                  "publisher": {
                    "@id": `${siteConfig.url}/#organization`
                  }
                }
              ]
            }).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        <CookieBanner />
        <QuickActionFAB />
      </body>
    </html>
  );
}
