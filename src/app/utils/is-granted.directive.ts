import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { LocalStorageService } from './local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appIsGranted]'
})
export class IsGrantedDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private _ls: LocalStorageService,
              private _aService: AuthenticationService,
              private service: SharedService,
              private _ar: ActivatedRoute
            ) {}

  @Input() set appIsGranted(permission: string) {
    //console.log(this._ar.snapshot['_routerState']);
    var url = this._ar.snapshot['_routerState'].url.toString();
    url = url.split('?')[0];
    var reqAction = '';
    if(url.includes('add') || url.includes('view') || url.includes('update')){
      if(url.includes('add')){
        var str = url.split('add');
        url = str[0].slice(0, -1);// str[0]+'add';
        reqAction = 'create';
      }
      if(url.includes('view')){
        var str = url.split('view');
        url = str[0].slice(0, -1);//str[0]+'view';
        reqAction = 'view';
      }
      if(url.includes('update')){
        var str = url.split('update');
        url = str[0].slice(0, -1);//str[0]+'update';
        reqAction = 'edit';
      }
    }else{
      reqAction = 'view';
    }
    if(this._ls.getItem('user',true).data.grant == undefined){
      this.isGranted(permission);
    }else{
      if(this._ls.getItem('user',true).data.grant.url == url){
        this.isGrantedByLs(permission);
      }else{
        this._aService.isTokenExpired({'module_url':url,'user_role_id': JSON.parse(this._ls.getItem('user')).data['user_role_id']}).subscribe(res=>{
          if(res.status){
            var roleAccessObj = res.data.role_access;
            roleAccessObj['url'] = url;
            var obj={};
            obj = this._ls.getItem('user',true);
            obj['data']['grant'] = roleAccessObj;
            this._ls.setItem('user',obj,true);
            this.isGrantedByLs(permission);
          }
        });
      }
    }
    
    //console.log(this._ls.getItem('user',true).data.grant,"----grant----", url);
   // this.isGrantedByLs(permission);
   //this.isGranted(permission);
  }
//this method is by using shared service
  private isGranted(permission: string) {
    this.service.getAccess(permission).subscribe(item => {
      if (item[permission]>0) {
        if (this._ls.getItem('user',true).data.grant != undefined){}
         else this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
  // this is by local storage
  private isGrantedByLs(permission: string) {
    // console.log(this._ls.getItem('user',true).data.grant[permission],"grant===>>>>", permission);
      if (this._ls.getItem('user',true).data.grant[permission]>0) {        
         this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
  }
}
