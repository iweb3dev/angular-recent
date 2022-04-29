import { MainUserInfoModel } from './../../../../core/store/features/user/user.model';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';
import { FilesService } from 'src/app/api/files/files.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { GroupSitesServices } from 'src/app/api/groupsites/groupsites.service';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { Picture } from 'src/app/api/shared/shared.models';

@Injectable()
export class ProfileImageService {
  constructor(
    private _toastService: ToastService,
    private _userFacade: UserFacade,
    private _filesService: FilesService,
    private _loaderService: LoaderService,
    private _groupSitesService: GroupSitesServices,
  ) {}

  saveUserPicture(user: MainUserInfoModel, userPicture: File) {
    let [attachmentFileName, attachmentFilePath] = ['', ''];
    const userId = user.id;
    this._filesService
      .uploadAttachments(userPicture, userId)
      .pipe(
        take(1),
        concatMap((attachmentResponse: any) => {
          attachmentFileName = attachmentResponse?.fileName;
          attachmentFilePath = attachmentResponse?.attachmentFilePath;
          return this._groupSitesService.getTemporaryGroupSiteImagePreview(
            userId,
            attachmentResponse,
          );
        }),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update image',
          );
          return throwError(response);
        }),
      )
      .subscribe((response) => {
        const userPictureDto: Picture = {
          imageID: response.imageID,
          tempImage: response.tempImage,
          fileName: attachmentFileName,
          attachmentFilePath: attachmentFilePath,
          imageContents: response.imageContents,
          pictureType: response.pictureType,
        };
        const combinedDto = {
          ...user,
          userPicture: userPictureDto,
        };
        return this._userFacade.saveProfileSettings({
          ...combinedDto,
        } as MainUserInfoModel);
      });
  }
}
