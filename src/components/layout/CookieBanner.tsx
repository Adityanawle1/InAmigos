'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show the banner if no consent has been given yet
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) return null;

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t shadow-lg" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-alabaster)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-body-sm flex-1" style={{ color: 'var(--color-on-surface-variant)' }}>
          We use cookies to improve your experience and analyze site traffic. 
          By clicking &quot;Accept All&quot;, you consent to our use of cookies.
        </div>
        <div className="flex gap-3 shrink-0 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 border rounded-md text-label-caps transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            style={{ borderColor: 'var(--color-outline)', color: 'var(--color-stone)' }}
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-4 py-2 rounded-md text-label-caps transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
