import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toaster.service';
import { LoadingIndicatorService } from './loading-indicator.service';
import { Http ,HttpModule, RequestOptions} from '@angular/http';

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

  private api = environment.apiUrl;
  _isLoader = true;

  // Extending the HttpClient through the Angular DI.
  public constructor(private http: HttpClient,public loadingIndicatorService: LoadingIndicatorService,public toaster: ToasterService) {
      // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
      // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
      return this.http.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
      console.log(this.api,'', endPoint );
      return this.http.post<T>(this.api + endPoint, params, options);
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
  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
      return this.http.delete<T>(this.api + endPoint, options);
  }
}
export function AppHttpClientCreator(http: HttpClient,loadingIndicatorService:LoadingIndicatorService,toaster: ToasterService) {
  return new AppHttpClientService(http,loadingIndicatorService,toaster);
}
