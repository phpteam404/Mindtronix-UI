import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  roles:any=[];
  modules:any=[];
  accessObj=[];
  currentRole:any=0;
  constructor(private _service: RoleService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
    this.getRolesList();
  }

  getRolesList(data?: any){
    var params = new HttpParams()
                .set('user_role_id',(data)?data.id:1);
    this._service.getRolesList(params).subscribe(res=>{
      if(res.status){
        this.roles = res.data.user_roles;
        this.modules = res.data.modules;
        this.modules.forEach(item => { 
          if(item.is_access_status=='1'){
            item.is_access_status=true;
          }else item.is_access_status=false;
        });
      }
    });
  } 
  submitRoleAccess(){    
    this.modules.forEach(item => { 
      if(item.is_access_status){
        item.is_access_status=1;
      }else item.is_access_status=0;
    });
    console.log('this.modules--', this.modules);
    var params={};
    params['modules']=this.modules;
    this._service.updateRoleAccess(params).subscribe(res=>{
      if(res.status){
        // this.accessObj
      }
    });
  }
  onRoleChange(event){
    this.currentRole=event.index;
    this.getRolesList(this.roles[event.index])
  } 
}
