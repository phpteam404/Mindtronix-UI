import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from '../../../utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
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
  constructor(private router: Router,
              private schoolService: SchoolService, 
              private _commonService: CommonService, 
              private _toasterService: ToasterService, 
              private _route: ActivatedRoute) {
    
    
  }
  ngOnInit(): void {
    // this.getschoolList();
    // console.log('getList');
  }

  AddNewSchool(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditSchool(data:any){
    console.log('data info',data);
    this.router.navigate(['update/'+data.name+'/'+btoa(data.school_id)],{ relativeTo: this._route});
}
  GoToStudent(event: Event){
    this.router.navigate(['users/students'], {});
  }

  DeleteSchool(data:any){
    console.log('data info',data);
     var params = new HttpParams()
        .set('id', data.school_id)
        .set('tablename', 'school_master');
    this.schoolService.deleteSchool(params).subscribe(res=>{
     if(res.status){
       //this._toasterService.show('Success',res.message);
       this.getschoolList();
     }
     else{
        this._toasterService.show('error',JSON.parse(res.error));
     }
    });
  }
  loadSchoolsLazy(event: LazyLoadEvent) {
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
      params = params.set('search', event.globalFilter);
    }
    this.schoolService.getschoolsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
   
  getschoolList(){
    this.schoolService.getschoolsList({}).subscribe(res=>{
      if(res.status){
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
}
