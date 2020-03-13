import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService} from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  loading: boolean;
  trainers:any;
  isCreate: boolean;
  hideSchedule:boolean;
  scheduleForm:FormGroup;
  first:number=0;
  TrainersList =[];
  constructor(private router: Router, 
              private _toast: ToasterService,
              private _route: ActivatedRoute,
              private _commonService: CommonService,
              private userService:UserService,
              private _ls: LocalStorageService,
              public translate: TranslateService, 
              private _confirm: ConfirmationService) {
                translate.setDefaultLang(environment.defaultLanguage);
    
   }

  ngOnInit(): void {
    this.conditionalValidation();
  }

  AddNewTrainer(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditTrainerSchedule(data:any){
    this.router.navigate(['update/'+data.topic+'/'+btoa(data.trainer_schedule_id)],{ relativeTo: this._route});
  }
  
  DeleteTrainerSchedule(data) {
    this._confirm.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'trainer_schedule')
                    .set('id', data.trainer_schedule_id)   
        this._commonService.delete(params).subscribe(res=>{
          if(res.status){
               this.first=0;
               this.getTrainersListInfo();
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
  loadTrainersLazy(event: LazyLoadEvent) {
    //console.log('event--', event);
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
    this.userService.getTrainersList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.TrainersList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
  
  getTrainersListInfo(){
    var params = new HttpParams()
                  .set('start',0+'')
                  .set('number',10+'')
    this.userService.getTrainersList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.TrainersList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }

  conditionalValidation(){
    var userRole = this._ls.getItem('user',true).data.user_role_id;
    console.log('userRole---', userRole);
    if(Number(userRole)==3) {
      this.hideSchedule=true;
    } 
    else {
      this.hideSchedule=false;
    }
  }
}
