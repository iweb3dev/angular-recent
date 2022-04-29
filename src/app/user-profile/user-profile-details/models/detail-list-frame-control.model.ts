

export class DetailListFrameControl {
  primaryField: string;
  secondaryField: number;
  isActive: boolean;
  isPrimary: boolean;

  constructor(obj: Partial<DetailListFrameControl>) {
    Object.assign(this, obj);
  }
}
