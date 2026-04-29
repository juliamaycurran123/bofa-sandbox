import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  customerId?: string;
  timestamp?: number;
}

declare global {
  interface Window {
    cvanalytics?: {
      track(event: AnalyticsEvent): void;
      identify(customerId: string, traits?: Record<string, any>): void;
      page(name: string, properties?: Record<string, any>): void;
    };
  }
}

/**
 * Shim around the proprietary cvanalytics browser SDK. The SDK is loaded
 * via a script tag in the corporate page header (handled by the platform
 * shell). This service provides a typed wrapper.
 *
 * If the global `cvanalytics` is unavailable (e.g., local dev without the
 * shell), events are buffered and flushed when the SDK becomes available.
 */
@Injectable()
export class AnalyticsService {
  private buffer: AnalyticsEvent[] = [];
  private flushInterval: any;

  constructor() {
    this.flushInterval = setInterval(() => this.flushIfReady(), 2000);
  }

  trackEvent(name: string, properties?: Record<string, any>): void {
    const evt: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now()
    };
    if (window.cvanalytics) {
      window.cvanalytics.track(evt);
    } else {
      this.buffer.push(evt);
      if (!environment.production) {
        console.debug('[analytics:buffered]', evt);
      }
    }
  }

  trackPage(name: string, properties?: Record<string, any>): void {
    if (window.cvanalytics) {
      window.cvanalytics.page(name, properties);
    } else {
      this.buffer.push({ name: `page:${name}`, properties, timestamp: Date.now() });
    }
  }

  identify(customerId: string, traits?: Record<string, any>): void {
    if (window.cvanalytics) {
      window.cvanalytics.identify(customerId, traits);
    }
  }

  private flushIfReady(): void {
    if (!window.cvanalytics || this.buffer.length === 0) return;
    for (const evt of this.buffer) {
      window.cvanalytics.track(evt);
    }
    this.buffer = [];
  }
}
