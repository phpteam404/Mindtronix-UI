import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-trainer',
  templateUrl: '../add-trainer/add-trainer.component.html',
  styleUrls: ['./update-trainer.component.scss']
})
export class UpdateTrainerComponent implements OnInit {
  submitted = null;
  fullObject:any={};
  pageTitle:string="Update Schedule";
  // scheduleForm: FormGroup;
  trainers:any;
  constructor(private _router: Router,private _ar: ActivatedRoute, private _toast: ToasterService) { 
    this.trainers = [
      {id:1,topic:'Gesture Controlled Robot', time:'10:00 AM',totime:'12:00 AM', date:'27-02-2020'},
      {id:2,topic:'Edge Detection Robot', time:'11:00 AM',totime:'12:30 PM', date:'28-02-2020'},
      {id:3,topic:'Fire Fighting Robot', time:'10:30 AM',totime:'11:00 AM', date:'29-02-2020'},
      {id:4,topic:'Mobile Controlled Robot', time:'11:15 AM',totime:'12:00 AM', date:'01-03-2020'},
      {id:5,topic:'Line Follower Robot', time:'10:45 AM',totime:'11:45 AM', date:'02-03-2020'},
      {id:6,topic:'Gesture Controlled Robot', time:'02:00 PM',totime:'03:00 PM', date:'03-03-2020'},
      {id:7,topic:'Fire Fighting Robot', time:'12:00 AM',totime:'02:00 PM', date:'04-03-2020'},
      {id:8,topic:'Line Follower Robot', time:'03:00 PM',totime:'05:00 PM', date:'05-03-2020'},
    ];

    var id;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      console.log('params===>>>', id);
      this.fullObject = this.trainers.filter(t=>t.id == id)[0];
      this.scheduleForm.setValue({
        topic: this.fullObject.topic,
        schedule_date: this.fullObject.date,
        schedule_time: this.fullObject.time,
        to_time: this.fullObject.time,
      });
    });
  }

  ngOnInit(): void {
  }
  scheduleForm  = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    schedule_date: new FormControl('', [Validators.required]),
    schedule_time: new FormControl('', [Validators.required]),
    to_time: new FormControl('', [Validators.required]),
  });
  submit(){
    this.submitted = false;
    if(this.scheduleForm.valid){
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this.goToList();
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['trainer-schedule']);
  }
}
