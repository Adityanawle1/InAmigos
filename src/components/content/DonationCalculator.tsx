'use client';

import { useState } from 'react';
import { siteConfig } from '@/content/navigation';

interface DonationTier {
  amount: number;
  label: string;
  impact: string;
  description: string;
  icon: string;
  percentage: number;
}

const DONATION_TIERS: DonationTier[] = [
  {
    amount: 500,
    label: 'Feed a Child',
    impact: '15 Meals Distributed',
    description: 'Provides 15 warm, nutritious meals to underprivileged children and families living on streets through Project SEVA.',
    icon: 'restaurant',
    percentage: 10,
  },
  {
    amount: 1200,
    label: 'Provide Education',
    impact: '2 Educational Kits',
    description: 'Supplies complete educational kits (books, notebooks, stationary, school bags) for 2 children in Project BACHPANSHALA.',
    icon: 'school',
    percentage: 25,
  },
  {
    amount: 2500,
    label: 'Digital Training',
    impact: '1 Month Digital Class',
    description: 'Funds digital literacy, basic computer, and life skills training for 1 student for a month in our local training center.',
    icon: 'computer',
    percentage: 50,
  },
  {
    amount: 5000,
    label: 'Empower Women',
    impact: '1 Self-Employment Kit',
    description: 'Empowers a rural woman with a self-employment sewing kit and essential business training under Project UDAAN.',
    icon: 'person_celebrate',
    percentage: 75,
  },
  {
    amount: 10000,
    label: 'Green Planet',
    impact: '50 Saplings Planted',
    description: 'Funds the planting, protection, and nurturing of 50 evolutionary tree saplings for environmental conservation through Project PRAKRITI.',
    icon: 'park',
    percentage: 100,
  },
];

export default function DonationCalculator() {
  const [selectedTier, setSelectedTier] = useState<DonationTier>(DONATION_TIERS[1]);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const handleTierSelect = (tier: DonationTier) => {
    setSelectedTier(tier);
    setIsCustomMode(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setCustomAmount(value);
      setIsCustomMode(true);
    }
  };

  const activeAmount = isCustomMode ? (Number(customAmount) || 0) : selectedTier.amount;

  // Calculate approximate custom impact
  const getCustomImpact = (amount: number) => {
    if (amount <= 0) return 'Please enter an amount to see the impact.';
    if (amount < 500) {
      const meals = Math.floor(amount / 35);
      return meals > 0 ? `Feeds underprivileged persons with ${meals} warm meals.` : 'Helps buy raw food grains.';
    }
    if (amount < 1200) {
      const meals = Math.floor(amount / 35);
      return `Feeds ${meals} people OR supports 1 child with basic stationary.`;
    }
    if (amount < 2500) {
      const children = Math.floor(amount / 600);
      return `Provides complete educational kits for ${children} underprivileged school children.`;
    }
    if (amount < 5000) {
      const weeks = Math.floor(amount / 625);
      return `Funds digital literacy and basic computer classes for 1 student for ${weeks} weeks.`;
    }
    if (amount < 10000) {
      const women = Math.floor(amount / 5000);
      const remaining = amount % 5000;
      const saplings = Math.floor(remaining / 200);
      return `Empowers ${women} rural woman with a startup sewing kit${saplings > 0 ? ` and plants ${saplings} trees` : ''}.`;
    }
    const trees = Math.floor(amount / 200);
    return `Funds the planting and ecological nurturing of ${trees} tree saplings across rural regions.`;
  };

  const activeImpactText = isCustomMode ? getCustomImpact(activeAmount) : selectedTier.description;
  const activeHeadline = isCustomMode ? `Custom Impact (₹${activeAmount})` : selectedTier.impact;
  const activeIcon = isCustomMode ? 'volunteer_activism' : selectedTier.icon;
  const activePercentage = isCustomMode 
    ? Math.min(100, Math.max(5, Math.round((activeAmount / 10000) * 100))) 
    : selectedTier.percentage;

  return (
    <div className="bg-white rounded-xl border border-[var(--color-alabaster)] p-6 md:p-10 ambient-shadow max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Selection Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-widest font-bold mb-2 block">
              Impact Calculator
            </span>
            <h3 className="text-section-header-mobile text-[var(--color-primary)] font-bold">
              Choose How Much to Support
            </h3>
            <p className="text-body-sm text-[var(--color-on-surface-variant)] mt-2">
              Every single rupee directly funds ground-level work. Select a tier below or enter a custom contribution.
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {DONATION_TIERS.map((tier) => {
              const isSelected = !isCustomMode && selectedTier.amount === tier.amount;
              return (
                <button
                  key={tier.amount}
                  onClick={() => handleTierSelect(tier)}
                  className={`py-3 px-2 rounded-[4px] border text-center transition-all ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md font-bold'
                      : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-container-lowest)]'
                  }`}
                >
                  <div className="text-[12px] opacity-75 font-semibold">INR</div>
                  <div className="text-body-md font-bold mt-0.5">₹{tier.amount}</div>
                </button>
              );
            })}
          </div>

          {/* Custom Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-lg text-[var(--color-stone)] font-semibold">₹</span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomChange}
              placeholder="Enter custom amount (e.g. 1500)"
              className={`w-full bg-[var(--color-surface)] border rounded-[4px] pl-8 pr-4 py-4 text-body-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all ${
                isCustomMode ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-outline-variant)]'
              }`}
            />
            {isCustomMode && customAmount && (
              <button 
                onClick={() => { setCustomAmount(''); setIsCustomMode(false); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-body-sm text-[var(--color-error)] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Impact Result Card */}
        <div className="lg:col-span-5 bg-[var(--color-surface-linen)] border border-[var(--color-alabaster)] p-6 rounded-lg relative overflow-hidden flex flex-col gap-6 h-full min-h-[300px]">
          {/* Progress Bar Top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--color-alabaster)]">
            <div 
              className="h-full bg-[var(--color-accent-terracotta)] transition-all duration-500 ease-out"
              style={{ width: `${activePercentage}%` }}
            />
          </div>

          {/* Card Header */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm">
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                {activeIcon}
              </span>
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-wider text-[var(--color-stone)] font-bold">Your Impact</div>
              <div className="text-body-lg font-bold text-[var(--color-primary)]">{activeHeadline}</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-body-md text-[var(--color-on-surface-variant)] flex-grow leading-relaxed">
            {activeImpactText}
          </p>

          {/* CTA Button */}
          <a
            href={siteConfig.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-container)] text-white py-4 rounded-[4px] text-label-caps font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Donate ₹{activeAmount || '...'} Now</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">volunteer_activism</span>
          </a>

          {/* Certifications footer */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--color-stone)] border-t border-[var(--color-outline-variant)]/30 pt-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[var(--color-accent-terracotta)]">verified</span>
              80G Exemption
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[var(--color-accent-terracotta)]">lock</span>
              Secure Razorpay
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
