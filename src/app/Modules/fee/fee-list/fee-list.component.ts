import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss']
})
export class FeeListComponent implements OnInit {

  list: any;
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(private router: Router, private _route: ActivatedRoute,
             private _service: FeeService, private _toast: ToasterService) {
   
    this.cols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
  }
  ngOnInit(): void {}

  addNewFee(event: Event){
    this.router.navigate(['add'],{relativeTo: this._route});
  }

  UpdateFee(data:any){
    this.router.navigate(['update/'+ btoa(data.fee_master_id)],{relativeTo: this._route})
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
        params = params.set('search', event.globalFilter);
    }
    console.log('params---', params);
    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.list = res.data;
        this.totalRecords = res.total_records;
        this.loading = false;
      }
    });
  }

}
