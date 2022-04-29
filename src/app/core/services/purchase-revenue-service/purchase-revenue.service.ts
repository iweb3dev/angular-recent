import { Injectable } from '@angular/core';
import { CurrencyName } from '@shared/models/enums/financials';
import { CreditsTracker, PackageTracker } from './purchase-revenue.models';

declare global {
  interface Window {
    gtag: any;
    uetq: any;
    fbq: any;
    lintrk: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseRevenueService {
  sendPackagePurchaseRevenueEvent(packageTracker: PackageTracker): void {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-988590681/TZXwCJf11AcQ2eSy1wM',
        value: packageTracker.totalDue,
        currency: CurrencyName.USD,
        transaction_id: Math.floor(Math.random() * 900000) + 100000,
      });
    }
    if (window.uetq) {
      window.uetq.push('event', 'conversion', {
        event_category: 'Purchase Subscription',
        event_label: `Package ${packageTracker.id}`,
        event_value: 1,
        currency: CurrencyName.USD,
        revenue_value: packageTracker.totalDue,
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_name: `Package ${packageTracker.id}: ${packageTracker.packageName}`,
        value: packageTracker.totalDue,
        currency: CurrencyName.USD,
      });
    }
    if (window.lintrk) {
      window.lintrk('track', {
        conversion_id: 332977,
      });
    }
  }

  sendCreditsPurchaseRevenueEvent(creditsTracker: CreditsTracker): void {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-988590681/Ee31CMmWm20Q2eSy1wM',
        value: creditsTracker.amountPaid,
        currency: CurrencyName.USD,
        transaction_id: creditsTracker.transactionNumber,
      });
    }
    if (window.uetq) {
      window.uetq.push('event', 'conversion', {
        event_category: 'Purchase Subscription',
        event_label: creditsTracker.transactionNumber,
        event_value: creditsTracker.creditCount,
        currency: CurrencyName.USD,
        revenue_value: creditsTracker.amountPaid,
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_name: 'Credits',
        value: creditsTracker.amountPaid,
        currency: CurrencyName.USD,
        num_items: creditsTracker.creditCount,
      });
    }
    if (window.lintrk) {
      window.lintrk('track', {
        conversion_id: 332977,
      });
    }
  }
}
