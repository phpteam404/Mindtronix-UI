import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService} from 'src/app/services/user.service';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Create Schedule";
  isUpdate:boolean=false;
  constructor(private _router: Router,
               private _toast: ToasterService,
               private userService:UserService,
               public datepipe: DatePipe) {
    var currTime:string ='';
    
    currTime = new Date().setHours(15) + ':' + new Date().setMinutes(15) + ':'+  new Date().setSeconds(0);
    console.log('currTime--',formatDate(new Date(), 'hh:mm:ss', 'en-US', '+0530'));
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


  submit(): any {
    console.log(this.scheduleForm.value);
    this.submitted = false;
    if (this.scheduleForm.valid) {
      var params={};
      params = this.scheduleForm.value;
      params['date'] =this.datepipe.transform(this.scheduleForm.value.date, 'yyyy/MM/dd');
      params['from_time'] =this.datepipe.transform(this.scheduleForm.value.from_time,'HH:mm ');   
      params['to_time'] =this.datepipe.transform(this.scheduleForm.value.to_time,'HH:mm ');
      this.userService.addTrainer(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._router.navigate(['trainer-schedule']);
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
