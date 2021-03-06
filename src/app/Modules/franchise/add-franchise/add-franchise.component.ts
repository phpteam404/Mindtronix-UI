import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import {SelectItem} from 'primeng/api';
import { MasterService } from 'src/app/services/master.service';
import { FeeService } from 'src/app/services/fee.service';
import { HttpParams } from '@angular/common/http';
import  dropdown  from 'src/app/jsons/dropdown.json';
import { FranchiseService } from 'src/app/services/franchise.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-add-franchise',
  templateUrl: './add-franchise.component.html',
  styleUrls: ['./add-franchise.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AddFranchiseComponent implements OnInit {
  status:any;
  title:any;
  FeeStructureList:any=[];
  contactsList:any=[];
  contactsListCols:any=[];
  FeeList:any=[];
  FeeStructureCols:any=[];

  submitted1 = null;
  submitted2 = null;
  submitted3 = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  structure:any;
  state:any=[];
  city:any=[];
  country:any=[];
  fullObject:any={};
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  constructor(private _router: Router,
              private _toast: ToasterService, 
              private _formBuilder: FormBuilder,
              private _feeService: FeeService,
              private _service: FranchiseService,
              private masterservices:MasterService,
              public translate: TranslateService
            ){    
    translate.setDefaultLang(environment.defaultLanguage);

    this.FeeStructureCols = [
      { field: 'name', header: 'Title' },
      { field: 'amount', header: 'Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      { field: 'tax', header: 'Tax (%)' },
      { field: 'action', header: 'Actions' }
    ];

    this.contactsListCols = [
      { field: 'contact_title_display', header: 'Contact Title' },
      { field: 'contact_name', header: 'Contact Name' },
      { field: 'contact_number', header: 'Contact Number' },
      { field: 'contact_email', header: 'Contact Email' },
      { field: 'actions', header: 'Actions' }
    ]
  }
  getFeeStructureDropdown(){
    var params = new HttpParams().set('status',1+'');
    this._feeService.getList(params).subscribe(res=>{
      if(res.status){
        this.FeeStructureList = res.data.data;
      }
    });
  }
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterservices.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'state')
          this.state =  res.data.data;
        if(masterKey == 'city')
          this.city =  res.data.data;
        if(masterKey =='country')
          this.country =res.data.data;
        if(masterKey =='contact_type')
          this.title =res.data.data;
        if(masterKey =='status'){
          this.status =res.data.data;
          this.stepOneForm.controls['status'].setValue(res.data.data[0]);
        }
      }
    });
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.stepOneForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
      website_address :new FormControl('',[Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
      landmark: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      pincode :new FormControl(''),
      country :new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      status :new FormControl('',[Validators.required]),
      address: new FormControl(''),
    });
    this.stepTwoForm = new FormGroup({  
      contact_title :new FormControl('',[Validators.required]),
      contact_name:new FormControl('',[Validators.required]),
      contact_email: new FormControl('',[Validators.required, Validators.email]),
      contact_number :new FormControl('',[Validators.required,Validators.minLength(10)]),
    });
    this.stepThreeForm = new FormGroup({  
      fee_structure :new FormControl('',[Validators.required])
    });
    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
    this.getMasterDropdown('status');
    this.getMasterDropdown('contact_type');
    this.getFeeStructureDropdown();
  }

  getCountry(){ return this.stepOneForm.value.country.value;}
  getState(){ return this.stepOneForm.value.state.value;}
  getCity(){ return this.stepOneForm.value.city.value;}
  getStatus(){ return this.stepOneForm.value.status.value;}

  getContactTitle(){ return this.stepTwoForm.value.contact_title.value; }
  getContactTitleLabel(){ return this.stepTwoForm.value.contact_title.label; }

  stepOneFormSubmit(): any{
    this.submitted1 = false;
    if (this.stepOneForm.valid) {
      this.fullObject['1'] = this.stepOneForm.value;
      this.fullObject['1'].country = this.getCountry();
      this.fullObject['1'].state = this.getState();
      this.fullObject['1'].city = this.getCity();
      this.fullObject['1'].status = this.getStatus();
      this.submitted1 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepTwoFormSubmit(): any{
    this.submitted2 = false;
    if (this.stepTwoForm.valid) {
      var obj={};
      obj['contact_title_display'] = this.getContactTitleLabel();
      obj['contact_title'] = this.getContactTitle();
      obj['contact_name'] = this.stepTwoForm.value.contact_name;
      obj['contact_number'] = this.stepTwoForm.value.contact_number;
      obj['contact_email'] = this.stepTwoForm.value.contact_email;
      this.contactsList.push(obj);
      this.stepTwoForm.reset();
      this.fullObject['2'] = this.contactsList;
      this.submitted2 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepThreeFormSubmit(): any{
    this.submitted3 = false;
    if (this.stepThreeForm.valid) {
      this.FeeList = this.stepThreeForm.value.fee_structure;
      console.log(this.FeeList);
      this.fullObject['3'] = this.FeeList;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['franchise']);
  }
  deleteContact(ind){
    var index: number = this.FeeList.indexOf(ind);
    if (index !== -1)
      this.contactsList.splice(index, 1);
    this.fullObject['2'] = this.contactsList;
  }
  deleteFee(ind){
    var index: number = this.FeeList.indexOf(ind);
    if (index !== -1)
      this.FeeList.splice(index, 1);
    this.fullObject['3'] = this.FeeList;
    this.stepThreeForm.controls.fee_structure.setValue(this.FeeList);
    this.getStructure();
  }
  overAllSave(){
    // if(this.stepOneForm.valid && this.stepTwoForm.valid && this.stepThreeForm.valid){
    if(true){
      if(this.fullObject['1']==undefined){
        this.submitted1 = false;
        this._toast.show('warning','Please enter Franchise details');
        return false;
      }
      if(this.fullObject['2']==undefined){
        this.submitted2 = false;
        this._toast.show('warning','Please add Franchise contact details');
        return false;
      }
      if(this.fullObject['3']==undefined){
        this.submitted3 = false;
        this._toast.show('warning','Please add Franchise fee details');
        return false;
      }
      var obj={};
      obj = this.fullObject['1'];
      obj['franchise_contacts']=[];
      obj['franchise_contacts'] =  this.fullObject['2'];
      var feeArr = [];
      this.fullObject['3'].forEach(item => { 
        feeArr.push(Number(item.fee_master_id));
      });
      obj['fee_master_id'] =  feeArr.toString();
      this._service.addUpdate(obj).subscribe(res=>{
        if(res.status){
          this.submitted3 = true;
          this.stepThreeForm.reset();
          this.goToList();
        }
      });
    }    
  }
  getStructure(){
    this.structure = this.stepThreeForm.value.fee_structure;
   }
}
