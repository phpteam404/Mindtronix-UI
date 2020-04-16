import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private clientHttp: AppHttpClientService) { }

  getstudentInvoice(params) {
    return this.clientHttp.get('Invoice/studentInvoiceList', params);
  }
  getStudentsView(params) {
    return this.clientHttp.get('Invoice/studentInvoiceList', params);
  }
  getPreviousinvoices(params) {
    return this.clientHttp.get('Invoice/getPreviousStudentInvoices', params);
  }
  updateInvoiceStatus(params){
    return this.clientHttp.post('Invoice/updateStudentInvoicePayment',params);
  }
  generateStudentInvoice(params){
    return this.clientHttp.get('Invoice/generateStudentInvoice',params);
  }
  generateSchoolInvoice(params){
    return this.clientHttp.post('Invoice/generateSchoolInvoice',params);
  }
  schoolsInvoiceList(params){
    return this.clientHttp.get('Invoice/schoolInvoiceList',params);
  }
  getSchoolInvoiceInfo(params){
    return this.clientHttp.get('Invoice/schoolInvoiceList',params);
  }
  getFranchiseInvoiceList(params){
    return this.clientHttp.get('Invoice/FrachiseInvoiceList',params);
  }
  getFranchiseView(params){
    return this.clientHttp.get('Invoice/FrachiseInvoiceList',params);
  }
  getOnlineUsersInvoiceList(params){
    return this.clientHttp.get('Invoice/onlineUserInvoiceList',params);
  }
}
