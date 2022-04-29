export class Group {
  id: string;
  name: string;
  land: string;

  constructor(obj: Partial<Group>) {
    Object.assign(this, obj);
  }
}
