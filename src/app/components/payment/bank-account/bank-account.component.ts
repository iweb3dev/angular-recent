import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AccountTypes } from 'src/app/shared/models/enums/financials';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent implements OnInit {
  @Input()
  bankAccountForm: FormGroup;

  readonly AccountTypeOptions = [
    { name: 'Checking', accountType: AccountTypes.Checking },
    { name: 'Savings', accountType: AccountTypes.Savings },
  ];

  constructor() {}

  ngOnInit(): void {}
}
