import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  // private messageService: MessageService
  constructor(private toastr: ToastrService) { }
  /**
   * @param {string} [type]
   * @param {string} [title]
   * @param {string} [message]
   * @memberof ToasterService
   */
  show(type?: string, title?: string, message?: string) {
    console.log('type--', type);
    console.log('title--', title);
    console.log('message--', message);
    if (message || title) {
      if (title) {
        if (type === 'error') {
         this.toastr.error(title, message);
        } else if (type === 'success') {
          this.toastr.success(title, message);
        } else {
          this.toastr.warning(title, message);
        }
      }
      // console.log('dat', { severity: type, summary: title, detail: message });
    }
  }
  /**
   *
   *
   * @memberof ToasterService
   */
  clearAll() {

    // this.messageService.clear();
  }
}
