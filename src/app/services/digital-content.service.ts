import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigitalContentService {

  constructor(private clientHttp : AppHttpClientService) { }

  addDigitalContent(params){
    return this.clientHttp.post('Digitalcontent/addDigitalContent', params).pipe(map(user=>{return user}));
  }
  getdigitalContentList (params) {
    return this.clientHttp.get('Digitalcontent/digitalContetList', params);
  }
}
