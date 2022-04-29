import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardToolbarComponent {
  @Input() text: string;
  @Input() icon: string;
  @Input() colorScheme: string;

  @Output() toolbarItemClicked: EventEmitter<string>;

  constructor() {
    this.toolbarItemClicked = new EventEmitter<string>();
  }

  public toolbarBtnOnCLick(item: string): void {
    this.toolbarItemClicked.emit(item);
  }
}
