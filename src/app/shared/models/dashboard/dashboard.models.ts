export class RecentGroup {
  name: string;
  domainName: string;
  id: number;

  constructor(obj: Partial<RecentGroup>) {
    Object.assign(this, obj);
  }
}
