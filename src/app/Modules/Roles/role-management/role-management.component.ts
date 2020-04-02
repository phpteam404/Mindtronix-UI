import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  roles:any=[];
  rolesDropDown:any=[];
  modules:any=[];
  currentRole:any=0;
  constructor(private _service: RoleService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
    var params=new HttpParams().set("dropdown","true");
    this._service.getRolesList(params).subscribe(res=>{
      if(res.status){
        this.rolesDropDown = res.data.user_roles;
        this.getRolesList({'id':res.data.user_roles[0].value});
      }
    });
  }

  getRolesList(data?: any){
    var params = new HttpParams()
        .set('user_role_id',(data)?data.id:1);
  this._service.getRolesList(params).subscribe(res=>{
     if(res.status){
      this.roles = res.data.user_roles;
      this.modules = res.data.modules;
      this.modules.forEach(item=>{
        if(item.create =='1')
        {
           item.create = true;
        }else item.create =false;
        if(item.edit =='1'){
          item.edit = true;
        } else item.edit = false;
        if(item.view =='1')
        {
          item.view = true;
        } else item.view =false;
        if(item.delete =='1'){
          item.delete = true;
        }else item.delete =false;       
      });
     }
   });
  }
  
  submitRoleAccess(){
    this.modules.forEach(item=>{
      if(item.create){
         item.create=1;
      } else item.create =0;
      if(item.edit) {
         item.edit=1;
      } else item.edit =0;
      if(item.view) {
          item.view=1;
      } else item.view =0;
      if(item.delete){
        item.delete=1;
      } else item.delete =0;
       console.log('modules info', this.modules);
    })
    var params={};
       params['modules']=this.modules;
       this._service.updateRoleAccess(params).subscribe(res=>{
          if(res.status){
        }
       });
  }
  
  onRoleChange(event){
    this.currentRole=event.index;
    this.getRolesList(this.roles[event.index])
  } 
}
