import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
  totalRecords: number; 
  loading: boolean;
  TicketList: any;
  constructor(private router: Router, 
              private _route: ActivatedRoute,
              public translate: TranslateService,
              private _tService:TicketService) {
                translate.setDefaultLang(environment.defaultLanguage);
  }
  ngOnInit(): void {
    //this.getList();
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  AddNewTicket(event: Event){
    this.router.navigate(['create'], {relativeTo: this._route});
  }

  viewTicket(data:any){
    this.router.navigate(['view/'+data.issue_title+'/'+btoa(data.ticket_id)], {relativeTo: this._route});
  }

  loadTicketLazy(event: LazyLoadEvent) {
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
    this._tService.getTicketList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.TicketList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }

}
