export interface IDashboardSummaryResponse {
  communicationsSent: number;
  endpointsSentTo: number;
  emailsAttempted: number;
  callsAttempted: number;
  smsAttempted: number;
  timeSavings: string;
}
