import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDetailsComponent } from './message-details.component';
import { MessageDetailsOverviewComponent } from './overview/message-details-overview.component';
import { MessageDetailsDesktopComponent } from './desktop/message-details-desktop.component';
import { MessageDetailsMobileComponent } from './mobile/message-details-mobile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageRecipientsComponent } from './recipients/message-recipients.component';
import { MatTableModule } from '@angular/material/table';
import { PrintExportComponent } from './print-export/print-export.component';
import { NgxPrintModule } from 'ngx-print';
import { RouterModule } from '@angular/router';
import { PrintRecipientsComponent } from './print-recipients/print-recipients.component';
import { MessagePreviewModule } from '@components/message-preview/message-preview.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MessageDetailsComponent,
    MessageDetailsOverviewComponent,
    MessageDetailsDesktopComponent,
    MessageDetailsMobileComponent,
    MessageRecipientsComponent,
    PrintExportComponent,
    PrintRecipientsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BottomSheetModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    NgxPrintModule,
    RouterModule,
    MessagePreviewModule,
    PipesModule
  ],
})
export class MessageDetailsModule {}
