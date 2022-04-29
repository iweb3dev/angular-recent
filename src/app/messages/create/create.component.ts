import { Component, OnDestroy, OnInit } from '@angular/core';

import { NewMessageFacade } from 'src/app/core/store/features/new-message/new-message.facade';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  constructor(private _newMessageFacade: NewMessageFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
