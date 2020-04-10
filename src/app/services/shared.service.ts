import { Injectable, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() user: EventEmitter<any> = new EventEmitter();
  @Output() roleAccess : EventEmitter<any> = new EventEmitter();
  @Output() notification : EventEmitter<any> = new EventEmitter();
   constructor(private _ls:LocalStorageService) {}

  change() {
    this.user.emit(this._ls.getItem('user',true));
  }
  getEmittedValue() {
    return this.user;
  }
  setAccess(data:any) {
    this.roleAccess.emit(data);
  }
  getAccess(type:any){
    return this.roleAccess;
  }
  setNotification(data:any) {
    this.notification.emit(data);
  }
  getNotification(){
    return this.notification;
  }
}
