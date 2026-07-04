/* ============================================================
   CONTENT TYPE DEFINITIONS — InAmigos Foundation
   ============================================================ */

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  external?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface StatItem {
  value: number;
  label: string;
  description: string;
}

export interface ProgramItem {
  title: string;
  icon: string;
  description: string;
  image: string;
  imageAlt: string;
  impact?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  linkedin?: string;
  category: 'leadership' | 'core' | 'operations' | 'field';
}

export interface BlogArticle {
  title: string;
  date: string;
  views: string;
  excerpt: string;
  image: string;
  link: string;
}

export interface EventItem {
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  span: string;
}

export interface HeroSlide {
  headline: string;
  subheadline: string;
  backgroundImage: string;
}

export interface CertificationItem {
  icon: string;
  label: string;
  description: string;
}
