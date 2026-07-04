/**
 * Animation constants — InAmigos Foundation
 * All motion uses a single easing curve for brand consistency.
 */

export const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const DURATIONS = {
  fadeUp: 800,
  imageHover: 600,
  underlineReveal: 300,
  buttonTransition: 300,
  navIndicator: 200,
  counterAnimation: 2000,
  heroSlideInterval: 5000,
  staggerDelay: 120,
} as const;

/** IntersectionObserver options for fade-up animations */
export const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};
