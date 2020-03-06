import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private clientHttp : AppHttpClientService) { }

  saveFee(params){
    return this.clientHttp.post('Fee/addFeeUpdate', params);
  }
  getList(params){
      return this.clientHttp.get('Fee/feeStructure?'+params);
  }
  getById(params){
      return this.clientHttp.get('Fee/feeStructure?fee_master_id='+params.id);
  }

  getFeeDropDown(params){
    return this.clientHttp.get('Fee/feeStructureDropdown?'+params);
  }
}
