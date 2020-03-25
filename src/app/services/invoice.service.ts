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
}
