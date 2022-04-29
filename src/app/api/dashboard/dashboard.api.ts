export const DASHBOARD_SUMMARY_ENDPOINT = `/api/communications/summarybydaterange`;

export const DASHBOARD_GET_SUMMARY_BY_DATES
  = (startDate?: string, endDate?: string) =>
  `${DASHBOARD_SUMMARY_ENDPOINT}?startDate=${startDate}&endDate=${endDate}`;
