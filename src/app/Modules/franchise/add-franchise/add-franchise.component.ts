import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import {SelectItem} from 'primeng/api';

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
  manager:any;
  title:any;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ///    
  cities1: SelectItem[];
  cities2: City[];
  selectedCities1: City[];
  selectedCities2: City[];
  ///

  fullObject:any={}

  constructor(private _router: Router, private _toast: ToasterService, private _formBuilder: FormBuilder) {     
    this.cities1 = [
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.manager = [
          {label:'Prasad', value:{id:1, name: 'prasad', code: 'PR'}},
          {label:'Swetha', value:{id:2, name: 'Swetha', code: 'SW'}},
          {label:'Parvathi', value:{id:3, name: 'parvathi', code: 'PRT'}},
          {label:'Sravani', value:{id:4, name: 'Sravani', code: 'SR'}},
          {label:'Naresh', value:{id:5, name: 'Naresh', code: 'NRS'}}
    ];
    this.status =[
          {label:'Active',value:{id:1,name:'Active'}},
          {label:'InActive',value:{id:2,name:'InActive'}}
    ];
    this.title =[
          {label:'Admin',value:{id:1,name:'Admin'}},
          {label:'Site Admin',value:{id:2,name:'Site Admin'}},
          {label:'Super Admin',value:{id:3,name:'Super Admin'}}
    ]
  }
  stepOneForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    manager: new FormControl('',[Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    website_address :new FormControl(''),
    landmark: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    pincode :new FormControl(''),
    country :new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    status :new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
  });

  stepTwoForm = new FormGroup({  
    contact_title :new FormControl('',[Validators.required]),
    contact_name:new FormControl('',[Validators.required]),
    contact_email: new FormControl('',[Validators.required]),
    contact_phone :new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });
  stepThreeForm = new FormGroup({  
    fee_structure :new FormControl('',[Validators.required]),
    offer_details :new FormControl(''),
    discount:new FormControl(''),
    discount_details :new FormControl(''),
    offer_type :new FormControl('')
  });

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.stepOneForm.controls; }
  get f2() { return this.stepTwoForm.controls; }
  get f3() { return this.stepThreeForm.controls; }

  stepOneFormSubmit(): any{
    this.submitted1 = false;
    if (this.stepOneForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted1 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
      return false;
    }
  }
  stepTwoFormSubmit(): any{
    this.submitted2 = false;
    if (this.stepTwoForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted2 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepThreeFormSubmit(): any{
    this.submitted3 = false;
    if (this.stepThreeForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted3 = true;
      this._router.navigate(['franchise']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['franchise']);
  }
}
