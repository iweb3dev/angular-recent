import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChartOptions } from 'chart.js';
import { Color, Label, SingleOrMultiDataSet } from 'ng2-charts';

import { CommunicationResult } from '@core/store/features/communications/communications.models';

@Component({
  selector: 'app-recent-message-results',
  templateUrl: './recent-message-results.component.html',
  styleUrls: ['./recent-message-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentMessageResultsComponent {
  @Input() set lastCommunication(value: Array<unknown>) {
    if (!value.length) {
      return;
    }
    [this.communication] = value;
    this.setCommunicationDetail(this.communication);
  }

  public communication;

  public readonly chartType = 'pie';
  public readonly chartLegend = true;

  public chartData: SingleOrMultiDataSet = [1, 1, 1];
  public readonly chartLabels: Array<Label> = ['Sent', 'Pending', 'Failed'];

  public readonly chartColors: Array<Color> = [
    {
      backgroundColor: ['#a4dcec', '#b4acfc', '#eabce4'],
    },
  ];
  public readonly chartOptions: ChartOptions = {
    responsive: true, // FIXME: Limitation in older version of chart.js
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true,
      },
    },
  };

  private setCommunicationDetail(communication: CommunicationResult) {
    const sent =
      communication.smSsDeliverd +
      communication.callsDeliverd +
      communication.emailsDeliverd;

    const failed =
      communication.smSsUnDelivered +
      communication.callsUnDelivered +
      communication.emailsUnDelivered;

    const pending =
      communication.smSsToMake +
      communication.callsToMake +
      communication.emailsToMake -
      (sent + failed);

    this.chartData = [sent, pending, failed];
  }
}
