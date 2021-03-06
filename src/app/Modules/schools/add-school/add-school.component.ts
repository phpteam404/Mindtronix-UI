import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { MasterService } from 'src/app/services/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/utils/local-storage.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Create School";
  isUpdate:boolean = false;
  franchise:any=[];
  state:any=[];
  city:any=[];
  country:any=[];
  franchiseId:any;
  userRole:any;
  hideFranchise:boolean;
  franchiseRoles = ["1","6","7","8"];
  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _ls: LocalStorageService,
              private schoolService:SchoolService,
              private franchiseService:FranchiseService,
              public translate: TranslateService, 
              private masterService:MasterService) { 
    translate.setDefaultLang(environment.defaultLanguage);
  }
  schoolForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    contact_person: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.minLength(10) ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    franchise_id: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('')
  });

  ngOnInit(): void {
    this.getFranchiseDropdown();
    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
    this.conditionalValidation();
    this._ar.queryParams.subscribe(params => {
      if(params.franchise_id){
        this.franchiseId = atob(params.franchise_id);
      }
    });
  }

  getFranchiseDropdown(){
    this.franchiseService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
            this.franchise = res.data.data;
      }
    });
  }

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'state')
          this.state =  res.data.data;
        if(masterKey == 'city')
          this.city =  res.data.data;
        if(masterKey =='country')
          this.country =res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  
  getFranchise() { return this.schoolForm.value.franchise_id.value;}
  getState() { return this.schoolForm.value.state.value;}
  getCity() { return this.schoolForm.value.city.value;}

  submit(): any {
    this.submitted = false;
    if (this.schoolForm.valid) {
      var params={};
      params = this.schoolForm.value;
      params['franchise_id'] = this.getFranchise();
      params['state'] = this.getState();
      params['city'] = this.getCity();
      this.schoolService.addSchool(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          //this._toast.show('success',res.message);
          this._router.navigate(['schools_management']);
        }else{
          this._toast.show('error',JSON.parse(res.error));
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  goToList(){
    if(this.franchiseId)
      this._router.navigate(['schools_management'],{queryParams:{'franchise_id':btoa(this.franchiseId)}});
    else this._router.navigate(['schools_management']);
  }

  conditionalValidation(){
    this.userRole = this._ls.getItem('user',true).data.user_role_id;
    if(this.franchiseRoles.includes( this.userRole))
    {
      this.schoolForm.get('franchise_id').setValidators(Validators.required);
      this.hideFranchise=true;
    }
    else {
      this.schoolForm.get('franchise_id').clearValidators();
      this.hideFranchise=false;
    }
  }
}
