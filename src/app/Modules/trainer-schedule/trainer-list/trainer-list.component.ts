import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import {ConfirmationService} from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  trainers:any;
  isCreate: boolean;
  hideSchedule:boolean=false;
  first:number=0;
  TrainersList =[];
  listParamsRef:LazyLoadEvent;
  constructor(private router: Router, 
              private _toast: ToasterService,
              private _route: ActivatedRoute,
              private _cService: CommonService,
              private _uService: UserService,
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
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'trainer_schedule')
                    .set('id', data.trainer_schedule_id)   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
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
    this.listParamsRef = event;
    this._uService.getTrainersList(params).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.TrainersList = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });
  }
  
  getTrainersListInfo(){
    this.first = this.listParamsRef.first;
    this.loadTrainersLazy(this.listParamsRef);
   /*this._uService.getTrainersList(this.listParamsRef).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.TrainersList = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });*/
  }

  conditionalValidation(){
    var userRole = this._ls.getItem('user',true).data.user_role_id;
    if(Number(userRole)==3) {
      this.hideSchedule=true;
    } 
    else {
      this.hideSchedule=false;
    }
  }
}
