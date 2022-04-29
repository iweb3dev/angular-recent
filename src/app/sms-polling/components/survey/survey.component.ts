import { take, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { CommunicationEndPointResponse, GetPossibleSurveyResponses, SMSResponse } from 'src/app/api/communications/communications.models';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  selectedResponse: GetPossibleSurveyResponses;
  responses: GetPossibleSurveyResponses[] = [];
  destroyed$ = new Subject<boolean>();
  memberID: number;

  constructor(
    private _communicationService: CommunicationsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
    .pipe(takeUntil(this.destroyed$))
    .subscribe(params => {
      const message = params['args'];
      if (message) {
        this.getCommunicationEndPointResponseArgs(message);
      }
    });
  }

  private getCommunicationEndPointResponseArgs(message: string) {
    this._communicationService.getCommunicationEndPointResponseArgs(message)
    .pipe(take(1))
    .subscribe((res: CommunicationEndPointResponse) => {
      if (res) {
        this.memberID = res.memberID;
        this.getPossibleSurveyResponses(res.communicationID);
      }
    });
  }

  private getPossibleSurveyResponses(communicationId: number) {
    this._communicationService.getPossibleSurveyResponses(communicationId)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res: GetPossibleSurveyResponses[]) => {
      if (res) {
        this.responses = res;
      }
    });
  }

  public submitResponse() {
    const body: SMSResponse = {
      smsKey: this.selectedResponse.response,
      modifiedByUserID: this.memberID,
      modifiedByDateTime: new Date()
    };
    this._communicationService.saveCommunicationEndpointResponse(body)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res: boolean) => {

    });
  }
}
