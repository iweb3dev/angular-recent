export interface PackageTracker {
  totalDue: number;
  id: number;
  packageName: string;
}

export interface CreditsTracker {
  amountPaid: number;
  transactionNumber: string;
  creditCount: number;
}
