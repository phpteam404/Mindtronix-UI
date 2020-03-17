import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { ToasterService } from '../../../utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { Table } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  totalRecords: number; 
  loading: boolean;
  id: any = 0;
  displayBasic:boolean;
  franchiseId: any;
  schoolsList: any;
  dataInfo:any;
  franchiseList: any[];
  cols: any[];
  first:number=0;
  listParamsRef:any={};
  franchiseFilter:any='';

  constructor(private _router: Router,
              private _service: SchoolService,
              private _fService:FranchiseService,
              private _cService: CommonService, 
              private _toasterService: ToasterService, 
              private _ar: ActivatedRoute,
              private _confirm: ConfirmationService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }
  ngOnInit(): void {
    this._ar.queryParams.subscribe(params => {
      //console.log('params info',params);
      if(params['franchise_id']){
        this.id = atob(params['franchise_id']);
        this.loading=false;
      }else{
        this.loading=true;
      } 
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
    if(this.franchiseFilter)
      this._router.navigate(['update',data.name,btoa(data.school_id)],{queryParams:{'franchise_id':btoa(this.franchiseFilter)},relativeTo: this._ar});
    else
      this._router.navigate(['update',data.name,btoa(data.school_id)],{ relativeTo: this._ar});
  }
  goToStudent(data: any){
    this._router.navigate(['users/students'], {queryParams:{'school_id':btoa(data.school_id)}});
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  DeleteSchool(data) {
    this._confirm.confirm({
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'school_master')
                    .set('id', data.school_id)   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
               this.first=0;
               this.getschoolList();
          }else{
            this._toasterService.show('error',JSON.parse(res.error));
          }
        });
      },
      reject: () => {}
    });
  }
  loadSchoolsLazy(event: LazyLoadEvent) {
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
    if(this.loading){
      if(event.filters['franchise_id']){
        params =params.set('franchise_id',event.filters['franchise_id'].value.value);
        this.franchiseFilter = event.filters['franchise_id'].value.value;
      }
    }else {
      if(event.filters['franchise_id'] == undefined){
        return false;
      }else{
        params =params.set('franchise_id',event.filters['franchise_id'].value.value);
        this.franchiseFilter = event.filters['franchise_id'].value.value;
      }
    }
    this.listParamsRef = params;
    this._service.getschoolsList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = true;
      }
    });
  }
   
  getschoolList(){
    var params = new HttpParams()
                  .set('start',0+'')
                  .set('number',10+'')
    this.first = this.listParamsRef.updates[0].value;
    this._service.getschoolsList(this.listParamsRef).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.schoolsList = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });
  }
}
