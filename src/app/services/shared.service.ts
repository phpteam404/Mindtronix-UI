import { Injectable, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() user: EventEmitter<any> = new EventEmitter();

   constructor(private _ls:LocalStorageService) {}

   change() {
     this.user.emit(this._ls.getItem('user',true));
   }

   getEmittedValue() {
     return this.user;
   }
}
