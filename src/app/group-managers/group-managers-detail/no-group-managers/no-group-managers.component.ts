import { Component, OnInit } from '@angular/core';
import { UserFacade } from '../../../core/store/features/user/user.facade';

@Component({
  selector: 'app-no-group-managers',
  templateUrl: './no-group-managers.component.html',
  styleUrls: ['./no-group-managers.component.scss']
})
export class NoGroupManagersComponent implements OnInit {

  steps = [
    'They will not be able to make purchases or invite other users.',
    'Invited users will receive an email invite that they must open and accept.',
    'Users will also be able to create new groups.',
  ];

  constructor(private _userFacade: UserFacade) {}

  ngOnInit(): void {
    this._userFacade.fetchUser();
  }

}
