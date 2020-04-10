import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { Table } from 'primeng/table';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
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
  loading1: boolean;
  displayBasic: boolean;
  schools:any[];
  franchise:any[];
  studentsList:any;
  first:number=0;
  schoolFilter:any;
  franchiseFilter:any;
  studentId:any;
  franchiseId:any;
  dataInfo:any;
  listParamsRef:LazyLoadEvent;
  schoolFilterId:any='';
  franchiseFilterId:any='';
  hideField:boolean;
  lcRoles = ["2","5","10"];
  constructor(private _router: Router, 
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _cService: CommonService,
              private _service:UserService,
              private _ls: LocalStorageService,
              private _schoolService:SchoolService,
              private _fService:FranchiseService,
              private _confirm: ConfirmationService,
              public translate: TranslateService) {                
    translate.setDefaultLang(environment.defaultLanguage);
    this.getSchoolsList();
    this.getFranchiseList();
  }
  /*
    this service is for getting franchise dropdown through service
  */
  @ViewChild('dt') dt: Table;
  getFranchiseList(){
    this._fService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
        this.franchise = res.data.data;
        this.franchise.forEach(item => {
          if(item.value == this.franchiseId){
            this.dt.filter(item,'franchise_id','equals');
            this.franchiseFilter=item;
          }
        });
      }
    });
  }
  /*
    this service is for getting schools dropdown through service
  */
  getSchoolsList() {
    this._schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
        this.schools.forEach(item => {
          if(item.value == this.studentId){
            this.dt.filter(item,'school_id','contains');
            this.schoolFilter=item;
          }
        });
      }
    });
  }
 
  ngOnInit(): void {
    this.getFranchiseList();
    this.disablelearningcenter();
    this._ar.queryParams.subscribe(params => {
      if(params['school_id'] || params['franchise_id']){
        if(params['school_id']){
          this.studentId = atob(params['school_id']);
          this.loading=false;
        }
        if(params['franchise_id']){
          this.franchiseId = atob(params['franchise_id']);
          this.loading1=false;
        }
      }else{
        this.loading=true;
        this.loading1=true;
      }
    });
    this.getSchoolsList();
  }

  AddNewStudent(event: Event){
    this._router.navigate(['add'], {relativeTo: this._ar});
  }

  EditStudent(data:any){
    if(this.schoolFilterId && this.franchiseFilterId=='')
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.schoolFilterId)},relativeTo: this._ar});
    else if(this.schoolFilterId=='' && this.franchiseFilterId)
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{queryParams:{'franchise_id':btoa(this.franchiseFilterId)},relativeTo: this._ar});
    else if(this.schoolFilterId && this.franchiseFilterId)
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.schoolFilterId),'franchise_id':btoa(this.franchiseFilterId)},relativeTo: this._ar});
    else
      this._router.navigate(['update',data.student_name,btoa(data.user_id)],{relativeTo: this._ar});
  }
  viewStudent(data:any){
    if(this.schoolFilterId && this.franchiseFilterId=='')
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.schoolFilterId)},relativeTo: this._ar});
    else if(this.schoolFilterId=='' && this.franchiseFilterId)
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{queryParams:{'franchise_id':btoa(this.franchiseFilterId)},relativeTo: this._ar});
    else if(this.schoolFilterId && this.franchiseFilterId)
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.schoolFilterId),'franchise_id':btoa(this.franchiseFilterId)},relativeTo: this._ar});
    else
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{relativeTo: this._ar});
    /*if(this.schoolFilterId)
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{queryParams:{'school_id':btoa(this.schoolFilterId)},relativeTo: this._ar});
    else
      this._router.navigate(['view',data.student_name,btoa(data.user_id)],{relativeTo: this._ar});*/
  }

  DeleteStudent(data) {
    this._confirm.confirm({
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'student')
                    .set('id', data.user_id)   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
               this.first=0;
               this.getList();
          }else{
            this._toast.show('error',JSON.parse(res.error));
          }
        });
      },
      reject: () => {}
    });
  }

  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  loadStudentsLazy(event: LazyLoadEvent) {
    console.log('event*-*-*-*', event);
    console.log('event.filters["franchise_id"]', event.filters['franchise_id']);
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
    /* if(event.filters['equals']){
      params =params.set('franchise_id',event.filters['equals'].value.value);
    }*/
    if(this.loading){
      if(event.filters['school_id']){
        params =params.set('school_id',event.filters['school_id'].value.value);
        this.schoolFilterId = event.filters['school_id'].value.value;
      }
    }else {
      if(event.filters['school_id'] == undefined){
        if(event.filters['franchise_id'] == undefined) return false;
        else{}
      }else{
        params =params.set('school_id',event.filters['school_id'].value.value);
        this.schoolFilterId = event.filters['school_id'].value.value;
      }
    }    
    if(this.loading1){
      if(event.filters['franchise_id']){
        params =params.set('franchise_id',event.filters['franchise_id'].value.value);
        this.franchiseFilterId = event.filters['franchise_id'].value.value;
      }
    }else {
      if(event.filters['franchise_id'] == undefined){
        if(event.filters['school_id'] == undefined) return false;
        else{}
      }else{
        params =params.set('franchise_id',event.filters['franchise_id'].value.value);
        this.franchiseFilterId = event.filters['franchise_id'].value.value;
      }
    }
    this.listParamsRef = event;
    this._service.getStudentsList(params).subscribe(res=>{
      if(res.status){
        if(params.get('school_id')) this.schoolFilterId = params.get('school_id');
        else this.schoolFilterId ='';
        if(params.get('franchise_id')) this.franchiseFilterId = params.get('franchise_id');
        else this.franchiseFilterId = '';
        
        this.cols = res.data.table_headers;
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = true;
        this.loading1 = true;
      }
    });
  }
  // called after record delete instead of lazyLoadEvent function 
  getList(){
    this.first = this.listParamsRef.first;
    this.loadStudentsLazy(this.listParamsRef);
  }
  disablelearningcenter(){
    var roleId = this._ls.getItem('user',true).data.user_role_id.toString();
    if(this.lcRoles.includes(roleId)) this.hideField= false;
    else this.hideField=true;
  }  
}
