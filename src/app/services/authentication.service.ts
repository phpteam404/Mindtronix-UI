import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


    constructor(private http: AppHttpClientService,private ls: LocalStorageService) {}

    login(params) {
      return this.http.post('Signup/login', params)
          .pipe(map(user => {
              return user;
          }));
    }

    logout() {
      // remove user from local storage to log user out
      this.ls.removeItem('user');
    }
}
