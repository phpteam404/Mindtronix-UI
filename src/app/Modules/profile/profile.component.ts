import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CommonService} from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { MasterService } from 'src/app/services/master.service';
import { SchoolService } from 'src/app/services/school.service';
import { HttpParams } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  designation: any;
  submitted=null;
  grade:any;
  schools:any;
  profileInfo:any;
  othersInfo:any
  hideothers:boolean;
  basicInformationForm:FormGroup;
  passwordForm:FormGroup;
  othersForm:FormGroup;

  constructor(private _router: Router, 
              private _toast: ToasterService,
              private _cService:CommonService,
              private _ls: LocalStorageService,
              private _sService:SchoolService,
              public _ss: SharedService,
              private masterService:MasterService,
              public translate: TranslateService) {
                this._ss = _ss;
        translate.setDefaultLang(environment.defaultLanguage); 
   }

  ngOnInit(): void {
    this.basicInformationForm  = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name :new FormControl('',),
      role:new FormControl(''),
      email: new FormControl(''),
      phone_no: new FormControl('',[Validators.minLength(10)]),
    });

    this.passwordForm  = new FormGroup({
      old_password: new FormControl('', [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@!%*#?&().-_=+]).{8,20})')]),
      new_password :new FormControl('',[Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@!%*#?&().-_=+]).{8,20})')]),
      confirm_password:new FormControl('')
    });

    this.othersForm  = new FormGroup({
      type: new FormControl('', [Validators.required]),
      grade :new FormControl('',[Validators.required]),
      school_name:new FormControl('',[Validators.required])
    });
    this.getProfileInfo();
    this.getotherInfo();
    this.conditionalValidation();
    this.getMasterDropdown('grade');
    this.getMasterDropdown('student_type');
    this.getschoolsDropdown();
  }

 
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'grade')
          this.grade =  res.data.data;
        if(masterKey=='student_type')
         this.designation = res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }

  getschoolsDropdown(){
    this._sService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
      }
    });
  }
  submit(): any {
    this.submitted = false;
    if (this.basicInformationForm.valid) {
      var params={};
      params = this.basicInformationForm.value;
      this._cService.addProfile(params).subscribe(res => {
        if (res.status) {
          var obj={};
          obj = this._ls.getItem('user',true);
          obj['data'].first_name = this.basicInformationForm.value.first_name;
          obj['data'].last_name = this.basicInformationForm.value.last_name;
          this._ls.setItem('user',obj,true);
          this._ss.change();
          this.submitted = true;
          this._router.navigate([this._ls.getItem('user',true).menu[0].module_url]);
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  goToList(){
    this._router.navigate([this._ls.getItem('user',true).menu[0].module_url]);
  }

  onSubmit(): any {
    this.submitted = false;
    if (this.passwordForm.valid) {
      let pass = this.passwordForm.get('new_password').value;
      let confirmPass = this.passwordForm.get('confirm_password').value;
      if(pass != confirmPass){
        this._toast.show('warning','Password and Confirm Password must match');
        return false;
      }   
      var params={};
      params = this.passwordForm.value;
      this._cService.addProfile(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._router.navigate([this._ls.getItem('user',true).menu[0].module_url]);
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
 

  ifSubmit(): any {
    this.submitted = false;
    if (this.othersForm.valid) {
      var params={};
      params['type'] = this.othersForm.value.type.value;
      params['grade'] =this.othersForm.value.grade.value;
      params['school_name']=this.othersForm.value.school_name.value;
      this._cService.addProfile(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._router.navigate([this._ls.getItem('user',true).menu[0].module_url]);
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
   getProfileInfo(){
    this._cService.profileInfo().subscribe(res =>{
      if(res.status){
        this.profileInfo =res.data.profile_info[0];       
        this.basicInformationForm.setValue({
          first_name: this.profileInfo.first_name,
          last_name:this.profileInfo.last_name,
          phone_no: this.profileInfo.phone_no,
          email: this.profileInfo.email,
          role:this.profileInfo.role
        }); 
      }
    })
   }
   
   getotherInfo(){
    this._cService.profileInfo().subscribe(res =>{
      if(res.status){
        this.othersInfo =res.data.profile_info[0];
        this.othersForm.setValue({
          type:this.othersInfo.type,
          school_name:this.othersInfo.school_name,
          grade:this.othersInfo.grade
        }); 
      }
    })
   }

   conditionalValidation(){
    var userRole = this._ls.getItem('user',true).data.user_role_id;
    if(Number(userRole)==1 || Number(userRole)==2 || Number(userRole)==3) {
      this.hideothers=true;
    } else {
      this.hideothers=false;
    }
  }
}