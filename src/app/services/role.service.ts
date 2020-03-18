import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../utils/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private clientHttp: AppHttpClientService) { }

  getRolesList(params){
    return this.clientHttp.get('User/rolesManagementList',params);
  }

  updateRoleAccess(params){
    return this.clientHttp.post('User/updateRolesManagement', params);
  }
}
