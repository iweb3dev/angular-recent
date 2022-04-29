import { createSelector } from '@ngrx/store';

import { hasEmailFormat, hasPhoneFormat, hasTextFormat } from 'src/app/shared/utils/message/notification-format.helper';

import { selectMessage } from '../new-message.selectors';

export const selectMessageDetails = createSelector(selectMessage, (state) => ({
  messageName: state.message.messageName,
  notificationFormatValue: state.notificationFormatValue,
  messageRecipients: state.messageRecipients,
}));

export const selectIsPreviousMessage = createSelector(selectMessage, (state) => state.isPreviousMessage);

export const selectName = createSelector(selectMessage, (state) => state.message.messageName);

export const selectRecipients = createSelector(selectMessage, (state) => state.messageRecipients);

export const selectFormats = createSelector(selectMessage, ({ notificationFormatValue }) => ({
  isTextMessage: hasTextFormat(notificationFormatValue),
  isPhoneMessage: hasPhoneFormat(notificationFormatValue),
  isEmailMessage: hasEmailFormat(notificationFormatValue),
}));

export const selectTextData = createSelector(selectMessage, ({ message }) => ({
  sMSFromText: message.sMSFromText,
  sMSMessage: message.sMSMessage,
  textNumber: message.textNumber,
  smSTwoWayText: message.smSTwoWayText,
  smsAllowedResponseYes: message.smsAllowedResponseYes,
  smsAllowedResponseNo: message.smsAllowedResponseNo,
  smsAllowedResponseMaybe: message.smsAllowedResponseMaybe,
  allowedResponses: message.allowedResponses,
  smsHidden: message.smsHidden,
}));

export const selectEmailData = createSelector(selectMessage, ({ message }) => ({
  emailSubject: message.emailSubject,
  emailFromName: message.emailFromName,
  emailFrom: message.emailFrom,
  replyTo: message.replyTo,
  emailJson: message.emailJson,
  emailBody: message.emailBody,
  emailHidden: message.emailHidden,
}));

export const selectVoiceData = createSelector(selectMessage, ({ message }) => ({
  callerId: message.callerId,
  emailAlternateFormatSend: message.emailAlternateFormatSend,
  lat: message.lat,
  phoneMessageSource: message.phoneMessageSource,
  svm: message.svm,
  textAlternateFormatSend: message.textAlternateFormatSend,
  phoneMicrophoneMessage: {
    id: message.phoneMicrophoneMessage.id,
    size: message.phoneMicrophoneMessage.size,
    fileName: message.phoneMicrophoneMessage.fileName,
    fileExtension: message.phoneMicrophoneMessage.fileExtension,
  },
  phoneUploadedMessage: {
    id: message.phoneUploadedMessage.id,
    size: message.phoneUploadedMessage.size,
    fileName: message.phoneUploadedMessage.fileName,
    fileExtension: message.phoneUploadedMessage.fileExtension,
  },
  phoneTTSMessage: message.phoneTTSMessage,
  phoneTTSMessageSource: message.phoneTTSMessageSource,
  callMeFileLocation: message.callMeFileLocation,
  voiceHidden: message.voiceHidden,
}));

export const selectCreateMessageState = createSelector(selectMessage, (state) => state.message);

export const selectCreateMessageId = createSelector(selectMessage, (state) => state.messageId);

export const selectEmailPreview = createSelector(selectMessage, ({ message }) => ({
  notificationName: message.messageName,
  callerId: message.callerId,
  from: message.emailFromName,
  subject: message.emailSubject,
  replyTo: message.emailFrom,
  emailBody: message.emailBody,
  emailJson: message.emailJson,
}));

export const selectTextPreview = createSelector(selectMessage, ({ message }) => ({
  notificationName: message.messageName,
  smsText: message.sMSMessage,
  callerId: message.callerId,
}));

export const selectVoicePreview = createSelector(selectMessage, ({ message }) => ({
  notificationName: message.messageName,
  svm: message.svm,
  textAlternateFormatSend: message.textAlternateFormatSend,
  emailAlternateFormatSend: message.emailAlternateFormatSend,
  lat: message.lat,
  callerId: message.callerId,
}));

export const selectAudioRecording = createSelector(selectMessage, (state) => state.audioRecordingUrl);

export const selectMessageNameValid = createSelector(selectMessage, (state) => state.nameValid);

export const selectMessageStateValid = createSelector(
  selectMessage,
  (state) => state.nameValid && (state.emailValid || state.textValid || state.voiceValid)
);

export const selectVoiceStateValid = createSelector(selectMessage, (state) => state.voiceValid);

export const selectTextStateValid = createSelector(selectMessage, (state) => state.textValid);

export const selectEmailStateValid = createSelector(selectMessage, (state) => state.emailValid);

export const selectMessageCreated = createSelector(selectMessage, (state) => state.messageCreated);

export const selectVoicePanelOpen = createSelector(selectMessage, (state) => state.voicePanelOpen);
export const selectTextPanelOpen = createSelector(selectMessage, (state) => state.textPanelOpen);
export const selectEmailPanelOpen = createSelector(selectMessage, (state) => state.emailPanelOpen);
