import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LazyLoadEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { Table } from 'primeng/table';
import { FranchiseService } from 'src/app/services/franchise.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  roles: any;
  id: any=0;
  displayBasic:boolean;
  dataInfo:any;
  franchiseId: any;
  allUsersList: any;
  totalRecords:number;
  loading: boolean;
  franchiseList: any[];
  cols: any[];
  first:number=0;
  constructor(private router: Router,
              private _service:UserService,
              private _cService: CommonService,
              private _fService: FranchiseService, 
              private _route: ActivatedRoute,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      console.log('params info',params);
      if(params['franchise_id'])this.id = atob(params['franchise_id']);
    });
    this.getFranchiseDropdown();
  }
  
  @ViewChild('dt') dt: Table;
  getFranchiseDropdown(){
    this._fService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
            this.franchiseList = res.data.data;
            this.franchiseList.forEach(item => {
              if(item.value == this.id){
                this.dt.filter(item,'franchise_id','contains');
                this.franchiseId=item;
              }
            });
      }
    });
  }

  AddNewUser(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  editUser(data:any){
    this.router.navigate(['update/'+data.user_name+'/'+btoa(data.user_id)], {relativeTo: this._route});
  }
  deleteUser(){
    var params = new HttpParams()
                  .set('tablename','user')
                  .set('id',this.dataInfo.user_id);
    this._cService.delete(params).subscribe(res => {
        if(res.status){
          this.first=0;
          this.displayBasic=false;
          this.getList();
        }
    })
  }
  showBasicDialog(data:any) {
    this.displayBasic = true;
    this.dataInfo =data; 
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
    if(event.filters['franchise_id']){
      params =params.set('franchise_id',event.filters['franchise_id'].value.value);
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
