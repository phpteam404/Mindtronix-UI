import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private clientHttp : AppHttpClientService) { }

  addDigitalContent(params){
    return this.clientHttp.post('Digitalcontent/addDigitalContent', params);
  }
  getdigitalContentList (params) {
    return this.clientHttp.get('Digitalcontent/digitalContetList', params);
  }
  getDigitalContentInfo(params){
    return this.clientHttp.get('Digitalcontent/digitalContentInfo', params);
  }
  getDocuments(params){
    return this.clientHttp.post('Digitalcontent/addDigitalContentDocuments',params);
  }
  MapDigitalContent(params){
    return this.clientHttp.post('Digitalcontent/mapContentToFranchise',params);
  }

  viewDigitalContentMapping(params){
    return this.clientHttp.get('Digitalcontent/mapContentToFranchise',params);
  }
}
