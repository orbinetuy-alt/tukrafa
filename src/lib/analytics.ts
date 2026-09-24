type EventParameters = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, parameters: EventParameters = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, parameters);
}
