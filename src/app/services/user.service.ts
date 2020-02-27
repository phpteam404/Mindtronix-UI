import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // constructor(private clientHttp : HttpClient) {
  constructor(private clientHttp : AppHttpClientService) {
  
   }
  /* login(params) {
    console.log('params--', params);
    return this.clientHttp.post('Signup/login',params);        
  }*/
  getUsersList () {
    return this.clientHttp.get('user/getUserList');
  }

  getRolesList(params){
    return this.clientHttp.get('User/rolesManagementList?'+params);
  }

  saveUser(params){
    return this.clientHttp.post('User/addUser',params);
  }
}
