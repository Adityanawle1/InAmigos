'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, mobileNavItems, siteConfig } from '@/content/navigation';
import { cn } from '@/lib/cn';

export default function TopNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,40,25,0.06)] py-3 border-b border-[var(--color-alabaster)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full transition-all duration-300"
          aria-label={`${siteConfig.name} Home`}
        >
          <div className={cn(
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white shadow-[0_4px_20px_rgba(0,40,25,0.08)] hover:shadow-[0_8px_30px_rgba(0,40,25,0.12)] rounded-full border border-[var(--color-alabaster)] overflow-hidden flex items-center justify-center aspect-square",
            isScrolled 
              ? "h-12 w-12" 
              : "h-16 w-16 md:h-20 md:w-20"
          )}>
            <img 
              src={siteConfig.logo.header} 
              alt={siteConfig.fullName} 
              className="w-full h-full object-cover scale-[1.3] origin-center"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-label-caps underline-reveal py-2 transition-colors duration-300',
                      isScrolled
                        ? (isActive ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]')
                        : (isActive ? 'text-[var(--color-accent-terracotta)] font-bold' : 'text-white/80 hover:text-white')
                    )}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-[4px] transition-colors duration-300 z-50",
            isMobileMenuOpen
              ? "text-[var(--color-on-surface)]"
              : (isScrolled ? "text-[var(--color-on-surface)]" : "text-white")
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-white/95 backdrop-blur-md z-40 lg:hidden flex flex-col pt-24 px-6 pb-12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto',
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-6 flex-grow">
          <ul className="flex flex-col gap-4">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <li key={item.label} className="border-b border-[var(--color-alabaster)] pb-4">
                  <Link
                    href={item.href}
                    className={cn(
                      'text-section-header-mobile block transition-colors duration-300',
                      isActive ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface)] hover:text-[var(--color-primary)]'
                    )}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
