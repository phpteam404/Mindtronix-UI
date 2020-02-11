import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoadingIndicatorService } from './loading-indicator.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs/Observable';
import { map, catchError, retry } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Http, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { ToasterService } from './toaster.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,public toastr: ToastrService ,public toaster: ToasterService, private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept',localStorage);
    
    let currentUser = localStorage.getItem('sessionUser_user');
    if (currentUser && JSON.parse(currentUser).access_token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${JSON.parse(currentUser).access_token}`
            }
        });
    }
    return next.handle(request).pipe(
    map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
            this.toastr.success('Hello world!', 'Toastr fun!');
           // this.toaster.success(event.body.message, 'Success', { positionClass: 'toast-bottom-center' });
           //console.log('event.body-->>',this.decryptionResponse(event.body));
           event = event.clone({ body: this.decryptionResponse(event.body) });
        }
        return event;
    }));
  }


  /**
   * @private
   * @param {any} res
   * @returns json object
   * @memberof HttpInterceptor
   */
  private decryptionResponse(res) {
    const resJson = res;
    if (resJson.status) {
      if (resJson.message) {
        this.toastr.success('success', resJson.message);
      }
    } else {
      this.toastr.warning('error', resJson.error.message);
    }
    return resJson;
  }
}
