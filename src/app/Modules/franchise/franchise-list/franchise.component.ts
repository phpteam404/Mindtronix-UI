import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'src/app/services/franchise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseListComponent implements OnInit {
  paginationObj: any;
  list: any[];
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(private _service: FranchiseService,private router: Router, private _route: ActivatedRoute) {
   
  }

  ngOnInit(): void {}

  AddNewFranchise(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  GoToSchools(event: Event){
    this.router.navigate(['schools_management'], {});
  }
  GoToUsers(event: Event){
    this.router.navigate(['users/all-users'], {});
  }

  viewFranchise(data){
    console.log('view===');
    this.router.navigate(['view/'+(data.franchise_name)+'/'+btoa(data.agency_id)],{ relativeTo: this._route});
  }
  editFranchise(data){
    console.log('edit===');
   this.router.navigate(['update/'+(data.franchise_name)+'/'+btoa(data.franchise_id)],{ relativeTo: this._route});
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

    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.list = res.data.data;
        this.cols = res.data.table_headers;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
}
