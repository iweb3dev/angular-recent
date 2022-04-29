import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { ICommunicationResponse } from 'src/app/shared/models/contracts/ICommunicationsResponse.interface';
import { Communication } from 'src/app/shared/models/domain/communication.model';
import {
  getAllCommunicationsError,
  getAllCommunicationsResolve,
  getAllCommunicationsStart,
  getCommunicationResultsError,
  getCommunicationResultsResolve,
  getCommunicationResultsStart,
} from './communications.actions';
import { CommunicationResult } from './communications.models';
import { removeLoader } from 'src/app/core/store/features/loader/loader.actions';

@Injectable({
  providedIn: 'root',
})
export class CommunicationsEffects {
  constructor(
    private _actions$: Actions,
    private _toastService: ToastService,
    private _communicationsService: CommunicationsService,
  ) {}

  getAllCommunications = createEffect(() =>
    this._actions$.pipe(
      ofType(getAllCommunicationsStart),
      switchMap(() =>
        this._communicationsService.getAllCommunications().pipe(
          switchMap((res: ICommunicationResponse) => [
            getAllCommunicationsResolve({
              communications: res.pagedObjects?.map(
                (com) => new Communication({ ...com }),
              ),
            }),
          ]),
          catchError(() => of(getAllCommunicationsError())),
        ),
      ),
    ),
  );

  getCommunicationsResultsStart = createEffect(() =>
    this._actions$.pipe(
      ofType(getCommunicationResultsStart),
      switchMap(() =>
        this._communicationsService.getCommunicationsResults(0, 3, 25, 0).pipe(
          switchMap((res) => {
            return [
              getCommunicationResultsResolve({
                communications: res.pagedObjects.map(
                  (s) => ({ ...s } as CommunicationResult),
                ),
              }),
            ];
          }),
          catchError(() => of(getCommunicationResultsError())),
        ),
      ),
    ),
  );

  getCommunicationResultsError = createEffect(
    () =>
      this._actions$.pipe(
        ofType(getCommunicationResultsError),
        tap(() =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed getting communication results`,
          ),
        ),
      ),
    { dispatch: false },
  );
}
