import { Pipe, PipeTransform } from '@angular/core';
import { NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import { CommunicationMessageTypes, CommunicationResultsSort } from '../store/message-results-detail.models';

@Pipe({name: 'messageResultsFilter'})
export class MessageResultsFilterPipe implements PipeTransform {
  transform(communications: CommunicationResult[], {
    messageType,
    searchText,
    sort,
    status
  }: {
    messageType: CommunicationMessageTypes[],
    status: NotificationStatusTypes[],
    sort: CommunicationResultsSort,
    searchText: string
  }): CommunicationResult[] {

    // Filter on type
    if (messageType.length !== Object.values(CommunicationMessageTypes).filter(s => !isNaN(+s)).length) {
      communications = communications.filter(s => {
        let result = false;
        if (messageType.includes(CommunicationMessageTypes.Text)) {
          result = s.smSsToMake > 0 ? true : result;
        }
        if (messageType.includes(CommunicationMessageTypes.Email)) {
          result = s.emailsToMake > 0 ? true : result;
        }
        if (messageType.includes(CommunicationMessageTypes.Voice)) {
          result = s.callsToMake > 0 ? true : result;
        }
        return result;
      });
    }

    // Filter on status
    communications = communications.filter(s => status.includes(s.notificationStatus));

    // Filter on searchText
    communications = communications.filter(c => c?.notificationName?.toLocaleLowerCase().indexOf(searchText?.toLocaleLowerCase()) !== -1);

    // Sort
    communications = communications.sort((a, b) => {
      let result: number;

      if (a.startDateTime > b.startDateTime) {
        result = -1;
      } else {
        result = 1;
      }

      return sort === CommunicationResultsSort.OldToNew ? result * -1 : result;
    });

    return communications;
  }
}
