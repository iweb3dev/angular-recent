import { FilesPagedObject } from './../../api/messages/messages.models';
import {
  MessageDetailsResponseDto,
  MessageFilesResponseDto,
} from 'src/app/api/messages/messages.models';

export interface PreviousMessageRenderModel {
  creationDate: string;
  messageName: string;
  id: number;
  showPhoneMessage: boolean;
  showTextMessage: boolean;
  showEmailMessage: boolean;
  acceptResponses: boolean;
}

export interface MessagesDetailsModel extends MessageDetailsResponseDto {
  attachments?: FilesPagedObject[];
  files: MessageFilesResponseDto;
}
