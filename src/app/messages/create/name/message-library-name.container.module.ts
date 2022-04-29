import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MessageNameModule } from 'src/app/components/message-name/message-name.module';

import { MessageLibraryNameContainerComponent } from './message-library-name.container';

@NgModule({
  declarations: [MessageLibraryNameContainerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MessageNameModule,
  ],
})
export class MessageLibraryNameModule {}
