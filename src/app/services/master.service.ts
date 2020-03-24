import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private clientHttp : AppHttpClientService) {}
  getAllMaster () {
    return this.clientHttp.get('Master/masterList');
  }
  getMasterChilds (params) {
    return this.clientHttp.get('Master/getMasterData', params);
  }
  postMasterChild (params) {
    return this.clientHttp.post('Master/addMasterChild', params);
  }
}
