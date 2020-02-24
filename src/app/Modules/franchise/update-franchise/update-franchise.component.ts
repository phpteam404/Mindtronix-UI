import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-update-franchise',
  templateUrl: '../add-franchise/add-franchise.component.html',
  styleUrls: ['./update-franchise.component.scss']
})
export class UpdateFranchiseComponent implements OnInit {

  status:any;
  title:any;
  list:any;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;

  fullObject:any={}
  pageTitle:string = "Update Franchise";

  constructor(private _router: Router, private _toast: ToasterService, private _formBuilder: FormBuilder,private _ar: ActivatedRoute) {     
    this.status =[
      {label:'Active',value:{id:1,name:'Active'}},
      {label:'InActive',value:{id:2,name:'InActive'}}
    ]
    this.title =[
      {label:'Admin',value:{id:1,name:'Admin'}},
      {label:'Site Admin',value:{id:2,name:'Site Admin'}},
      {label:'Super Admin',value:{id:3,name:'Super Admin'}}
    ]
    this.list = [
      {id:1,franchise_name:'Mindtronix Learning Centre', email:'mindtronixlc@mindtronics.com', contact_number:'7997666616', 
        city:'Bengaluru',created_on:'02-12-2019',status:'Active',actions:''},
      {id:2,franchise_name:'Mindtronix Learning Centre Vidyaranyarapura', email:'mindtronixlcvdp@mindtronics.com', contact_number:'076187 11378', 
        city:'Bengaluru',created_on:'02-11-2019',status:'Inactive',actions:''},
      {id:3,franchise_name:'Mindtronix Learning Centre-Kempapura', email:'mindtronixkmp@mindtronics.com', contact_number:'9876512345', 
        city:'Bengaluru',created_on:'02-12-2018',status:'Active',actions:''},
      {id:4,franchise_name:'Mindtronix Learning Centre Yelahanka', email:'mindtronixyel@mindtronics.com', contact_number:'9867538952', 
        city:'Bengaluru',created_on:'20-10-2019',status:'Active',actions:''},
      {id:5,franchise_name:'Mindtronix Learning Centre JP Nagar', email:'mindtronixjp@mindtronics.com', contact_number:'07207676333', 
        city:'Bengaluru',created_on:'26-08-2019',status:'Inactive',actions:''},
      {id:6,franchise_name:'Mindtronix Learning Centre Jaya Nagar', email:'mindtronixjy@mindtronics.com', contact_number:'9010208050', 
        city:'Bengaluru',created_on:'25-06-2019',status:'Inactive',actions:''},
      {id:7,franchise_name:'Mindtronix Learning centre, BTM Layout', email:'mindtronixbtm@mindtronics.com', contact_number:'9870564328', 
        city:'Bengaluru',created_on:'20-07-2019',status:'Active',actions:''},
      {id:8,franchise_name:'Mindtronix Learning Centre, BEML Layout', email:'mindtronixbeml@mindtronics.com', contact_number:'8185884731', 
        city:'Bengaluru',created_on:'11-03-2018',status:'Active',actions:''},
      {id:9,franchise_name:'Mindtronix Learning Centre Malleshwaram', email:'mindtronixmaleswaram@mindtronics.com', contact_number:'07997666623', 
        city:'Bengaluru',created_on:'10-03-2019',status:'Active',actions:''},
      {id:10,franchise_name:'Mindtronix Learning Centre E-City', email:'mindtronixecity@mindtronics.com', contact_number:'9676526363', 
        city:'Bengaluru',created_on:'05-08-2019',status:'Inactive',actions:''},
      {id:11,franchise_name:'Mindtronix Learning Centre, Banneraghatta', email:'mindtronixbng@mindtronics.com', contact_number:'9542794144', 
        city:'Bengaluru',created_on:'13-02-2020',status:'Active',actions:''},
      {id:12,franchise_name:'Mindtronix Learning Centre Sarjapur', email:'mindtronixsrp@mindtronics.com', contact_number:'9394791766', 
        city:'Bengaluru',created_on:'11-03-2018',status:'Inactive',actions:''}
    ];
  } 

  ngOnInit(): void {
    var id;
    this._ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      console.log('params===>>>', id);
      this.fullObject = this.list.filter(t=>t.id == id)[0];
      console.log('obj===>>>', this.fullObject);
    });
    this.stepOneForm = new FormGroup({
      name: new FormControl(this.fullObject.franchise_name, [Validators.required]),
      code: new FormControl('', [Validators.required]),
      contact_person: new FormControl(this.fullObject.contact_person,[Validators.required]),
      phone: new FormControl(this.fullObject.contact_number, [Validators.required]),
      website_address :new FormControl(''),
      landmark: new FormControl('Charminar'),
      email: new FormControl(this.fullObject.email, [Validators.required, Validators.email]),
      pincode :new FormControl('500033'),
      country :new FormControl('India',[Validators.required]),
      state:new FormControl('Telangana',[Validators.required]),
      city:new FormControl(this.fullObject.city,[Validators.required]),
      status :new FormControl({label:'Active',value:{id:1,name:'Active'}},[Validators.required]),
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
