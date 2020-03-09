import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService} from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';

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
  first:number=0;
  TrainersList =[];
  constructor(private router: Router, private _toast: ToasterService,private _route: ActivatedRoute,private userService:UserService) {
    
   }

  ngOnInit(): void {
  }

  AddNewTrainer(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditTrainerSchedule(data:any){
    this.router.navigate(['update/'+data.topic+'/'+btoa(data.trainer_schedule_id)],{ relativeTo: this._route});
  }

  DeleteTrainerSchedule(data:any){
    var params = new HttpParams()
        .set('id', data.trainer_schedule_id)
        .set('tablename', 'trainer_schedule');
    this.userService.deleteTrainer(params).subscribe(res=>{
      if(res.status){
        this.first=0;
        this.getTrainersListInfo();
     }
      else{
        this._toast.show('error',JSON.parse(res.error));
      }
    });
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
}
