export interface ClientSideErrors {
  message: string;
  source: string;
  url: string;
  line: string;
  column: string;
  userId: number;
}

export interface ClientOrigin {
  originId: number;
  originActionId: number;
}

export interface DtoLog {
  id: number;
  thread: string;
  level: string;
  logger: string;
  message: string;
  modifiedByUserId: number;
}
