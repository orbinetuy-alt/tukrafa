type EventParameters = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, parameters: EventParameters = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, parameters);
}
