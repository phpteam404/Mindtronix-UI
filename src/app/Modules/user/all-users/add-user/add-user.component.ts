import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  submitted = null;
  roles: any;
  franchise: any;
  status: any;

  formObj: any = {};

  constructor(private _router: Router, private _toast: ToasterService) { 
    this.roles = [
      {label:'Trainer', value:'Trainer'},
      {label:'Site Admin', value:'Site Admin'},
      {label:'Learning Center Admin', value:'Learning Center Admin'}
    ]; 
    this.franchise = [
      {label:'Mindtronix Learning Centre', value:'Mindtronix Learning Centre'},
      {label:'Mindtronix Learning Centre Vidyaranyarapura', value:'Mindtronix Learning Centre Vidyaranyarapura'}
    ]; 
    this.status = [
      {label:'Active',value:{id:1,name:'active'}},
      {label:'InActive',value:{id:2,name:'inactive'}}
    ]; 
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      last_name: new FormControl(''),
      role: new FormControl('',[Validators.required]),
      franchise: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10), Validators.maxLength(10)]),
      status: new FormControl('',[Validators.required]),
      password: new FormControl('',[ Validators.required]),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ]),
      cpassword: new FormControl('',[ Validators.required])
        //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ])
    });
  }

  

  get f(){    
    return this.addUserForm.controls;
  }

  submit(): any{
    this.submitted = false;
    console.log('this.addUserForm---', this.addUserForm.value);
    console.log('this.addUserForm errors---', this.addUserForm);
    if (this.addUserForm.valid) {
      let pass = this.addUserForm.get('password').value;
      let confirmPass = this.addUserForm.get('cpassword').value;    
      if(pass != confirmPass){
        this._toast.show('warning','Password and Confirm Password must match');
        return false;
      }  
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this._router.navigate(['all-users']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }


}
