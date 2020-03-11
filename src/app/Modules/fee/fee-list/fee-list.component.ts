import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Http } from '@angular/http';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss']
})
export class FeeListComponent implements OnInit {

  list: any;
  first:number=0;
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(private router: Router,
             private _route: ActivatedRoute,
             private _cService: CommonService,
             private _service: FeeService, 
             private _toast: ToasterService,
             public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
   
    // this.cols = [
    //   { field: 'name', header: 'Fee Title' },
    //   { field: 'amount', header: 'Fee Amount (₹)' },
    //   { field: 'term', header: 'Term' },
    //   { field: 'discount', header: 'Discount (%)' },
    //   { field: 'status', header: 'Status' },
    //   { field: 'actions', header: 'Actions' }
    // ];
  }
  ngOnInit(): void {}

  addNewFee(event: Event){
    this.router.navigate(['add'],{relativeTo: this._route});
  }

  updateFee(data:any){
    this.router.navigate(['update/'+ data.name + '/' +btoa(data.fee_master_id)],{relativeTo: this._route})
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log('event--', event);
    console.log('event.first--', event.first);
    console.log('event.rows--', event.rows);
    console.log('event.sortField--', event.sortField);
    console.log('event.sortOrder--', event.sortOrder);
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    //imitate db connection over a network
    
    var sortOrder= (event.sortOrder==1)?"ASC":"DESC";
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
    console.log('params---', params);
    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
        this.cols = res.data.table_headers;
        this.loading = false;
      }
    });
  }
  deleteFee(data:any){
    var params = new HttpParams()
              .set('tablename','fee_master')
              .set('id',data.fee_master_id)
    this._cService.delete(params).subscribe(res=>{
      if(res.status){
        this.first=0;
       //this._toasterService.show('Success',res.message);
        this.getFeeList();
      }
    });
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  getFeeList(){
    var params = new HttpParams()
                  .set('start',0+'')
                  .set('number',10+'')
    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
}
