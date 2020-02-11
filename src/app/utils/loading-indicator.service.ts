import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  public onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Stores all currently active requests
   */
  private requests: any[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: any): void {
    this.requests.push(req);
    // console.log('sta', req);
    this.notify();
    // console.log('loding.........' + req.url);
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: any): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
    // console.log('end', req);
    // console.log('Finised ' + req.url);
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.onLoadingChanged.emit(this.requests.length !== 0);
  }

}
