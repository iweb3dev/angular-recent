import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilesService } from 'src/app/api/files/files.service';
import { GroupStats } from 'src/app/api/groups/groups.models';
import { GroupService } from 'src/app/api/groups/groups.service';
import { MessagesService } from 'src/app/api/messages/messages.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import {
  MessageModel,
  SelectedMessagesModel,
} from 'src/app/shared/models/message/message.models';

@Injectable({ providedIn: 'root' })
export class CreateMessageService {
  constructor(
    private _matDialog: MatDialog,
    private _toastService: ToastService,
    private _filesService: FilesService,
    private _groupService: GroupService,
    private _messagesService: MessagesService,
  ) {}

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  createMessageRecord(
    userId: number,
    message: MessageModel,
    messageFormats: SelectedMessagesModel,
  ): Observable<number> {
    return this._messagesService.createMessageRecord(
      userId,
      message,
      messageFormats,
    );
  }

  updateMessageRecord(
    userId: number,
    messageId: number,
    message: MessageModel,
  ): Observable<number> {
    return this._messagesService.updateMessage(userId, message, messageId);
  }

  uploadEmailAttachments(
    file: File,
    userId: number,
  ): Observable<FileUploadDto> {
    return this._filesService.uploadAttachments(file, userId);
  }

  openMessagePreview<T, R>(component: ComponentType<T>, injectorData: R): void {
    this._matDialog.open(component, {
      height: 'min-content',
      minWidth: '340px',
      maxWidth: '80vw',
      autoFocus: false,
      data: {
        ...injectorData,
        creationDate: Date.now(), // TODO: figure out whether needed for message preview
        showActions: false,
      },
    });
  }

  fetchGroupStats(groupIds: number[]): Observable<GroupStats[]> {
    const groupsRequests = groupIds.map((id) =>
      this._groupService.getGroupWithStats(id),
    );

    return forkJoin(groupsRequests).pipe(
      map((groups) => groups.map((group) => group.groupStats)),
    );
  }
}
