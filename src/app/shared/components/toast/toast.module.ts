import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastComponent } from './toast.component';
import { ValidatorToastComponent } from './validator-toast/validator-toast.component';

@NgModule({
  declarations: [ToastComponent, ValidatorToastComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
})
export class ToastModule {}
