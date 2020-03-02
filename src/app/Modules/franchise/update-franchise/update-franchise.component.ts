import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import  dropdown  from 'src/app/jsons/dropdown.json';
import { HttpParams } from '@angular/common/http';
import { FranchiseService } from 'src/app/services/franchise.service';

@Component({
  selector: 'app-update-franchise',
  templateUrl: '../add-franchise/add-franchise.component.html',
  styleUrls: ['./update-franchise.component.scss']
})
export class UpdateFranchiseComponent implements OnInit {

  status:any;
  title:any;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;

  FeeStructureMaster:any=[];
  contactsList:any=[];
  contactsListCols:any=[];
  FeeList:any=[];
  FeeStructureCols:any=[];
  isUpdate:boolean = true;
  fullObject:any={}
  pageTitle:string = "Update Franchise";
  FeeStructureList :{name:string,id:string}[] =dropdown.fee_structure;

  constructor(private _router: Router, private _toast: ToasterService, private _service: FranchiseService,private _ar: ActivatedRoute) {     
    this.status =[
      {label:'Active',value:1},
      {label:'InActive',value:0}
    ]
    this.title =[
      {label:'Admin',value:{id:1,name:'Admin'}},
      {label:'Site Admin',value:{id:2,name:'Site Admin'}},
      {label:'Super Admin',value:{id:3,name:'Super Admin'}}
    ]

    this.contactsList = [
      {contact_name:'Tom Smith', contact_phone:'9789456556',contact_title:'Technical',actions:''},
      {contact_name:'Mike', contact_phone:'7774564556',contact_title:'Finance',actions:''},
      {contact_name:'Andrew', contact_phone:'7894555556',contact_title:'Accountant',actions:''},
      {contact_name:'Tulip', contact_phone:'7894444556',contact_title:'Finance',actions:''},
      {contact_name:'James', contact_phone:'7894563336',contact_title:'Franchise Admin',actions:''},
      
    ];
    this.contactsListCols = [
      { field: 'contact_title', header: 'Contact Title' },
      { field: 'contact_name', header: 'Contact Name' },
      { field: 'contact_phone', header: 'Contact Phone' },
      { field: 'actions', header: 'Actions' }
    ]
    this.FeeList = [
      {id:1,name:'1 (One Month)', amount:2500, term:'Monthly',discount:10,action:''},
      {id:2,name:'3 (Three Months)', amount:6000, term:'Quarterly',discount:15,action:''}
    ];
    this.FeeStructureCols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      { field: 'action', header: 'Actions' }

    ];
    var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      var param = new HttpParams().set('franchise_id', id+'');
      _service.getList(param).subscribe(res=>{
        if(res.status){
          this.fullObject = res.data.data[0];
          console.log('this.fullObject---', this.fullObject);
          this.stepOneForm.setValue({
            name: this.fullObject.franchise_name,
            code: this.fullObject.franchise_code,
            contact_person: this.fullObject.contact_person?this.fullObject.contact_person:'',
            phone: this.fullObject.phone?this.fullObject.phone:'',
            website_address: this.fullObject.website_address,
            landmark: this.fullObject.landmark?this.fullObject.landmark:'',
            email: this.fullObject.email,
            pincode: this.fullObject.pincode?this.fullObject.pincode:'',
            country: this.fullObject.country,
            state: this.fullObject.state,
            city: this.fullObject.city,
            address: this.fullObject.address,
            status: this.fullObject.status,
          }); 
        }
      });
    })
  } 

  ngOnInit(): void {
    
    this.stepOneForm = new FormGroup({
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
      status :new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
    });
  
    this.stepTwoForm = new FormGroup({  
      contact_title :new FormControl('',[Validators.required]),
      contact_name:new FormControl('',[Validators.required]),
      contact_email: new FormControl('',[Validators.required]),
      contact_phone :new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
    this.stepThreeForm = new FormGroup({  
      fee_structure :new FormControl('',[Validators.required])
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.stepOneForm.controls; }
  get f2() { return this.stepTwoForm.controls; }
  get f3() { return this.stepThreeForm.controls; }

  stepOneFormSubmit(): any{
    this.submitted1 = true;
    if (this.stepOneForm.valid) {
      this._toast.show('success','Successfully Added');
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
      return false;
    }
  }
  stepTwoFormSubmit(): any{
    this.submitted2 = true;
    if (this.stepTwoForm.valid) {
      this._toast.show('success','Successfully Added');
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  stepThreeFormSubmit(): any{
    this.submitted3 = true;
    if (this.stepThreeForm.valid) {
      this._toast.show('success','Successfully Added');
      this._router.navigate(['franchise']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['franchise']);
  }
}
