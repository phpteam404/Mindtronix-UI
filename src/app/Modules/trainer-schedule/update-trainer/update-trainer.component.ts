import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Time } from 'highcharts';
@Component({
  selector: 'app-update-trainer',
  templateUrl: '../add-trainer/add-trainer.component.html',
  styleUrls: ['./update-trainer.component.scss']
})
export class UpdateTrainerComponent implements OnInit {
  submitted = null;
  trainerObj:any={};
  pageTitle:string ="Update Schedule";
  isUpdate:boolean=true;
  scheduleForm: FormGroup;
  trainers:any;
  constructor(private _router: Router,private _ar: ActivatedRoute, private _toast: ToasterService,
              private userService:UserService,public datepipe: DatePipe) { 
    var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      userService.getTrainerById({'trainer_schedule_id':id}).subscribe(res=>{
        if(res.status){
          this.trainerObj = res.data.data[0];
          //console.log('trainerobj info',this.trainerObj);
          this.scheduleForm.setValue({
            trainer_schedule_id: this.trainerObj.trainer_schedule_id,
            topic: this.trainerObj.topic,
            date:new Date(this.trainerObj.date),
            description: this.trainerObj.description,
            from_time: new Date(this.trainerObj.from_time),
            to_time: new Date(this.trainerObj.to_time),
          });          
        }
      });
    });
  }

  ngOnInit(): void {
    this.scheduleForm  = new FormGroup({
      trainer_schedule_id: new FormControl(this.trainerObj.trainer_schedule_id),
      topic: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      from_time: new FormControl('', [Validators.required]),
      to_time: new FormControl('', [Validators.required]),
    });
  }

  submit(): any {
    this.submitted = false;
    if (this.scheduleForm.valid) {
      var params={};
      params = this.scheduleForm.value;
      params['date'] =this.datepipe.transform(this.scheduleForm.value.date, 'yyyy/MM/dd');
      params['from_time'] =this.datepipe.transform(this.scheduleForm.value.from_time,'HH:mm');
      params['to_time'] =this.datepipe.transform(this.scheduleForm.value.to_time,'HH:mm');
      this.userService.addTrainer(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          // this._toast.show('success',res.message);
          this.goToList();
        }else{
          this._toast.show('error',JSON.parse(res.error));
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['trainer-schedule']);
  }
}
