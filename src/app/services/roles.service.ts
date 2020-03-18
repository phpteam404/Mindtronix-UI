import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private clientHttp : AppHttpClientService) {}

  rolesList(params){
    return this.clientHttp.get('User/rolesManagementList', params);
  }
}
