import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../utils/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToasterService } from '../utils/toaster.service';
import { AppHttpClientService } from '../utils/app-http-client.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private ls: LocalStorageService,
              private router: Router,
              private _toast: ToasterService,
              private httpService : AppHttpClientService,
              private _ar: ActivatedRoute,
              private service: AuthenticationService) {

  } 

   /**
   *
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<boolean> | Promise<boolean> | boolean)}
   * @memberof AuthGuard
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // console.log('next--', next.routeConfig.path);
     if (this.ls.getItem('user')) {
        var url = next['_routerState'].url.toString();
        url = url.split('?')[0];
        var reqAction = '';
        /*console.log('next====', next['_routerState']);
        console.log('add==', url.includes('add'));
        console.log('view==', url.includes('view'));
        console.log('update==', url.includes('update'));
        console.log('module_url-*-*-*',url);*/
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
        
        this.service.isTokenExpired({'module_url':url,'user_role_id': JSON.parse(this.ls.getItem('user')).data['user_role_id']}).subscribe(res=>{
          if(res.status){
            if(res.data.access){
              if(res.data.role_access.view>0){
                
              }
              return true;
            }              
            else {
              this.router.navigate(['/404']);
            }
          }else {
            if(!res.Authentication){
              this._toast.show('error','Session expired !')
              this.service.logout();
              this.router.navigate(['/login']);
            }
            return true;
          }
        })
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  

   
 /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
        }
        // authorised so return true
        return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}*/
}
