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
export class SchoolService {

  constructor(private clientHttp : AppHttpClientService) { }

  getschoolsList (params) {
    return this.clientHttp.get('Franchise/schoolsList', params);
  }

  addSchool(params){
    return this.clientHttp.post('Franchise/addSchool', params).pipe(map(user=>{return user}));
  }

  getById(params){
    return this.clientHttp.get('Franchise/schoolInfo', params);
  }
 
  getSchoolsDropDowns(params){
    return this.clientHttp.get('Franchise/schoolListForDropDown', params);
  }

}
