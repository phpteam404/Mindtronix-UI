import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  cities: any;
  list: any;
  cols:any;
  totalRecords:number;
  constructor(private authService: AuthenticationService) {
    this.cols = [
      { field: 'created_date_time', header: 'Date' },
      { field: 'notification_template', header: 'Notification' },
    ];
  }
  ngOnInit(): void {
    this.getNotifications();
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  getNotifications() {
    var parmas = new HttpParams()
                  .set("notification_status","all");                
    this.authService.getNotifications(parmas).subscribe(res => {
      if(res.status){
        console.log("Notifications ===", res);
        this.totalRecords = res.data.total_records?res.data.total_records:0;
        this.list = res.data.data;
      }
    });
  }
}
