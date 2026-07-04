/* ============================================================
   HOME PAGE CONTENT — InAmigos Foundation
   Source: website-content-master.md
   ============================================================ */

import type { HeroSlide, StatItem } from '@/types/content';

export const heroSlides: HeroSlide[] = [
  {
    headline: 'Nurturing Young Minds, Building Bright Futures',
    subheadline: 'BachpanShala',
    backgroundImage: 'https://inamigosfoundation.org.in/public/storage/slideshow/1738235951.jpg',
  },
  {
    headline: 'Soaring Towards a Brighter Future',
    subheadline: 'Udaan',
    backgroundImage: 'https://inamigosfoundation.org.in/public/storage/slideshow/1738235638.jpg',
  },
  {
    headline: 'Empowering Lives, Spreading Compassion',
    subheadline: 'Jeev',
    backgroundImage: 'https://inamigosfoundation.org.in/public/storage/slideshow/1738235697.jpg',
  },
  {
    headline: 'Serving Humanity with Compassion',
    subheadline: 'Seva',
    backgroundImage: 'https://inamigosfoundation.org.in/public/storage/slideshow/1738236132.jpg',
  },
  {
    headline: 'Plant for a Better Tomorrow',
    subheadline: 'Prakriti',
    backgroundImage: 'https://inamigosfoundation.org.in/public/storage/slideshow/1738236201.jpg',
  },
];

export const featureCtas = [
  {
    icon: 'volunteer_activism',
    title: 'Donate Us',
    description: 'Make a Difference with Your Donation Today',
    href: 'https://rzp.io/l/kWQ87HP',
    external: true,
  },
  {
    icon: 'group_add',
    title: 'Become A Volunteer',
    description: 'Join Us and Be the Change You Wish to See',
    href: 'https://forms.gle/AB4c1hLaDDmtrKGU7',
    external: true,
  },
  {
    icon: 'handshake',
    title: 'Join Us',
    description: 'Step in, stand out, and create impact',
    href: '/contact/',
    external: false,
  },
];

export const aboutPreview = {
  headline: 'Get to Know Us Better',
  body: 'InAmigos Foundation was founded on September 23, 2020, by Mr. Govind Shukla (Founder & CEO). It is a Section 8 registered non-profit organization, licensed by the Central Government. It has its base at Chhattisgarh. It holds 80G & 12A certifications, ensuring transparency, accountability and tax-exempt benefits for donors. Our foundation is also CSR-1 registered, allowing us to collaborate with corporate partners for impactful Corporate Social Responsibility (CSR) initiatives.',
  closingStatement: 'Join Us in Making a Difference — Together, we can create a more inclusive, compassionate and empowered society.',
  image: 'https://inamigosfoundation.org.in/public/storage/settings/1738236437.jpg',
  imageAlt: 'InAmigos Foundation team working with the community',
  ctaLabel: "Let's Know More",
  ctaHref: '/about/',
};

export const impactStats: StatItem[] = [
  {
    value: 200,
    label: 'Volunteers',
    description: 'Dedicated professionals and volunteers across India',
  },
  {
    value: 28,
    label: 'States',
    description: 'Operating across 28 states in India',
  },
  {
    value: 6,
    label: 'Causes',
    description: 'Active programs driving social change',
  },
  {
    value: 50000,
    label: 'Beneficiaries',
    description: 'Lives impacted through our initiatives',
  },
];

export const impactBackgroundImage = 'https://inamigosfoundation.org.in/public/storage/settings/169090863311.jpg';

export const actionCta = {
  headline: 'Join Us in Making a Difference',
  subStatement: 'Whether through volunteering, partnerships, or donations, every contribution strengthens our cause and enables us to expand our reach and impact. Together, we can build a more inclusive, compassionate, and empowered society.',
  cta1: { label: 'Become a Volunteer', href: 'https://forms.gle/AB4c1hLaDDmtrKGU7', external: true },
  cta2: { label: 'Contact Us', href: '/contact/', external: false },
};
