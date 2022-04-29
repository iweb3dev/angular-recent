import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FileReaderService } from 'src/app/core/services/file-reader/file-reader.service';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { ProfileImageService } from './profile-image.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileImageComponent),
      multi: true,
    },
  ],
})
export class ProfileImageComponent implements OnInit {
  public user: MainUserInfoModel;
  private pictureFile: File;
  public pictureType: string;

  public profilePicture: string;

  private readonly fileTypes = ['jpg', 'gif', 'png', 'jpeg'];
  public readonly defaultPicture = '/assets/img/avatar-placeholder.svg';
  private destroy$ = new Subject<any>();

  constructor(
    private _toastService: ToastService,
    private _fileReaderService: FileReaderService,
    private _profileImageService: ProfileImageService,
    private _userFacade: UserFacade,
  ) {}

  ngOnInit() {
    this._userFacade.currentUserInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user === null || !user || this.user) {
          this.user = user;
          return;
        }
        this.user = user;
        this.setUserImage(this.user);
      });
  }

  onImageChange(event) {
    this.pictureFile = (<HTMLInputElement>event?.target)?.files[0];
    this.pictureType = this.pictureFile?.type;

    const fileTypeIndex = this.fileTypes.findIndex((type) =>
      this.pictureType.toLowerCase()?.includes(type),
    );
    if (fileTypeIndex < 0) {
      this._toastService.addToast(
        ToastType.Error,
        'Please select a supported format (png, jpg, gif)',
      );
      return;
    }

    this._fileReaderService
      .readFile(this.pictureFile)
      .pipe(take(1))
      .subscribe((picture: string) => {
        this.profilePicture = picture;
        this._profileImageService.saveUserPicture(this.user, this.pictureFile);
      });
  }

  private setUserImage(user: MainUserInfoModel): void {
    if (!user?.userPicture?.imageContents) {
      return;
    }
    const type = user.userPicture.fileName.split('.')[1];
    this.profilePicture = `data:image\\${type};base64,${user.userPicture.imageContents}`;
  }
}
