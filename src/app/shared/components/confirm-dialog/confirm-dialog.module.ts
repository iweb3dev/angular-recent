import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    MatDialogModule
  ]
})
export class ConfirmDialogModule {}
