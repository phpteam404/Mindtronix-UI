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
export class MasterService {

  constructor(private clientHttp : AppHttpClientService) { 
  
  }
  getAllMaster () {
    return this.clientHttp.get('Master/masterList');
  }
  getMasterChilds (params) {
    return this.clientHttp.get('Master/getMsaterData', params);
  }
  postMasterChild (params) {
    return this.clientHttp.post('Master/addMasterChild', params);
  }
}
