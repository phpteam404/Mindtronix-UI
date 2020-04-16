import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineUsersService {

  constructor(private clientHttp : AppHttpClientService) { }

  getonlineusersList(params)
  {
    return this.clientHttp.get('User/onlineSubscriptionList',params);
  }
  onlineusersInfo(params){
    return this.clientHttp.get('User/onlineSubscriptionList',params);
  }
}
