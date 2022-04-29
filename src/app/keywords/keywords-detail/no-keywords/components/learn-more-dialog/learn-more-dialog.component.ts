import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-more-dialog',
  templateUrl: './learn-more-dialog.component.html',
  styleUrls: ['./learn-more-dialog.component.scss']
})
export class LearnMoreDialogComponent implements OnInit {

  steps = [
    'Identify your account number and PIN below.',
    'Call 1-877-304-7678 from anywhere and any device. no internet connection required.',
    'Work with groups and send messages straight from your phone.',
  ];


  constructor() {}

  ngOnInit(): void {
  }

}
