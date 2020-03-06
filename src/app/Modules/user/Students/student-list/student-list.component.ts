import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  cols: any[];
  totalRecords: number; 
  loading: boolean;
  schools:any[];
  franchise:any[];
  studentsList:any;
  first:number=0;
  constructor(private _router: Router, private _ar: ActivatedRoute,
              private _toast: ToasterService,private _cService: CommonService,
              private _service:UserService,
              private _schoolService:SchoolService,private _fService:FranchiseService) {
    this.getStudentsList();
    this.getFranchiseList();
  }
  //this service is for getting franchise dropdown through service
  getFranchiseList(){
    this._fService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
        this.franchise = res.data.data;
      }
    });
  }
  //this service is for getting schools dropdown through service
  getStudentsList() {
    this._schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
      }
    });
  }
 
  ngOnInit(): void {
    this.getStudentsList();
    this.getFranchiseList();
  }

  AddNewStudent(event: Event){
    this._router.navigate(['add'], {relativeTo: this._ar});
  }

  EditStudent(data:any){
    this._router.navigate(['update/'+data.student_name+'/'+btoa(data.user_id)],{ relativeTo: this._ar});
  }
  viewStudent(data:any){
    this._router.navigate(['view/'+data.name+'/'+btoa(data.id)],{ relativeTo: this._ar});
  }

  DeleteStudent(data:any){
     var params = new HttpParams()
        .set('id', data.user_id)
        .set('tablename', 'user');
     this._cService.delete(params).subscribe(res=>{
       console.log('res info',res);
      if(res.status){
        this.first=0;
        this.getList();
      }
    });
  }
  loadStudentsLazy(event: LazyLoadEvent) {
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
    if(event.filters['contains']){
      params =params.set('school_id',event.filters['contains'].value.value);
    }
    if(event.filters['equals']){
      params =params.set('franchise_id',event.filters['equals'].value.value);
    }
    this._service.getStudentsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
  // called after record delete instead of lazyLoadEvent function 
  getList(){
    var param = new HttpParams()
            .set('start',0+'')
            .set('number', 10+'');
    this._service.getStudentsList(param).subscribe(res=>{
      if(res.status){
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }  
}
