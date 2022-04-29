import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { MessageHistoryTypes } from 'src/app/api/shared/shared.enums';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageResultsSettingsService } from './filters/services/message-results-filter-settings.service';
import { MessageDetailsService } from './message-details/services/message-details.service';
import { SummaryDeliveredResult } from './message-result-detail.modal';
import { MessageResultsDetailFacade } from './store/message-results-detail.facade';

@Component({
  selector: 'app-message-results-detail',
  templateUrl: './message-results-detail.component.html',
  styleUrls: ['./message-results-detail.component.scss'],
})
export class MessageResultsDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private _timeout: any = null;
  showSearch = false;
  filterSettings = {
    searchText: '',
  } as any; // TODO: resolve template types
  keyPress$ = new Subject();
  searchText$ = new Subject();
  communicationResults$ =
    this._messageResultsDetailFacade.selectMessageSearchResult$;
  // this._communicationsFacade.communicationResults$;
  showDesktopChild = false;
  searchText = '';
  summaryDeliveredResult: SummaryDeliveredResult;
  private selectedHistoryType = MessageHistoryTypes.all;

  @ViewChild('desktopView', { read: ViewContainerRef })
  desktopViewRef: ViewContainerRef;

  private subscriptions = new Subscription();

  constructor(
    private _messageDetailsService: MessageDetailsService,
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
    private _messageResultsSettings: MessageResultsSettingsService,
    private _loaderService: LoaderService,
    private _communicationService: CommunicationsService
  ) {}

  ngOnInit(): void {
    this._loaderService.showLoader();
    this.subscriptions.add(
      this.communicationResults$.pipe(delay(1000)).subscribe(() => {
        if (this._loaderService.hasLoaderAttached) {
          this._loaderService.removeLoader();
        }
      }),
    );
    this._messageResultsDetailFacade.currentFilters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (this.selectedHistoryType !== res.history) {
          this.selectedHistoryType = res.history;
          this._communicationService.setHistoryType(res.history);
          this.fetchCommunications(
            this.searchText,
            0,
            this.selectedHistoryType,
            25,
            0,
          );
        }
        this.filterSettings = {
          ...this.filterSettings,
          ...res,
        };
      });
    this.fetchCommunications('', 0, this.selectedHistoryType, 25, 0);
    this._messageDetailsService.showDesktopView$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.showDesktopChild = res;
      });
    this.getSummaryDeliveredResult();

  }

  onOpenFilters() {
    this._messageResultsSettings.open().subscribe();
  }

  private getSummaryDeliveredResult(): void {
    this.communicationResults$
      .pipe(
        map((allSendInfo) => {
          return allSendInfo.reduce(
            (acc, item) => {
              (acc.deliveredEmails += item.emailsDeliverd),
                (acc.deliveredCalls += item.callsDeliverd),
                (acc.deliveredSmSs += item.smSsDeliverd);
              return acc;
            },
            {
              deliveredCalls: 0,
              deliveredEmails: 0,
              deliveredSmSs: 0,
            },
          );
        }),
      )
      .subscribe((resultInfo) => (this.summaryDeliveredResult = resultInfo));
  }

  changeSearchText(value: string) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.searchText = value ? value : '';
    this._communicationService.setSearchText(this.searchText);
    this._timeout = setTimeout(() => {
      this.fetchCommunications(
        this.searchText,
        0,
        this.selectedHistoryType,
        25,
        0,
      );
    }, 1000);
  }

  fetchCommunications(
    searchCriteria: string,
    groupId?: number,
    historyTypeId?: number,
    pageSize?: number,
    pageIndex?: number,
  ) {
    this._messageResultsDetailFacade.getCommunicationsResults(
      searchCriteria,
      groupId,
      historyTypeId,
      pageSize,
      pageIndex,
    );
  }

  onToggleSearch() {
    this.showSearch = !this.showSearch;
  }

  refresh() {
    this.fetchCommunications('', 0, this.selectedHistoryType, 25, 0);
  }

  ngOnDestroy() {
    this._messageResultsDetailFacade.clearFilterSettings();
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
