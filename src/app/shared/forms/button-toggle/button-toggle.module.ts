import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ButtonToggleComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ButtonToggleComponent],
})
export class ButtonToggleModule {}
