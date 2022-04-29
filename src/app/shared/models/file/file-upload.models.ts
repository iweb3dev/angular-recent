import { AttachmentTypes } from '../../../api/shared/shared.enums';
import { GPBase } from '../../../api/shared/shared.models';

export interface FileUploadDto extends GPBase {
  attachmentFilePath: string; // Path on a machine
  attachmentType: AttachmentTypes;
  audioFileDurationSeconds: number; // keeps returning 0
  fileId: number;
  fileName: string; // Path on a machine
  fileSize: number;
  flaggedForDeletion: boolean;
  memberID: number;
  uploadedFileStream: string[]; // unknown so far
  // below here is GPBase extension
  // id: number;
  // isDirty: boolean;
  // productID: number;
  // validationErrors: string[]; // TODO: find what type of errors RPS - this returns a list of strings
}

export interface FileUploadModel {
  id: number;
  size: number;
  fileName: string;
  fileExtension: string;
}
