import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import {SelectItem} from 'primeng/api';
import { MasterService } from 'src/app/services/master.service';
import { HttpParams } from '@angular/common/http';
import  dropdown  from 'src/app/jsons/dropdown.json';

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
  FeeStructureMaster:any=[];
  contactsList:any=[];
  contactsListCols:any=[];
  FeeList:any=[];
  FeeStructureCols:any=[];

  submitted1 = null;
  submitted2 = null;
  submitted3 = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ///    
  cities1: SelectItem[];
  cities2: City[];
  selectedCities1: City[];
  selectedCities2: City[];
  ///
  isUpdate:boolean;
  
  state:any=[];
  city:any=[];
  country:any=[];
  fullObject:any={};
  pageTitle:string = "Create Franchise";

  constructor(private _router: Router, private _toast: ToasterService, 
              private _formBuilder: FormBuilder,
              private masterservices:MasterService) {     
    this.isUpdate=false;
    this.cities1 = [
      {label:'New York', value:12},
      {label:'Rome', value:13},
      {label:'London', value:14},
      {label:'Istanbul', value:15},
      {label:'Paris', value:16}
    ];
    this.FeeStructureMaster = [
      {id:1,name:'1 (One Month)', amount:2500, term:'Monthly',discount:10,action:''},
      {id:2,name:'3 (Three Months)', amount:6000, term:'Quarterly',discount:15,action:''},
      {id:3,name:'6 (Six Months)', amount:11000, term:'Half Yearly',discount:20,action:''},
      {id:4,name:'12 (Twelve Months)', amount:20500, term:'Yearly',discount:25,action:''}
    ];
    this.FeeStructureCols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      { field: 'action', header: 'Actions' }

    ];
    this.status =[
          {label:'Active',value:1},
          {label:'InActive',value:0}
    ];
    this.title =[
          {label:'Franchise Admin',value:'Franchise Admin'},
          {label:'Accountant',value:'Accountant'},
          {label:'Finance',value:'Finance'},
          {label:'Technical',value:'Technical'}
    ];

    this.contactsList = [
      {contact_name:'Tom Smith', contact_phone:'9789456556',contact_title:'Technical',contact_email:'mindtronixsrp@mindtronics.com',actions:''},
      {contact_name:'Mike', contact_phone:'7774564556',contact_title:'Finance',contact_email:'mindtronixsrp@mindtronics.com',actions:''},
      {contact_name:'Andrew', contact_phone:'7894555556',contact_title:'Accountant',contact_email:'mindtronixsrp@mindtronics.com',actions:''},
      {contact_name:'Tulip', contact_phone:'7894444556',contact_title:'Finance',contact_email:'mindtronixsrp@mindtronics.com',actions:''},
      {contact_name:'James', contact_phone:'7894563336',contact_title:'Franchise Admin',contact_email:'mindtronixsrp@mindtronics.com',actions:''},
      
    ];
    this.contactsListCols = [
      { field: 'contact_title', header: 'Contact Title' },
      { field: 'contact_name', header: 'Contact Name' },
      { field: 'contact_phone', header: 'Contact Number' },
      { field: 'contact_email', header: 'Contact Email' },
      { field: 'actions', header: 'Actions' }
    ]
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
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
   
  
  stepOneForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    contact_person: new FormControl('',[Validators.required]),
    phone: new FormControl('', [Validators.required]),
    website_address :new FormControl(''),
    landmark: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    pincode :new FormControl(''),
    country :new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    status :new FormControl({label:'Active',value:1},[Validators.required]),
    address: new FormControl('',[Validators.required]),
  });

    stepTwoForm = new FormGroup({  
    contact_title :new FormControl('',[Validators.required]),
    contact_name:new FormControl('',[Validators.required]),
    contact_email: new FormControl('',[Validators.required, Validators.email]),
    contact_phone :new FormControl('',[Validators.required]),
    });
    stepThreeForm = new FormGroup({  
      fee_structure :new FormControl('',[Validators.required])
    });

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
  }
  // convenience getter for easy access to form fields
  get f() { return this.stepOneForm.controls; }
  get f2() { return this.stepTwoForm.controls; }
  get f3() { return this.stepThreeForm.controls; }

  stepOneFormSubmit(): any{
    console.log('this.stepOneForm---', this.stepOneForm.value);
    this.submitted1 = false;
    if (this.stepOneForm.valid) {      
      this._toast.show('success','Successfully Added');
      this.submitted1 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepTwoFormSubmit(): any{
    console.log('this.stepTwoForm---', this.stepTwoForm.value);

    this.submitted2 = false;
    if (this.stepTwoForm.valid) {
      var obj={};
      obj['contact_title'] = this.stepTwoForm.value.contact_title.value;
      obj['contact_name'] = this.stepTwoForm.value.contact_name;
      obj['contact_phone'] = this.stepTwoForm.value.contact_phone;
      this.contactsList.push(obj);
      this.stepTwoForm.reset();
      console.log('this.contactsList--', this.contactsList);
      this._toast.show('success','Successfully Added');
      this.submitted2 = true;
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepThreeFormSubmit(): any{
    console.log('this.stepThreeForm---', this.stepThreeForm.value);

    this.submitted3 = false;
    if (this.stepThreeForm.valid) {
      this.FeeStructureMaster.forEach(item => { 
        // console.log('item---', item);
        this.stepThreeForm.value.fee_structure.forEach(fran => { 
          if(item.id == fran['id']){
            this.FeeList.push(item);
          }
        });
      });
      
      this._toast.show('success','Successfully Added');
      this.submitted3 = true;
      this.stepThreeForm.reset();
      //this._router.navigate(['franchise']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['franchise']);
  }
  deleteContact(ind){
    this.contactsList.pop(ind);
  }
  deleteFee(ind){
    this.FeeList.pop(ind);
  }
}
