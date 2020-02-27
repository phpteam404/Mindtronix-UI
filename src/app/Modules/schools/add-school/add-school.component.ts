import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Create School";
  isUpdate:boolean = false;

  constructor(private _router: Router, private _toast: ToasterService) { }
  schoolForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    contact_person: new FormControl(''),
    phone_no: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('')
  });

  ngOnInit(): void {
  }

  submit(): any{
    this.submitted = false;
    if (this.schoolForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this._router.navigate(['schools_management']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  goToList(){
    this._router.navigate(['schools_management']);
  }

}
