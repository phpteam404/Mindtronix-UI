import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../utils/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ls: LocalStorageService, private router: Router,private _ar: ActivatedRoute, private service: AuthenticationService) {

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
      // console.log('AuthGuard---',location.pathname);
      // console.log('router---',this.router.url);
      // console.log('_ar---',this._ar.snapshot.url);
     if (this.ls.getItem('user')) {
        this.service.isTokenExpired({'module_url':'#'+location.hash,'user_role_id': JSON.parse(this.ls.getItem('user')).data['user_role_id']}).subscribe(res=>{
          // console.log('isTokenExpired--', location);
          if(res.status){
            return true;
          }else {
           // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return true;
          }
        })
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
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
