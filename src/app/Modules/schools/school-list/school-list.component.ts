import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { ToasterService } from '../../../utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  totalRecords: number; 
  loading: boolean;
  id: any = 0;
  franchiseId: any;
  schoolsList: any;
  franchiseList: any[];
  cols: any[];
  first:number=0;
  constructor(private _router: Router,
              private _service: SchoolService,
              private _fService:FranchiseService,
              private _cService: CommonService, 
              private _toasterService: ToasterService, 
              private _ar: ActivatedRoute) {
  }
  ngOnInit(): void {
    this._ar.queryParams.subscribe(params => {
      //console.log('params info',params);
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
               //console.log('first item info',item);
               if(item.value == this.id){
                 this.dt.filter(item,'franchise_id','contains');
                 this.franchiseId=item;
               }
             });
       }
     });
   }

  AddNewSchool(event: Event){
    this._router.navigate(['add'], {relativeTo: this._ar});
  }
  EditSchool(data:any){
    console.log('data info',data);
    this._router.navigate(['update/'+data.name+'/'+btoa(data.school_id)],{ relativeTo: this._ar});
  }
  goToStudent(data: any){
    this._router.navigate(['users/students'], {queryParams:{'school_id':btoa(data.school_id)}});
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  DeleteSchool(data:any){
    var params = new HttpParams()
        .set('id', data.school_id)
        .set('tablename', 'school_master');
       // this._router.navigate(['schools_management'],{relativeTo:this._ar});
    this._cService.delete(params).subscribe(res=>{
      if(res.status){
        this.first=0;
       //this._toasterService.show('Success',res.message);
        this.getschoolList();
     }
      else{
        this._toasterService.show('error',JSON.parse(res.error));
      }
    });
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
    this._service.getschoolsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
   
  getschoolList(){
    var params = new HttpParams()
                  .set('start',0+'')
                  .set('number',10+'')
    this._service.getschoolsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
}
