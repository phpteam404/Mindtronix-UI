import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
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
  listParamsRef:LazyLoadEvent;

  constructor(private router: Router,
             private _route: ActivatedRoute,
             private _cService: CommonService,
             private _service: FeeService, 
             public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }
  ngOnInit(): void {}

  addNewFee(event: Event){
    this.router.navigate(['add'],{relativeTo: this._route});
  }

  updateFee(data:any){
    this.router.navigate(['update/'+ data.name + '/' +btoa(data.fee_master_id)],{relativeTo: this._route})
  }
  loadFeeLazy(event: LazyLoadEvent) {
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
    this.listParamsRef = event;
    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
        this.cols = res.data.table_headers;
      }
    });
  }
  deleteFee(data:any){
    var params = new HttpParams()
              .set('tablename','fee_master')
              .set('id',data.fee_master_id)
    this._cService.delete(params).subscribe(res=>{
      if(res.status){
        this.getFeeList();
      }
    });
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  getFeeList(){
    this.first = this.listParamsRef.first;
    this.loadFeeLazy(this.listParamsRef);
    /*this._service.getList(this.listParamsRef).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });*/
  }
}
