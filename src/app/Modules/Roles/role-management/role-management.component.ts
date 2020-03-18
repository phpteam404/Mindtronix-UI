import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { RolesService} from 'src/app/services/roles.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  roles:any=[];
  moduleAccess:any=[];

  superAdminCategories: string[] = ['one','two','three','four','five','six','seven','eight','night','ten','eleven'];
  siteAdminCategories: string[] = ['one','two','three','four','five','six','seven','eight','night','ten','eleven'];
  lcAdminCategories: string[] = ['three','five','eight','ten'];
  trainerCategories: string[] = ['three','five'];
  studentCategories: string[] = ['five'];
  OnlineUserCategories: string[] = ['five'];
  constructor(public translate: TranslateService,
              private _rService: RolesService) {
      translate.setDefaultLang(environment.defaultLanguage);
   }

  ngOnInit(): void {
    this.getRolesList ();
  }

  getRolesList() {
    var params = new HttpParams()
          .set('user_role_id','1')
    this._rService.rolesList(params).subscribe(res=>{
      console.log('res info',res);
      if(res.status){
          this.roles =res.data.user_roles;
          this.moduleAccess =res.data.modules;
      }
    });
  }
  viewModules(data:any){
    console.log('clicked');
    console.log('role access data',data);
    var params = new HttpParams()
         .set('user_role_id',data.id)
    this._rService.rolesList(params).subscribe(res=>{
      console.log('res info',res);
      if(res.status){
           this.roles = res.data.user_roles;
           this.moduleAccess =res.data.modules;
      }
    });
  }

}
