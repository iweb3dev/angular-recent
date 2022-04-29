import { EnabledMessageFormatsModel } from 'src/app/components/message-details/message-details.models';
import { MessageRecipientsModel } from 'src/app/components/message-name/message-name.models';

export interface MessageLibraryDetailsResolverModel {
  name: string;
  formats: EnabledMessageFormatsModel;
  recipients: MessageRecipientsModel[];
}
