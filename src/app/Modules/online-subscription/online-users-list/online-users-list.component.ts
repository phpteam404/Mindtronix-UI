import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService} from 'primeng/api';
import { OnlineUsersService} from 'src/app/services/online-users.service';
@Component({
  selector: 'app-online-users-list',
  templateUrl: './online-users-list.component.html',
  styleUrls: ['./online-users-list.component.scss']
})
export class OnlineUsersListComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  loading: boolean;
  userlist:any;
  constructor(private router: Router,
              private _route: ActivatedRoute,
              private _toast: ToasterService,
              private _service:OnlineUsersService,
              public translate: TranslateService) {
     translate.setDefaultLang(environment.defaultLanguage);
    
   }
   isEmptyTable() {
    return (this.userlist== 0 ? true : false);
  } 

  ngOnInit(): void {
  }
   
  viewonlineusers(data:any){
    console.log('data info',data);
    this.router.navigate(['view/' + data.user_name + '/' + btoa(data.user_id)], { relativeTo: this._route });
  }

  loadonlineusersLazy(event: LazyLoadEvent) {
    console.log('event--', event);
    this.loading =true;
    var sortOrder= (event.sortOrder==1) ? "ASC" : "DESC";
    var params = new HttpParams()
      .set('start', event.first+'')
      .set('number', event.rows+'');
    if (event.sortField) {
      params = params.set('sort', event.sortField);
      params = params.set('order', sortOrder);
    }
    if (event.globalFilter) {
      params = params.set('search_key', event.globalFilter);
    }
    this._service.getonlineusersList(params).subscribe(res=>{
      console.log('saleem **',res);
      if(res.status){
       this.cols = res.data.table_headers;
        this.userlist = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
}
