export class Notification {
  id: string;
  date: string;
  content: string;

  constructor(obj: Partial<Notification>) {
    Object.assign(this, obj);
  }
}
