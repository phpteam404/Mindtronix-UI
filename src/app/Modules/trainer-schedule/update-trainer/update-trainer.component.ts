import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Time } from 'highcharts';
import { Http } from '@angular/http';
@Component({
  selector: 'app-update-trainer',
  templateUrl: '../add-trainer/add-trainer.component.html',
  styleUrls: ['./update-trainer.component.scss']
})
export class UpdateTrainerComponent implements OnInit {
  submitted = null;
  trainerObj:any={};
  isUpdate:boolean=true;
  scheduleForm: FormGroup;
  trainers:any;
  fromTime:any;
  toTime:any;
  validTime:boolean;
  minDate:Date= new Date();
  constructor(private _router: Router,private _ar: ActivatedRoute, private _toast: ToasterService,
              private userService:UserService,public datepipe: DatePipe) { 
    var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      var reqParams = new HttpParams().set('trainer_schedule_id',id);
      userService.getTrainerById(reqParams).subscribe(res=>{
        if(res.status){
          this.trainerObj = res.data.data[0];
          this.scheduleForm.setValue({
            trainer_schedule_id: this.trainerObj.trainer_schedule_id,
            topic: this.trainerObj.topic,
            date:new Date(this.trainerObj.date),
            description: this.trainerObj.description,
            from_time: new Date(this.trainerObj.from_time),
            to_time: new Date(this.trainerObj.to_time),
          });
          this.fromTime = this.getFromTime();
          this.toTime = this.getToTime();
          if (this.fromTime.getTime() > this.toTime.getTime()) {
            this.validTime=false;
          }else this.validTime=true;
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

  getDate() { return this.scheduleForm.value.date;}
  getFromTime() { return this.scheduleForm.value.from_time;}
  getToTime() { return this.scheduleForm.value.to_time;}

  submit(): any {
    this.submitted = false;
    if (this.scheduleForm.valid) {
      this.fromTime = this.getFromTime();
      this.toTime = this.getToTime();
      if (this.fromTime.getTime() > this.toTime.getTime()) {
        this.validTime=false;
        this._toast.show('warning','To Time must be more than From Time');
        return false;
      }
      var params={};
      params = this.scheduleForm.value;
      params['date'] =this.datepipe.transform(this.getDate(), 'yyyy/MM/dd');
      params['from_time'] =this.datepipe.transform(this.getFromTime(),'HH:mm');
      params['to_time'] =this.datepipe.transform(this.getToTime(),'HH:mm');
      this.userService.addTrainer(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.goToList();
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['trainer-schedule']);
  }
  timeChanged1(){
    this.validTime=false;
    this.fromTime = this.getFromTime();
    this.toTime = this.getToTime();
    if(this.toTime !=''){
      if (this.fromTime.getTime() < this.toTime.getTime()) {
        this.validTime=true;
      }else{
        if(!this.scheduleForm.valid && this.submitted==null){
          this.validTime=false;
        }
      }
    }else {
      this.validTime=true;
    }
  }
  timeChanged(){
    this.validTime=false;
    this.fromTime = this.getFromTime();
    this.toTime = this.getToTime();
    if(this.fromTime != ''){
      if (this.fromTime.getTime() < this.toTime.getTime()) {
        this.validTime=true;
      }else{
        this.validTime=false;
      }
    }else {
      this.validTime=true;
    }
  }
}
