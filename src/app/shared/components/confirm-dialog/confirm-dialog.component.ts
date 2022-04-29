import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmDialogOptions } from './services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public options: ConfirmDialogOptions & { next: Subject<boolean> }) {}

  ngOnInit(): void {
  }

  onConfirm() {
    this.options.next.next(true);
  }

  onCancel() {
    this.options.next.next(false);
  }
}
