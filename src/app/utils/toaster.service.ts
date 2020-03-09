import { Injectable } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
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
    /*console.log('type--', type);
    console.log('title--', title);
    console.log('message--', message);*/
    if (message || title) {
      if (title) {
        if (type === 'error') {
          if(typeof title === 'object'){
            var obj = JSON.parse(JSON.stringify(title));
            var keys = Object.keys(obj);
            keys.forEach(item => {
              this.toastr.error(obj[item], message);
            });
          }
          else this.toastr.error(title, message);
        } else if (type === 'success') {
          if(title == 'Success' || title == 'success'){}
          else this.toastr.success(title, message);
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
