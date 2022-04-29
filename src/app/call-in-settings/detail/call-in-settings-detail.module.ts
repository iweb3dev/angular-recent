import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallInSettingsDetailComponent } from './call-in-settings-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { StepListModule } from 'src/app/shared/components/step-list/step-list.module';

@NgModule({
  declarations: [CallInSettingsDetailComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    StepListModule
  ],
})
export class CallInSettingsDetailModule {}
