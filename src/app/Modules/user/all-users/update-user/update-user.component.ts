import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { MasterService } from 'src/app/services/master.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { HttpParams } from '@angular/common/http';

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
  isUpdate:boolean=true;

  formObj: any = {};
  pageTitle:string = "Update User";

  constructor(private _router: Router,
    private _toast: ToasterService,
    private _service: UserService,
    private _master: MasterService,
    private _ar: ActivatedRoute,
    private _ls: LocalStorageService) {
      var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      var param=new HttpParams().set('user_id',id+'')
      _service.getById(param).subscribe(res=>{
        if(res.status){
          this.formObj = res.data.data[0];
          console.log('this.formObj--', this.formObj);
          this.addUserForm.setValue({
            first_name: this.formObj.first_name,  
            last_name: this.formObj.last_name,  
            user_role_id: this.formObj.user_role_id,
            franchise_id: this.formObj.franchise_id,
            email: this.formObj.email,
            phone_no: this.formObj.phone_no,
            status: this.formObj.status, 
          });          
        }
      });
    });
  }

  ngOnInit(): void {

    this.getRolesList();
    this.getMasterList('status');
    this.getMasterList('franchise');
    this.addUserForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl(''),
      user_role_id: new FormControl('',[Validators.required]),
      franchise_id: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone_no: new FormControl('',[Validators.required , Validators.minLength(10), Validators.maxLength(10)]),
      status: new FormControl('',[Validators.required]), 
    });
  }
  getRolesList(){
    var params=new HttpParams().set("dropdown","true");
    this._service.getRolesList(params).subscribe(res=>{
      if(res.status){
        this.roles = res.data.user_roles;
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
        if(masterKey == 'status')
          this.status =  res.data.data;
      }
    });
  }
  cancel(){
    this._router.navigate(['users/all-users']);
  }
}
