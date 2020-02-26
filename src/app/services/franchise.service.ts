import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {

  constructor(private clientHttp : AppHttpClientService) { }

  getList(params){
    return this.clientHttp.get('Agency/franchiseList?'+params);
  }
}
