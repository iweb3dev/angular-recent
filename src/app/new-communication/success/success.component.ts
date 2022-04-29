import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewMessageFacade } from 'src/app/core/store/features/new-message/new-message.facade';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _newMessageFacade: NewMessageFacade,
  ) {}

  ngOnInit(): void {
    this._newMessageFacade.resetMessageState();
  }

  createNewMessage(): void {
    this._router.navigate(['../name'], { relativeTo: this._route });
  }
}
