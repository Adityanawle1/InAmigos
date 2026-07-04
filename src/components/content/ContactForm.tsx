'use client';

import { useState } from 'react';

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmailVal('');
    setMessage('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 md:p-12 rounded-[4px] ambient-shadow bg-white h-full border border-[var(--color-alabaster)] text-center flex flex-col items-center justify-center gap-6 animate-hero-fade">
        <div className="w-20 h-20 bg-[var(--color-accent-terracotta)]/10 rounded-full flex items-center justify-center text-[var(--color-accent-terracotta)]">
          <span className="material-symbols-outlined text-[44px]">send_and_archive</span>
        </div>
        <div>
          <h2 className="text-section-header-mobile text-[var(--color-primary)] font-bold mb-2">
            Message Sent Successfully!
          </h2>
          <p className="text-body-md text-[var(--color-on-surface-variant)] max-w-md mx-auto">
            Thank you, <span className="font-semibold">{name}</span>. We have received your message. Our volunteer support team will review it and get back to you at <span className="font-semibold italic">{emailVal}</span> shortly.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-3 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 rounded-[4px] ambient-shadow bg-white h-full border border-[var(--color-alabaster)]">
      <h2 className="text-section-header-mobile text-[var(--color-primary)] mb-2">
        Send a Message
      </h2>
      <p className="text-body-sm text-[var(--color-on-surface-variant)] mb-8">
        Fill out the form below or email us directly at <a href={`mailto:${email}`} className="text-[var(--color-accent-terracotta)] font-bold">{email}</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="block text-label-caps text-[var(--color-stone)] mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-label-caps text-[var(--color-stone)] mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-label-caps text-[var(--color-stone)] mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[4px] px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-y"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-container)] disabled:bg-gray-400 text-white px-8 py-4 rounded-[4px] text-label-caps font-bold transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              Send Message
              <span className="material-symbols-outlined text-[18px]">send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
