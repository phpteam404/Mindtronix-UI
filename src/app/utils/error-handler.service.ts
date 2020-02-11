import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  /**
   * client and sever side gloabl exception handling
   *
   * @param {*} error
   * @memberof ErrorHandlerService
   */
  handleError(error: any) {
    const router = this.injector.get(Router);
    console.log('URL: ' + router.url);

    if (error instanceof HttpErrorResponse) {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
     // console.error('Backend returned status code: ', error.status);
     console.error('Response body:', error);
     throw (error);
    } else {
      // A client-side or network error occurred.
     console.error('An error occurred:', error);
      throw (error);
    }
    // router.navigate(['/welcome']);
  }
}
