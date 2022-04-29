import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create.routes';
import { MessageLibraryNameModule } from './name/message-library-name.container.module';

import { MessageLibraryDetailsModule } from './details/message-library-details.container.module';
import { MessageLibraryCreateEffects } from './state/message-library-create.effects';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    MessageLibraryNameModule,
    MessageLibraryDetailsModule,
    EffectsModule.forFeature([MessageLibraryCreateEffects]),
  ],
  providers: [],
})
export class CreateModule {}
