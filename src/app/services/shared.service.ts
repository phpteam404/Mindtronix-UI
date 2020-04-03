import { Injectable, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() user: EventEmitter<any> = new EventEmitter();
  @Output() roleAccess : EventEmitter<any> = new EventEmitter();
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
   /* var obj:any={};
    if(this.roleAccess[type]>0){
      obj['access']=true;
    }
    else {
      obj['access']=false;
    }
    return obj;*/
    //console.log(type,'====',this.roleAccess);
    return this.roleAccess;
  }
}
