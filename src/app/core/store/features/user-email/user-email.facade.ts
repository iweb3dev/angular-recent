import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { deleteUserEmailStart, updateUserEmailStart } from './user-email.actions';
import { UserEmail } from './user-email.model';
import { getAllUserEmails } from './user-email.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserEmailFacade {

  allUserEmails$ = this._store.select(getAllUserEmails);

  constructor(private _store: Store<AppState>) {}

  updateUserEmail(email: UserEmail, withoutToast: boolean = false) {
    this._store.dispatch(updateUserEmailStart({
      email: email
    }));
  }

  deleteUserEmail(emailId: number) {
    this._store.dispatch(deleteUserEmailStart({
      emailId: emailId
    }));
  }
}
