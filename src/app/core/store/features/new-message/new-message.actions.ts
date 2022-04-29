import { createAction, props } from '@ngrx/store';
import { MessageNameModel } from 'src/app/components/message-name/message-name.models';

import { MessageModel } from 'src/app/shared/models/message/message.models';

export const submitNewMessage = createAction(
  '[Create Message Actions] Submit Message',
  props<{ createCommunication: boolean; messageId?: number }>()
);

export const resetCreateMessageState = createAction('[Create Message Actions] Reset Schedule State');

export const verifyUnsavedChange = createAction('[Create Message Actions] Verify Unsaved Changes');

export const setCreateMessageName = createAction(
  '[Create Message Actions] Set Create Message Name Data',
  props<{ data: Partial<MessageNameModel & { messageId: number; isPreviousMessage: boolean }> }>()
);

export const updateMessage = createAction('[Create Message Actions] Update Message', props<{ updateParams: Partial<MessageModel> }>());

export const emailMessageFormatChange = createAction('[Create Message Actions] Email Format Change');

export const voiceMessageFormatChange = createAction('[Create Message Actions] Voice Message Format Change');

export const textMessageFormatChange = createAction('[Create Message Actions] Text Format Change');

export const setPlayBackAudio = createAction('[Create Message Actions] Set PlayBack Audio', props<{ fileUrl: string }>());

export const queueCommunication = createAction('[Create Message Actions] Queue Communication');

export const updateCommunicationQueue = createAction('[Create Message Actions] Update Communication Queue');

export const openPreviousMessage = createAction(
  '[Create Message Actions] Open Previous Message',
  props<{ id: number; isIncludeTextMessage: boolean }>()
);

export const setPreviousMessage = createAction('[Create Message Actions] Set Previous Message', props<{ id: number }>());

export const showConfirmCommunicationPopup = createAction('[Create Message Actions] Show Confirm Communication Popup');

export const createCommunicationSuccess = createAction('[Create Message Actions] Create Communication Success');

export const createCommunicationFailure = createAction('[Create Message Actions] Create Communication Failure');
