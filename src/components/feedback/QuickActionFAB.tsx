'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/content/navigation';
import { cn } from '@/lib/cn';

export default function QuickActionFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Close if scrolled back to top
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Action Button */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 transition-all duration-500 transform translate-y-0",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none translate-y-10"
        )}
      >
        {/* Quick Action Menu Panel */}
        <div 
          className={cn(
            "bg-white rounded-xl border border-[var(--color-alabaster)] p-4 shadow-2xl flex flex-col gap-3 min-w-[220px] transition-all duration-500 origin-bottom-right transform",
            isOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-75 translate-y-4 pointer-events-none"
          )}
        >
          <div className="border-b border-[var(--color-alabaster)] pb-2 mb-1">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Support Our Mission
            </h4>
          </div>

          {/* Action 1: Donate */}
          <a
            href={siteConfig.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent-terracotta)] transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              favorite
            </span>
            <span className="text-[13px] font-bold uppercase tracking-wider">
              Donate Directly
            </span>
          </a>

          {/* Action 2: Volunteer */}
          <a
            href={siteConfig.volunteerFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] border border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-linen)] transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              group_add
            </span>
            <span className="text-[13px] font-bold uppercase tracking-wider">
              Join as Volunteer
            </span>
          </a>

          {/* Action 3: Contact page */}
          <a
            href="/contact/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] hover:bg-[var(--color-surface-container-low)] text-[var(--color-stone)] transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              chat_bubble
            </span>
            <span className="text-[13px] font-bold uppercase tracking-wider">
              Inquire / Connect
            </span>
          </a>
        </div>

        {/* Main Pulsing FAB Toggle Button */}
        <button
          onClick={toggleOpen}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none",
            isOpen 
              ? "bg-[var(--color-stone)]" 
              : "bg-[var(--color-accent-terracotta)]"
          )}
          aria-label="Quick action menu"
        >
          {/* Pulsing Outer Glow Ring */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-[var(--color-accent-terracotta)] animate-ping opacity-25 pointer-events-none" />
          )}

          {/* Transition Icons */}
          <span 
            className={cn(
              "material-symbols-outlined text-[24px] absolute transition-all duration-300 transform",
              isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          >
            volunteer_activism
          </span>
          <span 
            className={cn(
              "material-symbols-outlined text-[24px] absolute transition-all duration-300 transform",
              isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          >
            close
          </span>
        </button>
      </div>

      {/* Click-away backdrop overlay when panel is open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/5 backdrop-blur-[1px] transition-opacity duration-300"
        />
      )}
    </>
  );
}
