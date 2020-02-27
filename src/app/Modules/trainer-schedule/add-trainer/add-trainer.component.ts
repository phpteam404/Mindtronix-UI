import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Create Schedule";
  isUpdate:boolean=false;
  constructor(private _router: Router, private _toast: ToasterService) { }

  ngOnInit(): void {
  }
  scheduleForm  = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    schedule_date: new FormControl('', [Validators.required]),
    schedule_time: new FormControl('', [Validators.required]),
    to_time: new FormControl('', [Validators.required]),
  });

  get f() { return this.scheduleForm.controls; }

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
