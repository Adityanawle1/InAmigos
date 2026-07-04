'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeUp from '@/components/feedback/FadeUp';
import Modal from '@/components/feedback/Modal';
import { EventItem } from '@/types/content';

interface EventsListClientProps {
  events: EventItem[];
}

export default function EventsListClient({ events }: EventsListClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // RSVP Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleOpenDetails = (event: EventItem) => {
    setSelectedEvent(event);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-12">
      {events.map((event, index) => (
        <FadeUp key={index} delay={120}>
          <div className="bg-white rounded-[4px] border border-[var(--color-alabaster)] overflow-hidden hover:border-[var(--color-primary-fixed)] transition-colors ambient-shadow flex flex-col md:flex-row group">
            <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover img-hover-scale"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-[4px] text-label-caps font-bold">
                {event.category}
              </div>
            </div>
            <div className="p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-label-caps text-[var(--color-accent-terracotta)] mb-4">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">event</span>
                {event.date}
              </div>
              <h3 className="text-section-header-mobile text-[var(--color-primary)] mb-4 group-hover:text-[var(--color-primary-fixed-dim)] transition-colors">
                {event.title}
              </h3>
              <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-8">
                {event.description}
              </p>
              <div>
                <button 
                  onClick={() => handleOpenDetails(event)}
                  className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-3 rounded-[4px] text-label-caps font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer"
                >
                  View Details & RSVP
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      ))}

      {/* Details & RSVP Modal */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={handleClose}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-48 md:h-64 rounded-[4px] overflow-hidden">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>

            <div className="flex flex-wrap gap-4 text-body-sm text-[var(--color-stone)] border-b border-[var(--color-alabaster)] pb-4">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Date: {selectedEvent.date}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">tag</span>
                Category: {selectedEvent.category}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                Time: 4:00 PM - 6:00 PM IST
              </span>
            </div>

            <div>
              <h4 className="font-bold text-[var(--color-primary)] text-body-lg mb-2">Event Overview</h4>
              <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="bg-[var(--color-surface-linen)] p-6 rounded-[4px] border border-[var(--color-alabaster)]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h4 className="font-bold text-[var(--color-primary)] text-body-lg">Register / RSVP for this Event</h4>
                  <p className="text-body-sm text-[var(--color-stone)]">
                    Registering helps our local team manage volunteers and seating capacities.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rsvp-name" className="block text-[11px] text-[var(--color-stone)] uppercase tracking-wider font-bold mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="rsvp-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-[var(--color-outline-variant)] rounded-[4px] px-3 py-2 text-body-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="rsvp-email" className="block text-[11px] text-[var(--color-stone)] uppercase tracking-wider font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="rsvp-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[var(--color-outline-variant)] rounded-[4px] px-3 py-2 text-body-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rsvp-phone" className="block text-[11px] text-[var(--color-stone)] uppercase tracking-wider font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="rsvp-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-white border border-[var(--color-outline-variant)] rounded-[4px] px-3 py-2 text-body-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-container)] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-[4px] text-label-caps transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Free Registration
                        <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 flex flex-col items-center gap-4 animate-hero-fade">
                  <div className="w-16 h-16 bg-[var(--color-accent-terracotta)]/10 rounded-full flex items-center justify-center text-[var(--color-accent-terracotta)]">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-primary)] text-body-lg">RSVP Confirmed!</h4>
                    <p className="text-body-sm text-[var(--color-on-surface-variant)] mt-2">
                      Thank you, <span className="font-semibold">{name}</span>. Your reservation for <span className="font-semibold">{selectedEvent.title}</span> has been locked.
                    </p>
                    <p className="text-body-sm text-[var(--color-stone)] mt-1">
                      An entry pass and event calendar invite have been sent to <span className="italic">{email}</span>.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 text-label-caps text-[var(--color-primary)] font-bold hover:underline"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
