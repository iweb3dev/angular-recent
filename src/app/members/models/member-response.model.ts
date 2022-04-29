export interface MemberResponseModel {
  exceptionDetails: string;
  hasExceptions: boolean;
  hasValidationErrors: boolean;
  passedInID: number;
  returnedID: number;
  success: boolean;
  validationErrorDetails: string;
}
