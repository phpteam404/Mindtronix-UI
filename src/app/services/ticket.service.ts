import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private clientHttp : AppHttpClientService) { }


  addTicket(params){
    return this.clientHttp.post('Ticket/addTicket',params);
  }
  
  getTicketList (param) {
    return this.clientHttp.get('Ticket/ticketList',param);
  }

  getTicketInfo (param) {
    return this.clientHttp.get('Ticket/ticketInfo',param);
  }

  updateTicketStatus(params){
    return this.clientHttp.post('Ticket/addTicketChat',params);
  }
}
