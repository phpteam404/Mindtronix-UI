import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  cities:any;
  submitted = false;
  constructor(private _router: Router, private _toast: ToasterService) {     
    console.log('AddStudentComponent---' );
      this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
      ];
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    manager: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    landmark: new FormControl(''),
    fee_structures: new FormControl(''),  
  });
  get getname(): any { return this.form.get('name'); }
  get getemail(): any { return this.form.get('email'); }
  get getmanager(): any { return this.form.get('manager'); }
  get getphone(): any { return this.form.get('phone'); }
  get getaddress(): any { return this.form.get('address'); }
  get getlandmark(): any { return this.form.get('landmark'); }
  get getfeeStructures(): any { return this.form.get('fee_structures'); }

  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  submit(): any{
    this.submitted = true;
    if (this.form.valid) {
      this._toast.show('success','Successfully Added');
      this._router.navigate(['franchise']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['franchise']);
  }

}
