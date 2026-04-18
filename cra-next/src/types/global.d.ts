export {};

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

interface TikTokPixel {
  load: (id: string, options?: Record<string, unknown>) => void;
  page: () => void;
  track: (event: string, params?: Record<string, unknown>) => void;
  identify: (params: Record<string, unknown>) => void;
  instance: (id: string) => TikTokPixel;
}

type ClarityFn = (action: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ttq?: TikTokPixel;
    clarity?: ClarityFn;
  }
}
