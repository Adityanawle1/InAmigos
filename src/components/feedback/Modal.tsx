'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A1F14]/70 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      
      {/* Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 transition-all duration-300 scale-100 opacity-100 border border-[var(--color-alabaster)] animate-hero-fade",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-alabaster)] bg-[var(--color-surface-linen)] shrink-0">
          {title && (
            <h2 id="modal-title" className="text-body-lg font-bold text-[var(--color-primary)]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--color-alabaster)] text-[var(--color-stone)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ml-auto"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow text-body-md text-[var(--color-on-surface)]">
          {children}
        </div>
      </div>
    </div>
  );
}
