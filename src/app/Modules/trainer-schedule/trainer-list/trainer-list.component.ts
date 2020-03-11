import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService} from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  dataInfo:any;
  loading: boolean;
  trainers:any;
  isCreate: boolean;
  displayBasic: boolean;
  hideSchedule:boolean;
  scheduleForm:FormGroup;
  first:number=0;
  TrainersList =[];
  constructor(private router: Router, private _toast: ToasterService,private _route: ActivatedRoute,
              private userService:UserService,private _ls: LocalStorageService,private _confirm: ConfirmationService) {
    
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

  DeleteTrainerSchedule(){
    var params = new HttpParams()
        .set('id', this.dataInfo.trainer_schedule_id)
        .set('tablename', 'trainer_schedule');
    this.userService.deleteTrainer(params).subscribe(res=>{
      if(res.status){
        this.first=0;
        this.displayBasic = false;
        this.getTrainersListInfo();
     }
      else{
        this._toast.show('error',JSON.parse(res.error));
      }
    });
  }

  showBasicDialog(data:any) {
    this.displayBasic = true;
    this.dataInfo =data; 
  }

  close(){
    this.scheduleForm.reset();
    this.displayBasic=false;
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
