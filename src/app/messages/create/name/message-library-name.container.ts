import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageNameModel } from 'src/app/components/message-name/message-name.models';
import { CreateMessageFacade } from 'src/app/core/store/features/new-message/create-message/create-message.facade';
import { NewMessageFacade } from 'src/app/core/store/features/new-message/new-message.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

@Component({
  templateUrl: './message-library-name.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageLibraryNameContainerComponent implements OnInit {
  messageNameData$ = this._createMessageFacade.messageNameData$;
  userInfo$ = this._userFacade.currentUserInfo$;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userFacade: UserFacade,
    private _newMessageFacade: NewMessageFacade,
    private _createMessageFacade: CreateMessageFacade,
  ) {}

  ngOnInit(): void {}

  onSendMessageFormChange(data: MessageNameModel): void {
    this._newMessageFacade.saveMessageNameFormData(data);
  }

  onProceedToDetails(): void {
    this._router.navigate(['../details'], { relativeTo: this._activatedRoute });
  }

  backToMessageLibrary(): void {
    this._router.navigate(['../../library'], {
      relativeTo: this._activatedRoute,
    });
  }

  onEmailFormatChange(): void {
    this._newMessageFacade.emailFormatChange();
  }

  onVoiceFormatChange(): void {
    this._newMessageFacade.voiceFormatChange();
  }

  onTextFormatChange(): void {
    this._newMessageFacade.textFormatChange();
  }
}
