import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';

@Component({
  selector: 'app-communication-details',
  templateUrl: './communication-details.component.html',
  styleUrls: ['./communication-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: BuildCommuniationsQueue,
    private _dialogRef: MatDialogRef<CommunicationDetailsComponent>,
  ) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._dialogRef.close();
  }
}
