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
import { ToasterService } from './toaster.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private toast: ToasterService, private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('HttpInterceptorService---' );
    let currentUser = localStorage.getItem('sessionUser_user');
    if (currentUser && JSON.parse(currentUser).access_token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${JSON.parse(currentUser).access_token}`,
                User: `${JSON.parse(currentUser).data['user_id']}`
            }
        });
    }
    return next.handle(request).pipe(
    map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
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
        this.toast.show('success',resJson.message);
      }
    } else {
      this.toast.show('error',resJson.error.message);
    }
    return resJson;
  }
}
