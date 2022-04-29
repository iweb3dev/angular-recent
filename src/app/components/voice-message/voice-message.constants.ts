import { PhoneMessageSourceTypes } from 'src/app/shared/models/message/message.models';

export const TOOLTIP_MESSAGES = {
  SVM: `Your message will go straight to voicemail versus attempting to establish a live connection with a group member.  Your members must have voicemail set up on their cell phones to receive these messages.  Answering machines on landlines are also valid.`,
  DeliverAsEmail: `Members with an email address in addition to the voice message will receive an email with the attached voice message file. (.wav)`,
  DeliverAsText: `Opted in members in addition to the voice message will also receive a text message with a clickable link to play your voice message file.`,
  LAT: `“When you choose this option, you can enter a phone number that your message’s recipients can ask to be transferred to by pressing 0.” `,
};

export const phoneMessageSourceLabels = {
  [PhoneMessageSourceTypes.CallIn]: 'Record from my phone',
  [PhoneMessageSourceTypes.Microphone]: 'Use Microphone',
  [PhoneMessageSourceTypes.TTS]: 'Use Keyboard (TTS)',
  [PhoneMessageSourceTypes.Upload]: 'Upload WAV file',
};

export const phoneMessageSources = [
  PhoneMessageSourceTypes.CallIn,
  PhoneMessageSourceTypes.Microphone,
  PhoneMessageSourceTypes.TTS,
  PhoneMessageSourceTypes.Upload,
];
