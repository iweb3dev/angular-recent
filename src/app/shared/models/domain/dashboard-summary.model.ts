export class DashboardSummary {
  communicationsSent: number;
  endpointsSentTo: number;
  timeSavings: string;

  constructor(obj: Partial<DashboardSummary>) {
    Object.assign(this, obj);
  }
}
