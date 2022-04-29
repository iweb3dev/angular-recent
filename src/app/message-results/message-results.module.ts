import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageResultsComponent } from './message-results.component';
import { MessageResultsRoutingModule } from './message-results.routes';
import { StoreModule } from '@ngrx/store';
import * as fromMessageResults from './store/message-results.store';
import { EffectsModule } from '@ngrx/effects';

import { MessageResultsDetailModule } from './message-results-detail/message-results-detail.module';

@NgModule({
  declarations: [MessageResultsComponent],
  imports: [
    CommonModule,
    MessageResultsRoutingModule,
    MessageResultsDetailModule,
    StoreModule.forFeature(
      fromMessageResults.featureStore,
      fromMessageResults.reducers,
    ),
    EffectsModule.forFeature(fromMessageResults.effects),
  ],
})
export class MessageResultsModule {}
