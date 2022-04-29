import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BasePaymentProfile,
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';
import {
  CardTypes,
  PaymentPrograms,
  PaymentTypes,
} from 'src/app/api/shared/shared.enums';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { CreditCardPaymentType } from './payment-manager.models';

@Injectable({
  providedIn: 'root',
})
export class PaymentManagerService {
  constructor(private _financialsService: FinancialsService) {}

  deletePaymentProfile(
    paymentProfileId: number,
    customerProfileId: number
  ): Observable<object> {
    return this._financialsService.deletePaymentProfile(
      paymentProfileId,
      customerProfileId
    );
  }

  findPrimaryPaymentProfile(
    customerProfileId: number
  ): Observable<BasePaymentProfile> {
    // newly create customer is assigned 9 as customerProfileId
    if (customerProfileId === 0) {
      return of(null);
    }

    return this._financialsService
      .fetchFinancials(customerProfileId)
      .pipe(map((financials) => financials.find((card) => card.isPrimary)));
  }

  findPaymentProfiles(
    customerProfileId: number
  ): Observable<(PaymentProfileBankAccount & PaymentProfileCreditCard)[]> {
    if (customerProfileId === 0) {
      return of([]);
    }

    return this._financialsService.fetchFinancials(customerProfileId);
  }

  updatePaymentProfile(
    paymentProfileId: number,
    profile: Partial<PaymentProfile>
  ): Observable<BasePaymentProfile[]> {
    return this._financialsService.updatePaymentProfile(
      paymentProfileId,
      profile
    );
  }

  createNewProfile(
    data: Partial<PaymentProfile>,
    userInfo: MainUserInfoModel
  ): Observable<(PaymentProfileBankAccount & PaymentProfileCreditCard)[]> {
    return this._financialsService.savePaymentProfile(
      this.createNewProfileModel(data, userInfo)
    );
  }

  createPaymentProfileUpdateRequest(
    profile: BasePaymentProfile,
    data: Partial<PaymentProfile>
  ): Partial<PaymentProfile> {
    if (data.selectedPaymentProgram === PaymentPrograms.bankCreditCard) {
      return {
        ...data,
        bankAccount: this.createBankAccountUpdateModel(
          profile,
          data.bankAccount
        ),
      };
    }
    if (data.selectedPaymentProgram === PaymentPrograms.creditCard) {
      return {
        ...data,
        creditCard: this.createCreditCardUpdateModel(profile, data.creditCard),
      };
    }

    return null;
  }

  private createNewProfileModel(
    data: Partial<PaymentProfile>,
    userInfo: MainUserInfoModel
  ) {
    if (data.selectedPaymentProgram === PaymentPrograms.bankCreditCard) {
      return {
        ...data,
        bankAccount: this.createBankAccountNewProfileModel(data, userInfo),
      };
    }
    if (data.selectedPaymentProgram === PaymentPrograms.creditCard) {
      return {
        ...data,
        creditCard: this.createCreditCardNewProfileModel(data, userInfo),
      };
    }
  }

  private createBankAccountUpdateModel(
    profile: BasePaymentProfile,
    bankAccount: Partial<PaymentProfileBankAccount>
  ) {
    return {
      paymentType: profile.paymentType,
      routingNumber: bankAccount.routingNumber,
      accountNumber: bankAccount.accountNumber,
      bankName: bankAccount.bankName,
      maskedRoutingNumber: bankAccount.maskedRoutingNumber,
      nameOnAccount: bankAccount.nameOnAccount,
      accountType: bankAccount.accountType,
      ownerID: profile.ownerID,
      customerProfileID: profile.customerProfileID,
      paymentProfileID: profile.paymentProfileID,
      isPrimary: profile.isPrimary,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber?.toString(),
      addressLine1: profile.addressLine1,
      addressLine2: profile.addressLine2,
      city: profile.city,
      state: profile.state,
      zip: profile.zip?.toString(),
      country: profile.country,
      emailAddress: profile.emailAddress,
      ccEmailAddress: profile.ccEmailAddress,
      id: profile.id,
      flaggedForDelete: profile.flaggedForDelete,
    };
  }

  private createCreditCardUpdateModel(
    profile: BasePaymentProfile,
    creditCard: Partial<PaymentProfileCreditCard>
  ): PaymentProfileCreditCard {
    return {
      paymentType: profile?.paymentType,
      creditCardNumber: creditCard.creditCardNumber,
      expirationNotice: creditCard.expirationNotice,
      cardNumber: creditCard.creditCardNumber,
      expirationMonth: creditCard.expirationNotice.getMonth() + 1,
      expirationYear: creditCard.expirationNotice.getFullYear(),
      cardCode: creditCard.cardCode,
      ownerID: profile.ownerID,
      customerProfileID: profile.customerProfileID,
      paymentProfileID: profile.paymentProfileID,
      isPrimary: creditCard.isPrimary,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber?.toString(),
      addressLine1: creditCard.addressLine1 ?? profile.addressLine1,
      addressLine2: profile.addressLine2,
      city: creditCard.city ?? profile.city,
      state: creditCard.state ?? profile.state,
      zip: creditCard.zip ?? profile.zip?.toString(),
      country: creditCard.country ?? profile.country,
      emailAddress: creditCard.emailAddress ?? profile.emailAddress,
      ccEmailAddress: profile.ccEmailAddress,
      id: profile.id,
      flaggedForDelete: profile.flaggedForDelete,
      cardType: CardTypes.unknown,
      isExpiring: false,
    };
  }

  private createBankAccountNewProfileModel(
    { bankAccount }: Partial<PaymentProfile>,
    userInfo: MainUserInfoModel
  ): Partial<PaymentProfileBankAccount> {
    return {
      accountNumber: bankAccount.accountNumber,
      accountType: bankAccount.accountType,
      bankName: bankAccount.bankName,
      nameOnAccount: bankAccount.nameOnAccount,
      routingNumber: bankAccount.routingNumber,
      customerProfileID: userInfo.customerProfileID,
      emailAddress: null,
      ownerID: userInfo.id,
      paymentType: PaymentTypes.echeck,
      isPrimary: bankAccount.isPrimary,
    };
  }

  private createCreditCardNewProfileModel(
    { creditCard }: Partial<PaymentProfile>,
    userInfo: MainUserInfoModel
  ): Partial<PaymentProfileCreditCard> {
    return {
      customerProfileID: userInfo.customerProfileID,
      cardNumber: creditCard.creditCardNumber,
      addressLine1: creditCard.addressLine1,
      cardCode: creditCard.cardCode,
      city: creditCard.city,
      emailAddress: creditCard.emailAddress,
      expirationMonth: creditCard.expirationNotice.getMonth() + 1,
      expirationYear: creditCard.expirationNotice.getFullYear(),
      ownerID: userInfo.id,
      paymentType: PaymentTypes.creditCard,
      state: creditCard.state,
      zip: creditCard.zip,
      isPrimary: creditCard.isPrimary,
    };
  }
}
