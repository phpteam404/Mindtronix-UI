import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-update-user',
  templateUrl: '../add-user/add-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = null;
  roles: any;
  franchise: any;
  status: any;
  pageTitle:string = "Update User";
  isUpdate:boolean=true;

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
      first_name: new FormControl('ABCD',[Validators.required]),
      last_name: new FormControl('EFGH'),
      role: new FormControl({label:'Trainer', value:'Trainer'},[Validators.required]),
      franchise: new FormControl({label:'Mindtronix Learning Centre', value:'Mindtronix Learning Centre'},[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10), Validators.maxLength(10)]),
      status: new FormControl({label:'Active',value:{id:1,name:'active'}},[Validators.required]),
      password: new FormControl('',[ Validators.required]),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ]),
      cpassword: new FormControl('',[ Validators.required])
        //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ])
    });
  }
  Cancel(){
    this._router.navigate(['users/all-users']);
  }
}
