'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is InAmigos Foundation a registered NGO?',
    answer: 'Yes, InAmigos Foundation is a Section 8 registered non-profit organization licensed by the Central Government of India (Ministry of Corporate Affairs). Incorporated on September 23, 2020, we operate under active registrations with base operations in Chhattisgarh, extending support across multiple states.',
  },
  {
    question: 'Are my donations eligible for tax exemptions under 80G?',
    answer: 'Yes, absolutely. InAmigos Foundation holds active 80G and 12A certifications. All contributions made to us are 50% tax-exempt under Section 80G of the Income Tax Act. After your donation goes through, a formal receipt and 80G certificate will be compiled and sent to your registered email address.',
  },
  {
    question: 'How are the foundation\'s funds allocated and utilized?',
    answer: 'Transparency is our core value. Approximately 88% of all incoming funds are directly allocated to project resources (educational kits for BachpanShala, animal food for Project Jeev, saplings for Prakriti, self-employment tools for Udaan, and distribution meals). The remaining 12% covers logistics, volunteer safety, compliance, and essential administrative overheads.',
  },
  {
    question: 'How can I become a volunteer or intern?',
    answer: 'We welcome anyone passionate about making an impact! You can click the "Become a Volunteer" button on our home page or in the footer to fill out our registration form. We offer on-ground field drives, remote/digital support, and structured internship batches (Project VIKAS has successfully trained over 30,000+ interns in the last 4 years).',
  },
  {
    question: 'Does the foundation collaborate with corporate partners for CSR?',
    answer: 'Yes, we are fully registered with the Ministry of Corporate Affairs under registration number CSR-1. This makes us eligible to design, execute, and report Corporate Social Responsibility (CSR) programs. We collaborate closely with corporate entities on sustainable development projects, primary schooling, and environmental drives.',
  },
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-[var(--color-alabaster)] overflow-hidden transition-all duration-300 ambient-shadow"
          >
            {/* Header Button */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-container-low)]"
              aria-expanded={isOpen}
            >
              <span className="text-body-lg font-bold text-[var(--color-primary)] pr-4">
                {item.question}
              </span>
              <span 
                className={`material-symbols-outlined text-[var(--color-accent-terracotta)] text-[24px] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>

            {/* Answer Panel */}
            <div 
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-64 border-t border-[var(--color-alabaster)] opacity-100 p-6' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
