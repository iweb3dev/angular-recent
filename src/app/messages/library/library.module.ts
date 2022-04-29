import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library.routes';
import { LibraryContainerComponent } from './library.container';
import { LibraryResolver } from './library.resolver';
import { MessageListModule } from './message-list/message-list.module';
import { MessageFiltersModule } from './message-filters/message-filters.module';
import { MoreActionsModule } from './more-actions/more-actions.module';
import { LibraryService } from './library.service';
import { MatDividerModule } from '@angular/material/divider';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunicationDetailsService } from 'src/app/new-communication/communication-details/communication-details.service';

@NgModule({
  declarations: [LibraryComponent, LibraryContainerComponent],
  imports: [
    SearchModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    MessageListModule,
    MoreActionsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    MessageFiltersModule,
  ],
  providers: [LibraryResolver, LibraryService, CommunicationDetailsService],
})
export class LibraryModule {}
