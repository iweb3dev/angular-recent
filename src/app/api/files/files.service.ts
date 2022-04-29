import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import {
  MICROPHONE_FILE_UPLOAD,
  UPLOAD_MOBILE_MEMBER_IMAGE,
  UPLOAD_PHONE_MESSAGES,
  GET_GROUP_NAME_WAVE_FILE,
  UPLOAD_EMAIL_ATTACHMENTS,
  UPLOAD_FILES,
  TTS_VOICE_DATA,
} from './files.api';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private _http: Http, private __http: HttpClient) {}

  microphoneFileUpload(
    audioFile: string | ArrayBuffer,
    userId: number
  ): Observable<FileUploadDto> {
    const formData = new FormData();
    formData.append('placeholderkey', audioFile as string);
    formData.append('userId', `${userId}`);

    return this.__http.post<FileUploadDto>(MICROPHONE_FILE_UPLOAD, formData);
  }

  uploadMessagesFile(file: File, userId: number): Observable<FileUploadDto> {
    const formData = new FormData();
    const userIdString = this.createUserIdString(userId);

    formData.append('file', file);
    formData.append('fileUploadObj', userIdString);

    return this._http.post<FileUploadDto, FormData>(
      UPLOAD_PHONE_MESSAGES,
      formData
    );
  }

  uploadAttachments(file: File, userId: number): Observable<FileUploadDto> {
    const formData = new FormData();
    const userIdString = this.createUserIdString(userId);

    formData.append('file', file);
    formData.append('fileUploadObj', userIdString);

    return this._http.post<FileUploadDto, FormData>(
      UPLOAD_EMAIL_ATTACHMENTS,
      formData
    );
  }

  uploadMobileMemberImage(
    file: File,
    userId: number
  ): Observable<FileUploadDto> {
    const formData = new FormData();
    const userIdString = this.createUserIdString(userId);

    formData.append('file', file);
    formData.append('fileUploadObj', userIdString);

    return this.__http.post<FileUploadDto>(
      UPLOAD_MOBILE_MEMBER_IMAGE,
      formData
    );
  }

  private createUserIdString(userId: number): string {
    return '{' + 'UserId' + ':' + userId + '}';
  }

  // This causes the system to post a wave file copy of the
  // group name to the file server for playback use in other systems.
  // Returns the name of the file created on the file server.
  getGroupNameWaveFileByGroupId(groupId: number): Observable<string> {
    return this._http.get<string>(GET_GROUP_NAME_WAVE_FILE(groupId));
  }

  uploadGroupMembersFile(
    file: File
  ): Observable<{ encryptedFileName: string }> {
    const formData = new FormData();

    formData.append('file', file);
    return this._http.post<{ encryptedFileName: string }>(
      UPLOAD_FILES,
      formData
    );
  }

  fetchTtsVoiceData(message: string): Observable<string> {
    return this._http.post(TTS_VOICE_DATA, { TTSText: message, TTSStorageTypeId: 3 });
  }
}
