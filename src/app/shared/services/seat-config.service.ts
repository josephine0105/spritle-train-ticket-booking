import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatConfigService {
  seats: any=[];
  constructor() {
    // this.seats=[]
  }
  public getConfig(){
    localStorage.getItem('seats')
  }
}
