import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { ToasterService } from '../../../utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  totalRecords: number; 
  loading: boolean;
  schoolsList: any;
  cols: any[];
  first:number=0;
  constructor(private _router: Router,
              private _service: SchoolService,
              private _cService: CommonService, 
              private _toasterService: ToasterService, 
              private _ar: ActivatedRoute) {
  }
  ngOnInit(): void { }

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
