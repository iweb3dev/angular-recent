import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const FILES_API = '/api/files';

export const UPLOAD_MOBILE_MEMBER_IMAGE = `${ALLOW_ANONYMOUS}${FILES_API}/memberimage`;
export const MICROPHONE_FILE_UPLOAD = `${ALLOW_ANONYMOUS}${FILES_API}/microphonefileupload`;
export const UPLOAD_PHONE_MESSAGES = `${FILES_API}/messages`;
export const GET_GROUP_NAME_WAVE_FILE = (groupId: number) => `${FILES_API}?${groupId}`;
export const UPLOAD_EMAIL_ATTACHMENTS = `${FILES_API}/emailattachments`;
export const TTS_VOICE_DATA = `${FILES_API}/tts`;

// Being used in groups module - members file upload
// After discussion with Tommy does not seem to be used
// for anything but just an example endpoint
export const UPLOAD_FILES = `${FILES_API}`;
