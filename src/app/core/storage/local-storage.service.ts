import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _localStorage: Storage = window.localStorage;

  constructor() {}

  set<V>(key: string, value: V): void {
    const item: string = JSON.stringify(value);
    this._localStorage.setItem(key, item);
  }

  get<V>(key: string): V {
    const value: string = this._localStorage.getItem(key);
    return JSON.parse(value) as V;
  }

  remove(key: string): void {
    this._localStorage.removeItem(key);
  }
}
