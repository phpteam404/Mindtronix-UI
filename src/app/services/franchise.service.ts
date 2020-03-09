import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {

  constructor(private clientHttp : AppHttpClientService) { }

  getList(params){
    return this.clientHttp.get('Franchise/franchiseList?'+params);
  }
  addUpdate(params){
    return this.clientHttp.post('Franchise/franchiseAdd',params);
  }
  getFranchiseDropDowns(params){
     return this.clientHttp.get('Franchise/franchiseListForDropDown',params);
  }
  getFranchiseInfo(params){
    return this.clientHttp.get('Franchise/franchiseInfo?'+params);
  }

  updateFranchiseContacts(params){
    return this.clientHttp.post('Franchise/updateFranchiseContacts',params);
  }
}
