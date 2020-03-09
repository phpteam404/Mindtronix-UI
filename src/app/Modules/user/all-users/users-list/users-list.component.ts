import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LazyLoadEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  roles: any;
  allUsersList: any;
  totalRecords:number;
  loading: boolean;
  cols: any[];
  first:number=0;
  constructor(private router: Router,private _service:UserService,private _cService: CommonService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.getList();
    console.log('getList');
  }

  AddNewUser(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  editUser(data:any){
    this.router.navigate(['update/'+data.user_name+'/'+btoa(data.user_id)], {relativeTo: this._route});
  }
  deleteUser(data:any){
    var params = new HttpParams()
                  .set('tablename','user')
                  .set('id',data.user_id);
    this._cService.delete(params).subscribe(res => {
        if(res.status){
          this.first=0;
          this.getList();
        }
    })
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  loadSchoolsLazy(event: LazyLoadEvent) {
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
    this._service.getUsersList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.allUsersList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }

  getList(){
    var params = new HttpParams()
      .set('start', 0+'')
      .set('number', 10+'');
    this._service.getUsersList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.allUsersList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }

}
