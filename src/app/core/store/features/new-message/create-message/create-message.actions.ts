import { createAction, props } from '@ngrx/store';
import { NotificationFormatValues } from '@shared/models/message/message.models';

import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';

export const resetStore = createAction('[CreateMessage] Reset Store');

export const fetchEmailAttachment = createAction('[Create Message Actions] Upload Email Attachment', props<{ file: File }>());

export const setEmailAttachment = createAction(
  '[Create Message Actions] Set Uploaded Email Attachment',
  props<{ attachment: FileUploadDto }>()
);

export const deleteEmailAttachment = createAction('[Create Message Actions] Delete Email Attachment', props<{ fileIndex: number }>());

export const setNotificationId = createAction('[Create Message Actions] Set Message Notification Id', props<{ messageId: number }>());

export const openVoicePreview = createAction('[Create Message Actions] Open Voice Message Preview');

export const openTextPreview = createAction('[Create Message Actions] Open Text Message Preview');

export const openEmailPreview = createAction('[Create Message Actions] Open Email Message Preview');

export const setVoiceValid = createAction('[Create Message Actions] Set Voice Form Valid', props<{ valid: boolean }>());

export const setTextValid = createAction('[Create Message Actions] Set Text Form Valid', props<{ valid: boolean }>());

export const setEmailValid = createAction('[Create Message Actions] Set Email Form Valid', props<{ valid: boolean }>());

export const setNameValid = createAction('[Create Message Actions] Set Name Form Valid', props<{ valid: boolean }>());

export const setNotificationFormatValue = createAction(
  '[Create Message Actions] Set Notification Format Value',
  props<{ notificationFormatValue: NotificationFormatValues }>()
);

export const saveAndContinue = createAction('[Create Details Actions] Save And Continue', props<{ createCommunication: boolean }>());

export const saveAndContinueWithPreviousMessage = createAction(
  '[Create Details Actions] Save And Continue With Previous Message',
  props<{ messageId: number }>()
);

export const saveMessageInLibrary = createAction('[Create Message Actions] Save Message In Library');

export const createMessageRecord = createAction('[Create Message Actions] Create Message Record');

export const createMessageSuccess = createAction('[Create Message Actions] Create Message Record Success', props<{ messageId: number }>());

export const createMessageFailure = createAction('[Create Message Actions] Create Message Record Failure');

export const setMessageCreation = createAction('[Create Message Actions] Set Message Creation', props<{ messageCreated: boolean }>());

export const voicePanelOpen = createAction('[Create Message Actions] Voice Panel Open', props<{ open: boolean }>());

export const textPanelOpen = createAction('[Create Message Actions] Text Panel Open', props<{ open: boolean }>());

export const emailPanelOpen = createAction('[Create Message Actions] Email Panel Open', props<{ open: boolean }>());

export const createMessageRecordFromLibrary = createAction('[Create Message Actions] Create Message From Library');
