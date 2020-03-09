import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FranchiseService } from 'src/app/services/franchise.service';
import { MasterService } from 'src/app/services/master.service';
import { SchoolService } from 'src/app/services/school.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-update-school',
  templateUrl: '../add-school/add-school.component.html',
  styleUrls: ['./update-school.component.scss']
})
export class UpdateSchoolComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Update School";
  schoolObj:any={};
  schoolsList:any=[];
  franchise:any=[];
  filter:any;
  state:string;
  city:string;
  updateid:any;
  schoolInfo:any;
  country:string;
  maxDate: Date;
  isUpdate:boolean=true;
  schoolForm:FormGroup;

  constructor(private _router: Router, private _toast: ToasterService,
              private schoolService: SchoolService, private _ar: ActivatedRoute,
              private franchiseService:FranchiseService,
              private masterService:MasterService) { 
  
    this.maxDate = new Date();
    
    var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      schoolService.getById({'id':id}).subscribe(res=>{
        if(res.status){
          this.schoolObj = res.data.data[0];
          console.log('schoolobj info',this.schoolObj);
          this.schoolForm.setValue({
            school_id: this.schoolObj.school_id,  
            name: this.schoolObj.name,
            address:this.schoolObj.address,
            code: this.schoolObj.code,
            contact_person: this.schoolObj.contact_person,
            phone: this.schoolObj.phone,
            email: this.schoolObj.email,
            franchise_id:this.schoolObj.franchise_id,
            state:this.schoolObj.state,
            city:this.schoolObj.city,
            pincode:this.schoolObj.pincode
          });          
        }
      });
    });
  }
    
  
  ngOnInit(): void {

    this. schoolForm = new FormGroup({
      school_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      contact_person: new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.minLength(10) ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      franchise_id: new FormControl('',[Validators.required]),
      address: new FormControl(''),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('')
     });
    this.getFranchiseDropdown();
    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
  }


  getFranchiseDropdown(){ // this function is for displaying the agency names in dropdown while creating schools
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

  submit(): any {
    this.submitted = false;
    if (this.schoolForm.valid) {
      var params={};
      params = this.schoolForm.value;
      params['franchise_id'] = this.schoolForm.value.franchise_id.value;
      params['state'] = this.schoolForm.value.state.value;
      params['city'] = this.schoolForm.value.city.value;
      this.schoolService.addSchool(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          // this._toast.show('success',res.message);
          this.goToList();
        }else{
          this._toast.show('error',JSON.parse(res.error));
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  goToList(){
    this._router.navigate(['schools_management']);
  }

  
}
