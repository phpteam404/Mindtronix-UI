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
      }
    });
  } 
  submitRoleAccess(){
    console.log('modules', this.modules);
    console.log('accessObj', this.accessObj);
    this.accessObj.forEach((k,v) => { 
    console.log(k,'--', v);
    });
    
  }
  onRoleChange(event){
    this.getRolesList(this.roles[event.index])
  }
}
