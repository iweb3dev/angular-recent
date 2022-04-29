import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { GetPossibleSurveyResponses, CommunicationEndPointResponse, SMSResponse, CommunicationEndPointResponseRollup } from 'src/app/api/communications/communications.models';
import { CommunicationsService } from 'src/app/api/communications/communications.service';

@Component({
  selector: 'app-survey-new',
  templateUrl: './survey-new.component.html',
  styleUrls: ['./survey-new.component.scss']
})
export class SurveyNewComponent implements OnInit, OnDestroy {
  selectedResponse: GetPossibleSurveyResponses;
  responses: GetPossibleSurveyResponses[] = [];
  destroyed$ = new Subject<boolean>();
  memberID: number;
  isSubmitted = false;
  isSuccess = false;
  question: CommunicationEndPointResponseRollup;
  encryptedArgString: any;

  constructor(
    private _communicationService: CommunicationsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
    .pipe(takeUntil(this.destroyed$))
    .subscribe(params => {
      this.encryptedArgString = params['args'];
      if (this.encryptedArgString) {
        this.getCommunicationEndPointResponseArgs(this.encryptedArgString);
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
        this.getCommunicationEndPointResponsesRollup(res.communicationID);
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

  private getCommunicationEndPointResponsesRollup(communicationId: number) {
    this._communicationService.getCommunicationEndPointResponsesRollup(communicationId)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res: CommunicationEndPointResponseRollup[]) => {
      if (res) {
        this.question = res[0];
      }
    });
  }

  public submitResponse() {
    const body: SMSResponse = {
      smsKey: this.encryptedArgString + '-' + this.selectedResponse.responseID,
      modifiedByUserID: this.memberID,
      modifiedByDateTime: new Date()
    };
    this.isSubmitted = true;
    this.isSuccess = true;
    this._communicationService.saveCommunicationEndpointResponse(body)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res: boolean) => {
      if (res) {
        this.isSubmitted = true;
        this.isSuccess = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
