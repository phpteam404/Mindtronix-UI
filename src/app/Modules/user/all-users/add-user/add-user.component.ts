import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { MasterService } from 'src/app/services/master.service';
import { FranchiseService } from 'src/app/services/franchise.service';

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
  isUpdate:boolean=false;

  formObj: any = {};
  pageTitle:string = "Create User";

  constructor(private _router: Router,
              private _toast: ToasterService,
              private _service: UserService,
              private _franchise: FranchiseService,
              private _master: MasterService,
              private _ls: LocalStorageService) { 
  
    /*this.franchise = [
      {label:'Mindtronix Learning Centre', value:'Mindtronix Learning Centre'},
      {label:'Mindtronix Learning Centre Vidyaranyarapura', value:'Mindtronix Learning Centre Vidyaranyarapura'}
    ]; 
    this.status = [
      {label:'Active',value:{id:1,name:'active'}},
      {label:'InActive',value:{id:2,name:'inactive'}}
    ]; */
  }

  ngOnInit(): void {
    this.getRolesList();
    this.getMasterList('status');
    this.getFranchiseList();
    console.log('this.status--', this.status);
    this.addUserForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl(''),
      user_role_id: new FormControl('',[Validators.required]),
      franchise_id: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone_no: new FormControl('',[Validators.required , Validators.minLength(10)]),
      status: new FormControl('',[Validators.required]),
      password: new FormControl('',[ Validators.required, Validators.minLength(8)]),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ]),
      cpassword: new FormControl('',[ Validators.required, Validators.minLength(8)])
        //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      // ])
    });
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
      var params={};
      params = this.addUserForm.value;
      params['status'] = this.addUserForm.value.status.value;
      params['franchise_id'] = this.addUserForm.value.franchise_id.value;
      params['user_role_id'] = this.addUserForm.value.user_role_id.value;
      this._service.saveUser(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._router.navigate(['users/all-users']);
        }else{
          this._toast.show('error',JSON.parse(res.error));
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  getRolesList(){
    var params=new HttpParams().set("dropdown","true");
    this._service.getRolesList(params).subscribe(res=>{
      if(res.status){
        this.roles = res.data.user_roles;
      }
    });
  }
  getFranchiseList(){
    this._franchise.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
        this.franchise = res.data.data;
      }
    });
  }
  getMasterList(masterKey): any{
    var params=new HttpParams()
                  .set('master_key',masterKey)
                  .set("dropdown","true");
    this._master.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'franchise')
          this.franchise =  res.data.data;
        if(masterKey == 'status'){
          this.status =  res.data.data;
          this.addUserForm.controls['status'].setValue(res.data.data[0]);
        }
      }
    });
  }
  cancel(){
    this._router.navigate(['users/all-users']);
  }

}
