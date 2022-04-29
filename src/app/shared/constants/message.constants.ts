import { EmailMessageModel, TextMessageModel, VoiceMessageModel } from '../models/message/message.models';

// TODO: ATT & TMobile are discontinuing support for this technology as of June 1st 2021.

export const DEFAULT_CALLING_POST_SHORTCODE = '24251';

export const VOICE_MESSAGE_MODEL: VoiceMessageModel = {
  callerId: null,
  emailAlternateFormatSend: false,
  lat: null,
  phoneMessageSource: null,
  svm: false,
  textAlternateFormatSend: false,
  phoneMicrophoneMessage: {
    id: null,
    size: null,
    fileName: null,
    fileExtension: null,
  },
  phoneUploadedMessage: {
    id: null,
    size: null,
    fileName: null,
    fileExtension: null,
  },
  phoneTTSMessage: null,
  phoneTTSMessageSource: null,
  callMeFileLocation: null,
  voiceHidden: false,
};

export const TEXT_MESSAGE_MODEL: TextMessageModel = {
  sMSFromText: null,
  sMSMessage: null,
  textNumber: DEFAULT_CALLING_POST_SHORTCODE,
  smSTwoWayText: false,
  smsAllowedResponseYes: false,
  smsAllowedResponseNo: false,
  smsAllowedResponseMaybe: false,
  allowedResponses: [],
  smsHidden: false,
};

export const EMAIL_MESSAGE_MODEL: EmailMessageModel = {
  emailJson: null,
  emailBody: null,
  emailSubject: null,
  emailFromName: null,
  emailFrom: null,
  replyTo: null,
  emailHidden: false,
};

export const INITIAL_MESSAGE_MODEL = {
  ...VOICE_MESSAGE_MODEL,
  ...TEXT_MESSAGE_MODEL,
  ...EMAIL_MESSAGE_MODEL,
  messageName: null,
  attachments: [],
};
