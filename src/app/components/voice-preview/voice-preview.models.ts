export interface VoicePreviewDataModel {
  creationDate: string;
  notificationName: string;
  svm: boolean;
  textAlternateFormatSend: boolean;
  emailAlternateFormatSend: boolean;
  lat: string;
  callerId: string;
  showActions: boolean;
  filename: string | Blob;
}
