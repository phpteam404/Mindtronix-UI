import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService} from 'src/app/services/user.service';
import { DatePipe, formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {
  submitted = null;
  isUpdate:boolean=false;
  fromTime:any;
  toTime:any;
  validTime:boolean;
  minDate:Date= new Date();
  constructor(private _router: Router,
               private _toast: ToasterService,
               private userService:UserService,
               public translate: TranslateService, 
               public datepipe: DatePipe) {
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
  }
  scheduleForm  = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    from_time: new FormControl('', [Validators.required]),
    to_time: new FormControl('', [Validators.required]),
  });

  getDate() { return this.scheduleForm.value.date;}
  getFromTime() { return this.scheduleForm.value.from_time;}
  getToTime() { return this.scheduleForm.value.to_time;}

  submit(): any {
    this.submitted = false;
    this.validTime = true;
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
      params['from_time'] =this.datepipe.transform(this.getFromTime(),'HH:mm ');   
      params['to_time'] =this.datepipe.transform(this.getToTime(),'HH:mm ');
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
