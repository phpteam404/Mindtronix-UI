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
  goToSchools(data : any){
    this.router.navigate(['schools_management'], { queryParams: { franchise_id: btoa(data.franchise_id)}});
  }
  goToUsers(data : any){
    this.router.navigate(['users/all-users'], { queryParams: { franchise_id: btoa(data.franchise_id)}});
  }

  viewFranchise(data){
    this.router.navigate(['view/'+(data.franchise_name)+'/'+btoa(data.franchise_id)],{ relativeTo: this._route});
  }
  editFranchise(data){
   this.router.navigate(['update/'+(data.franchise_name)+'/'+btoa(data.franchise_id)],{ relativeTo: this._route});
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
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

    this._service.getList(params).subscribe(res=>{
      if(res.status){
        this.list = res.data.data;
        this.cols = res.data.table_headers;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }

  isEnabled(row){
    if(row.status == 'Active') return true;
    else return false;
  }
}
