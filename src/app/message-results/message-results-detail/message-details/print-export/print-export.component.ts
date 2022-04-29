import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';

@Component({
  selector: 'app-print-export',
  templateUrl: './print-export.component.html',
  styleUrls: ['./print-export.component.scss']
})
export class PrintExportComponent implements OnInit, AfterViewInit {
  @Input() message: CommunicationResult;
  @Output() printingDone = new EventEmitter<void>();
  @ViewChild('print', { static: false }) printTemplate: ElementRef;
  @ViewChild('printBtn', { static: false }) printBtn: ElementRef;
  messageResult;

  constructor() {}

  private mapStatus(message: CommunicationResult) {
    const mapper = {
      [NotificationStatusTypes.completed]: {
        class: 'completed',
        label: 'COMPLETED'
      },
      [NotificationStatusTypes.started]: {
        class: 'in-progerss',
        label: 'IN PROGRESS'
      },
      [NotificationStatusTypes.scheduled]: {
        class: 'scheduled',
        label: 'SCHEDULED'
      },
      [NotificationStatusTypes.cancelled]: {
        class: 'cancelled',
        label: 'CANCELLED'
      }
    };

    return {
      ...message,
      status: mapper[message.notificationStatus]
    };
  }

  ngOnInit() {
    this.messageResult = this.mapStatus(this.message);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.printBtn.nativeElement.click();
      this.printingDone.emit();
    }, 1000);
  }
}
