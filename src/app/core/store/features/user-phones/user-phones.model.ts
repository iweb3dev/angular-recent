import { VerificationType } from 'src/app/shared/components/verify-phone/models/verify-phone.models';

export interface UserPhone {
  phoneNumber: string;
  isActive: boolean;
  isPrimary: boolean;
  phoneNumberLocation: number;
  id: number;
  isValidated: boolean;
}

export interface UserPhoneVerification {
  isValidating: boolean;
  phoneNumber: string;
  verificationCode: number;
  verificationId: number;
  verificationType: VerificationType;
}

export interface UserPhoneVerificationWithPin {
  pin: number;
  countryCode: number;
  phoneNumber: string;
}
