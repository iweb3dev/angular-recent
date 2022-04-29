import { Action, createReducer, on } from '@ngrx/store';

import { INITIAL_MESSAGE_MODEL } from 'src/app/shared/constants/message.constants';

import { updateMessage, setCreateMessageName, resetCreateMessageState, setPlayBackAudio } from '../new-message.actions';
import { MessageStateModel } from '../new-message.models';

import {
  deleteEmailAttachment,
  setNotificationId,
  setEmailAttachment,
  setTextValid,
  setEmailValid,
  setVoiceValid,
  setNameValid,
  setNotificationFormatValue,
  createMessageSuccess,
  createMessageFailure,
  setMessageCreation,
  saveAndContinue,
  voicePanelOpen,
  textPanelOpen,
  emailPanelOpen,
  resetStore,
} from './create-message.actions';

export const MESSAGE_INITIAL_STATE: MessageStateModel = {
  messageId: null,
  audioRecordingUrl: null,
  notificationFormatValue: null,
  messageRecipients: [],
  isPreviousMessage: false,
  textValid: false,
  emailValid: false,
  voiceValid: false,
  nameValid: false,
  message: INITIAL_MESSAGE_MODEL,
  messageCreated: false,
  voicePanelOpen: false,
  textPanelOpen: false,
  emailPanelOpen: false,
};

const reducer = createReducer(
  MESSAGE_INITIAL_STATE,
  on(resetStore, () => MESSAGE_INITIAL_STATE),
  on(setCreateMessageName, (state, { data }) => {
    const newState = {
      ...state,
      messageId: data.messageId,
      isPreviousMessage: data.isPreviousMessage,
      messageRecipients: data.messageRecipients ?? state.messageRecipients,
      notificationFormatValue: data.notificationFormatValue ?? state.notificationFormatValue,
      message: {
        ...state.message,
        messageName: data.messageName,
      },
    };

    return newState;
  }),
  on(createMessageSuccess, (state, { messageId }) => ({
    ...state,
    messageCreated: true,
    messageId: messageId,
  })),
  on(createMessageFailure, (state) => ({
    ...state,
    messageCreated: false,
  })),
  on(setMessageCreation, (state, { messageCreated }) => ({
    ...state,
    messageCreated: messageCreated,
  })),
  on(updateMessage, (state, action) => {
    const newState = {
      ...state,
      message: { ...state.message, ...action.updateParams },
    };

    return newState;
  }),
  on(setEmailAttachment, (state, action) => ({
    ...state,
    message: {
      ...state.message,
      attachments: [...state.message.attachments, action.attachment],
    },
  })),
  on(deleteEmailAttachment, (state, action) => {
    const attachments = state.message.attachments.filter((attachment, _, self) => self.indexOf(attachment) !== action.fileIndex);

    return {
      ...state,
      message: { ...state.message, attachments },
    };
  }),
  on(setNotificationId, (state, action) => ({
    ...state,
    messageId: action.messageId,
  })),
  on(resetCreateMessageState, (state, action) => MESSAGE_INITIAL_STATE),
  on(setPlayBackAudio, (state, action) => ({
    ...state,
    audioRecordingUrl: action.fileUrl,
  })),
  on(setTextValid, (state, action) => {
    return { ...state, textValid: action.valid };
  }),
  on(setEmailValid, (state, action) => ({
    ...state,
    emailValid: action.valid,
  })),
  on(setVoiceValid, (state, action) => ({
    ...state,
    voiceValid: action.valid,
  })),
  on(setNameValid, (state, action) => ({ ...state, nameValid: action.valid })),
  on(setNotificationFormatValue, (state, action) => ({
    ...state,
    notificationFormatValue: action.notificationFormatValue,
  })),
  on(saveAndContinue, (state, action) => {
    let newState = { ...state, voicePanelOpen: false };

    if (state.voicePanelOpen) {
      newState = {
        ...state,
        voicePanelOpen: false,
      };
    }

    if (state.textPanelOpen) {
      newState = {
        ...state,
        textPanelOpen: false,
      };
    }

    if (state.emailPanelOpen) {
      newState = {
        ...state,
        emailPanelOpen: false,
      };
    }

    return newState;
  }),
  on(voicePanelOpen, (state, action) => ({
    ...state,
    voicePanelOpen: action.open,
  })),
  on(textPanelOpen, (state, action) => ({
    ...state,
    textPanelOpen: action.open,
  })),
  on(emailPanelOpen, (state, action) => ({
    ...state,
    emailPanelOpen: action.open,
  }))
);

export function createMessageReducer(state: MessageStateModel, action: Action): MessageStateModel {
  return reducer(state, action);
}
