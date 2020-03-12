import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { Table } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  cols: any[];
  totalRecords: number; 
  loading: boolean;
  displayBasic: boolean;
  schools:any[];
  franchise:any[];
  studentsList:any;
  first:number=0;
  schoolFilter:any;
  id:any;
  dataInfo:any;
  listParamsRef:any={};
  franchiseFilter:any='';
  constructor(private _router: Router, 
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _cService: CommonService,
              private _service:UserService,
              private _schoolService:SchoolService,
              private _fService:FranchiseService,
              public translate: TranslateService) {
                
    translate.setDefaultLang(environment.defaultLanguage);
    this.getSchoolsList();
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
  @ViewChild('dt') dt: Table;
  getSchoolsList() {
    this._schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
        this.schools.forEach(item => {
          if(item.value == this.id){
            this.dt.filter(item,'school_id','contains');
            this.schoolFilter=item;
          }
        });
      }
    });
  }
 
  ngOnInit(): void {
    this.getFranchiseList();
    this._ar.queryParams.subscribe(params => {
      console.log('params info',params);
      if(params['school_id']){
        this.id = atob(params['school_id']);
        this.loading=false;
      }else{
        this.loading=true;
      }
    });
    this.getSchoolsList();
  }

  AddNewStudent(event: Event){
    this._router.navigate(['add'], {relativeTo: this._ar});
  }

  EditStudent(data:any){
    if(this.franchiseFilter)
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.franchiseFilter)},relativeTo: this._ar});
    else
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{relativeTo: this._ar});
  }
  viewStudent(data:any){
    if(this.franchiseFilter)
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.franchiseFilter)},relativeTo: this._ar});
    else
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{relativeTo: this._ar});
  }

  DeleteStudent(){
     var params = new HttpParams()
        .set('id', this.dataInfo.user_id)
        .set('tablename', 'user');
     this._cService.delete(params).subscribe(res=>{
       console.log('res info',res);
      if(res.status){
        this.displayBasic = false;
        this.getList();
      }
    });
  }

  showBasicDialog(data:any) {
    this.displayBasic = true;
    this.dataInfo =data; 
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  loadStudentsLazy(event: LazyLoadEvent) {
    console.log(this.loading,'event--', event.filters['school_id']);
    // this.loading =true;
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
      if(event.filters['equals']){
        params =params.set('franchise_id',event.filters['equals'].value.value);
      }
    if(this.loading){
      if(event.filters['school_id']){
        params =params.set('school_id',event.filters['school_id'].value.value);
        this.franchiseFilter = event.filters['school_id'].value.value;
      }
    }else {
      if(event.filters['school_id'] == undefined){
        return false;
      }else{
        params =params.set('school_id',event.filters['school_id'].value.value);
        this.franchiseFilter = event.filters['school_id'].value.value;
      }
    }
    this.listParamsRef = params;
    this._service.getStudentsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = true;
      }
    });
  }
  // called after record delete instead of lazyLoadEvent function 
  getList(){
    var param = new HttpParams()
            .set('start',0+'')
            .set('number', 10+'');
    this.first = this.listParamsRef.updates[0].value;
    this._service.getStudentsList(this.listParamsRef).subscribe(res=>{
      if(res.status){
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });
  }  
}
