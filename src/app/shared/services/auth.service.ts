import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public sessionSetItem(key: any, value: any) {
    localStorage.setItem(key, value);
  }
  public sessionGetItem(key: any) {
    localStorage.getItem(key);
  }
}
