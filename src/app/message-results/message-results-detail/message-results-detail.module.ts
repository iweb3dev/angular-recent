import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageResultFrameComponent } from './components/message-result-frame/message-result-frame.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MessageResultsFilterPipe } from './pipes/message-results-filter.pipe';
import { MessageResultsSettingsModule } from './filters/message-results-settings.module';
import { MessageResultsDetailComponent } from './message-results-detail.component';
import { MessageDetailsModule } from './message-details/message-details.module';
import { MatIconModule } from '@angular/material/icon';
import { MessagePreviewModule } from '@components/message-preview/message-preview.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MessageResultsDetailComponent,
    MessageResultFrameComponent,
    MessageResultsFilterPipe,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MessageResultsSettingsModule,
    MatMenuModule,
    MessageDetailsModule,
    ScrollingModule,
    MatIconModule,
    MessagePreviewModule,
    PipesModule
  ],
})
export class MessageResultsDetailModule {}
