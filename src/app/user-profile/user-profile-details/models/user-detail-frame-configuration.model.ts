export class UserDetailFrameConfiguration {
  primaryFieldName: string;
  secondaryFieldName: string;
  constructor(obj: Partial<UserDetailFrameConfiguration>) {
    Object.assign(this, obj);
  }
}
