import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { MasterService } from 'src/app/services/master.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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
  franchiseId: any;
  status: any;
  isUpdate:boolean=false;
  enableFranchise:boolean=true;
  excludeRoles:any = [ "Mindtronix Content","Mindtronix Sales","Mindtronix Accounts"];
  formObj: any = {};
  hideField:boolean=false;
  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _service: UserService,
              private _franchise: FranchiseService,
              private _master: MasterService,
              private _ls: LocalStorageService,
              public translate: TranslateService) {
                
     translate.setDefaultLang(environment.defaultLanguage);
  
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
    this.addUserForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl(''),
      user_role_id: new FormControl('',[Validators.required]),
      franchise_id: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone_no: new FormControl('',[Validators.required , Validators.minLength(10)]),
      status: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8),
                                    Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@!%*#?&().-_=+]).{8,20})')
      ]),
      cpassword: new FormControl('')
    });
    this._ar.queryParams.subscribe(params => {
      if(params.franchise_id){
        this.franchiseId = atob(params.franchise_id);
      }
    });
  }
  
  getStatus(){return this.addUserForm.controls.status.value.value;}
  getfranchise()
  {
    if(this.addUserForm.controls.franchise_id)
         return this.addUserForm.controls.franchise_id.value.value;
    else return null;
  }
  getuserRole(){return this.addUserForm.controls.user_role_id.value.value;}
  getuserRoleName(){return this.addUserForm.controls.user_role_id.value.label;}
  submit(): any{
    this.submitted = false;
    if (this.addUserForm.valid) {
      let pass = this.addUserForm.get('password').value;
      let confirmPass = this.addUserForm.get('cpassword').value;    
      if(pass != confirmPass){
        this._toast.show('warning','Password and Confirm Password must match');
        return false;
      }  
      var params={};
      params = this.addUserForm.value;
      params['status'] = this.getStatus();
      if(this.addUserForm.controls.franchise_id.value!=null){
        params['franchise_id'] = this.addUserForm.controls.franchise_id.value.value;
      }else delete params['franchise_id'];
      params['user_role_id'] = this.getuserRole();
      this._service.saveUser(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.cancel();
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
    if(this.franchiseId)
      this._router.navigate(['users/all-users'],{queryParams:{'franchise_id':btoa(this.franchiseId)}});
    else this._router.navigate(['users/all-users']);
  }
  roleBasedFranchise(){
    // var roleId = this.getuserRole();
    var roleName = this.getuserRoleName();
    if(this.excludeRoles.includes(roleName)){
    // if(Number(roleId)==10 || Number(roleId)==11 ||Number(roleId)==12) {
      this.addUserForm.get('franchise_id').clearValidators();      
      this.addUserForm.controls['franchise_id'].updateValueAndValidity();
     this.addUserForm.controls['franchise_id'].setValue(null);
      this.enableFranchise=false;
    } else {
      this.addUserForm.controls['franchise_id'].setValidators([Validators.required]);
      this.addUserForm.controls['franchise_id'].updateValueAndValidity();
      this.enableFranchise=true;
    }
  }

}
