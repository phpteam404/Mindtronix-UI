import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MindtronixUI';
  constructor(private toastr: ToastrService) {}
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!',
    {timeOut: 2000});;
  }
  showError() {
      this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000
    });
  }
}