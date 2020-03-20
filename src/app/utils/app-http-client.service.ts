import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toaster.service';
import { LoadingIndicatorService } from './loading-indicator.service';
import { Http ,HttpModule, RequestOptions} from '@angular/http';
import { map,catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class AppHttpClientService {

  public api = environment.apiUrl;
  public encrypt = environment.encrypt;
  key = 'JKj178jircAPx7h4CbGyYVV6u0A1JF7YN5GfWDWx';//'#base64Key#12345';
  keyEnyDec: any = CryptoJS.enc.Base64.parse(btoa(this.key));
  enycOptions: any = { mode: CryptoJS.mode.CBC };
  // enycOptions: any = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
  _isLoader = true;
  public pendingRequestsNumber: any = 0;

  // Extending the HttpClient through the Angular DI.
  public constructor(private http: HttpClient,private router: Router,
                    public loadingIndicatorService: LoadingIndicatorService,
                    private _ls: LocalStorageService,
                    private toaster: ToastrService) {
      // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
      // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(endPoint: string,data?: any, options?: IRequestOptions): Observable<any> {
      this.pendingRequestsNumber++;
        const params = new URLSearchParams();
        var appendParams=false;
        if(data && data.updates !=undefined){
          var arr = data.updates;
          appendParams=true;
          for (const key in arr) {
              if (arr[key]) {
                  params.set(arr[key].param+'', arr[key].value+'');
              }
          }
        }
        let param: any;
        if (this.encrypt) {
          param = CryptoJS.AES.encrypt(JSON.stringify(params), this.key, this.enycOptions).toString();
          endPoint = endPoint+"?requestData="+(param);
        } else {
          param = params;
          if(appendParams)endPoint = endPoint+"?"+param;
        }
    return this.http.get(this.api + endPoint, options).pipe(map((res: Response) => {
         this.pendingRequestsNumber--;
          return this.resStatus(res);
      }, err => {
         // this.pendingRequestsNumber--;
      }))
    //  return this.http.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {

    this.pendingRequestsNumber++;
    let param: any = {};
    // console.log('post params--', params);
    if (this.encrypt) {
        param.requestData = CryptoJS.AES.encrypt(JSON.stringify(params), this.key, this.enycOptions).toString();
    } else {
        param = params;
    }
    return this.http.post(this.api + endPoint, param, options).pipe(map(res => {
        this.pendingRequestsNumber--;
        return this.resStatus(res);
    }, err => {
        this.pendingRequestsNumber--;
    }))
    // return this.http.post<T>(this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
      return this.http.put<T>(this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(endPoint: string, data?: any, options?: IRequestOptions): Observable<any> {
    this.pendingRequestsNumber++;
        const params = new URLSearchParams();
        var appendParams=false;
        if(data && data.updates !=undefined){
          var arr = data.updates;
          appendParams=true;
          for (const key in arr) {
              if (arr[key]) {
                  params.set(arr[key].param+'', arr[key].value+'');
              }
          }
        }
        let param: any;
        if (this.encrypt) {
          param = CryptoJS.AES.encrypt(JSON.stringify(params), this.key, this.enycOptions).toString();
          endPoint = endPoint+"?requestData="+(param);
        } else {
          param = params;
          if(appendParams)endPoint = endPoint+"?"+param;
        }
        return this.http.delete(this.api + endPoint, options).pipe(map((res: Response) => {
          this.pendingRequestsNumber--;
          return this.resStatus(res);
        }, err => {
            this.pendingRequestsNumber--;
        }))
      //return this.http.delete<T>(this.api + endPoint, options);
  }
  
  resStatus(res: any) {
    let resData = null;
    if (this.encrypt) {
        resData = res;
        var str = "hello";
        var enc = CryptoJS.AES.encrypt(JSON.stringify(str), this.key, this.enycOptions).toString()
        console.log('encrypted---', enc);
        var dec = JSON.parse(CryptoJS.AES.decrypt(enc, this.key, this.enycOptions).toString(CryptoJS.enc.Utf8));
        console.log('decrypted---', dec);

        // resData = JSON.parse(CryptoJS.AES.decrypt(resData.responseData, this.key, this.enycOptions).toString(CryptoJS.enc.Utf8));
        resData = JSON.parse(CryptoJS.AES.decrypt(resData.responseData, this.key, this.enycOptions));
        
    } else {
        resData = res;
    }
    if (!res.status) {
      if(!res.Authentication){
        return resData;
      }else{
        //this.toaster.error('error', 'Something went wrong!', resData.message);
        return resData;
      }
    }    
    if (res.status) return resData;    
  }
  popupLoin(){
    this._ls.removeItem('user');
    this.router.navigate(['login']);
  }

  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }
}
export function AppHttpClientCreator(http: HttpClient,router: Router,loadingIndicatorService:LoadingIndicatorService,_ls: LocalStorageService,toaster: ToastrService) {
  return new AppHttpClientService(http,router,loadingIndicatorService,_ls,toaster);
}
