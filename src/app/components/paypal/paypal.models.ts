export interface PayPalData {
  cost: number;
  name: string;
}

export interface PayPalCaptureModel {
  create_time: string;
  update_time?: string;
  intent: 'CAPTURE';
  id: string;
  payer: PayPalPayerModel;
  purchase_units: any[];
  status: PayPalStatusTypes;
  links: any[];
}

// https://developer.paypal.com/docs/api/orders/v2/

export enum PayPalStatusTypes {
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Saved = 'SAVED',
  Voided = 'VOIDED',
  PayerActionRequired = 'PAYER_ACTION_REQUIRED',
}

export interface PayPalPayerModel {
  email_address: string;
  payer_id: string;
  birth_date: string;
  name: { give_name: string; surname: string };
}
