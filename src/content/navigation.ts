/* ============================================================
   NAVIGATION & SITE CONFIG — InAmigos Foundation
   Source: website-content-master.md
   ============================================================ */

import type { NavItem, FooterLink } from '@/types/content';

export const siteConfig = {
  name: 'InAmigos',
  fullName: 'InAmigos Foundation',
  tagline: 'Together, we can create a more inclusive, compassionate and empowered society.',
  description: 'InAmigos Foundation is a Section 8 registered non-profit working towards food distribution, education, women empowerment, animal welfare, environmental conservation and skill development across India.',
  copyright: `© ${new Date().getFullYear()} InAmigos Foundation. All Rights Reserved.`,
  url: 'https://inamigosfoundation.org.in',
  locale: 'en_IN',
  phone: '+91 626 730 9902',
  email: 'support@inamigosfoundation.org.in',
  address: 'Ward No. 5, Gram Post, Sipat Ujwal Nagar, Bilaspur, Chhattisgarh, Pin-Code: 495555',
  donateUrl: 'https://rzp.io/l/kWQ87HP',
  volunteerFormUrl: 'https://forms.gle/AB4c1hLaDDmtrKGU7',
  social: {
    facebook: 'https://www.facebook.com/inamigos.inamigos',
    instagram: 'https://www.instagram.com/inamigos/',
  },
  logo: {
    header: 'https://inamigosfoundation.org.in/public/storage/settings/174421468011.jpg',
    footer: 'https://inamigosfoundation.org.in/public/storage/settings/1744214680113.jpg',
    favicon: 'https://inamigosfoundation.org.in/public/storage/settings/1744214680.jpg',
  },
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Programs', href: '/programs/' },
  { label: 'Team', href: '/team/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Events', href: '/events/' },
  { label: 'Contact', href: '/contact/' },
];

export const mobileNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Programs', href: '/programs/' },
  { label: 'Our Team', href: '/team/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Events', href: '/events/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerUsefulLinks: FooterLink[] = [
  { label: 'Events', href: '/events/' },
  { label: 'Our Team', href: '/team/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Blog', href: '/blog/' },
];

export const footerPageLinks: FooterLink[] = [
  { label: 'About Us', href: '/about/' },
  { label: 'Programs', href: '/programs/' },
  { label: 'Contact', href: '/contact/' },
];
