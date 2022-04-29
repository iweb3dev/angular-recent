import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

@Component({
  selector: 'app-no-phone-numbers',
  templateUrl: './no-phone-numbers.component.html',
  styleUrls: ['./no-phone-numbers.component.scss'],
})
export class NoPhoneNumbersComponent implements OnInit {
  @Input()
  customerProfileId: number;

  @Input()
  userInfo: MainUserInfoModel;

  @Output()
  receivePurchasedNumber = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
