import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import  dropdown  from 'src/app/jsons/dropdown.json';

@Component({
  selector: 'app-update-student',
  templateUrl: '../add-student/add-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

 
  cities:any;
  status:any;
  submitted = null;
  maxDate: Date;
  fullObject:any={}
  list:any;
  NationalityList:{name:string,id:string}[] = dropdown.nationality;
  BloodGroupList :{name:string,id:string}[] =dropdown.blood_group;
  MotherTongueList :{name:string,id:string}[] =dropdown.mother_tongue;
  FeeStructureList :{name:string,id:string}[] =dropdown.fee_structure;
  RelationList:{name:string,id:string}[]=dropdown.relation;
  ClassesList :{name:string,id:string}[]=dropdown.classes;
  studentForm: FormGroup;
  pageTitle = "Update Student";
  constructor(private _router: Router, private _toast: ToasterService, private _ar: ActivatedRoute) {     
    console.log('AddStudentComponent---' );
    this.status =[
          {label:'Active',value:'active'},
          {label:'InActive',value:'Inactive'}
    ];
    this.list = [
      {id:1,last_login:'20-02-2020', status:'Active', grade:'VII', school:'Academic Heights Public School - AHPS', name:'Grab Kit', email:'grabKit@mindtronics.com', phone:'7894564556', franchise:'Mindtronix Learning Centre',actions:''},
      {id:2,last_login:'21-02-2020', status:'Active', grade:'VII', school:'Accord School', name:'Tech Point', email:'tech_point@mindtronics.com', phone:'7418523654', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:3,last_login:'19-02-2020', status:'Inactive', grade:'IV', school:'Adarsha Vidyalaya High School', name:'Mindex', email:'mindex@mindtronics.com', phone:'9632587412', franchise:'Mindtronix Learning Centre-Kempapura',actions:''},
      {id:4,last_login:'20-02-2020', status:'Active', grade:'VIII', school:'Akshara High School', name:'Grade Power', email:'grade_power@mindtronics.com', phone:'6987452541', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:5,last_login:'21-02-2020', status:'Active', grade:'VII', school:'Balaji English School', name:'Tera Soft', email:'teraSoft@mindtronics.com', phone:'8965412547', franchise:'Mindtronix Learning Centre JP Nagar',actions:''},
      {id:6,last_login:'22-02-2020', status:'Inactive', grade:'IX', school:'BCM High School', name:'Brain Balance', email:'brain-blnc@mindtronics.com', phone:'7588965415', franchise:'Mindtronix Learning Centre',actions:''},
      {id:7,last_login:'21-02-2020', status:'Active', grade:'VIII', school:'Bharathi Vidyanikethan', name:'Learning Horizon', email:'lhorizon@mindtronics.com', phone:'9658745896', franchise:'Mindtronix Learning Centre',actions:''},
      {id:8,last_login:'20-02-2020', status:'Active', grade:'VII', school:'Bharatiya Vidya Bhavan', name:'Lesson Up', email:'lessonUp@mindtronics.com', phone:'9658745896', franchise:'Mindtronix Learning Centre',actions:''},
      {id:9,last_login:'12-02-2020', status:'Active', grade:'V', school:'Bhashyam Public School', name:'Brain Gym', email:'gym-brain@mindtronics.com', phone:'8569745896', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:10,last_login:'13-02-2020', status:'Inactive', grade:'VII', school:'Bhavan\'s S.V. Vidyalaya', name:'Robo Soft', email:'robosoft@mindtronics.com', phone:'7545896552', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:11,last_login:'20-02-2020', status:'Active', grade:'VII', school:'Bhupal Junior College', name:'Simply Brilliant', email:'sbrilliant@mindtronics.com', phone:'9632568745', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:12,last_login:'11-02-2020', status:'Inactive', grade:'VIII', school:'Birla Open Minds International School', name:'Inquistive', email:'inquistive@mindtronics.com', phone:'7895874568', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:13,last_login:'20-02-2020', status:'Active', grade:'VII', school:'Narayana Concept School', name:'People Tech', email:'people_tech@mindtronics.com', phone:'9658523645', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:14,last_login:'23-02-2020', status:'Active', grade:'VII', school:'Narayana Concept School', name:'Bulb', email:'bulb@mindtronics.com', phone:'7845258963', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:15,last_login:'05-02-2020', status:'Active', grade:'VII', school:'Chaitanya Bharathi School', name:'Newton', email:'newton@mindtronics.com', phone:'8547896541', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:16,last_login:'06-02-2020', status:'Active', grade:'VI', school:'Bhashyam Public School', name:'Study Point', email:'spoint@mindtronics.com', phone:'7458963521', franchise:'Mindtronix Learning Centre-Kempapura',actions:''},
      {id:17,last_login:'05-02-2020', status:'Active', grade:'VII', school:'Bhashyam Public School', name:'Robo Tech', email:'robo-tech@mindtronics.com', phone:'6985236545', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:18,last_login:'20-02-2020', status:'Active', grade:'VII', school:'Narayana Concept School', name:'Tutor Pedia', email:'tpedia@mindtronics.com', phone:'8569874589', franchise:'Mindtronix Learning Centre-Kempapura',actions:''}
    ];
    this.cities = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.maxDate = new Date();
    var id;
    this._ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      console.log('params===>>>', id);
      this.fullObject = this.list.filter(t=>t.id == id)[0];
      console.log('obj===>>>', this.fullObject);
    });
    this.studentForm = new FormGroup({
      name: new FormControl(this.fullObject.name, [Validators.required]),
      date_of_birth: new FormControl(this.fullObject.date_of_birth, [Validators.required]),
      nationality: new FormControl(this.fullObject.nationality, [Validators.required]),
      password: new FormControl(this.fullObject.password,[ Validators.required,
                                    //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      cpassword: new FormControl(this.fullObject.cpassword,[ Validators.required,
                                      // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      place_of_birth: new FormControl(this.fullObject.place_of_birth),
      mother_tongue: new FormControl(this.fullObject.mother_tongue),
      address: new FormControl(this.fullObject.address),
      parent_name: new FormControl(this.fullObject._toast, [Validators.required]),
      fee_structure: new FormControl(this.fullObject.fee_structure, [Validators.required]),
      phone_no: new FormControl(this.fullObject.phone_no),
      relation: new FormControl(this.fullObject.relation),
      email: new FormControl(this.fullObject.email,[Validators.required,Validators.email]),
      occupation: new FormControl(this.fullObject.occupation),
      mobile_phone1: new FormControl(this.fullObject. mobile_phone1),
      mobile_phone2: new FormControl(this.fullObject. mobile_phone2),
      school_id: new FormControl(this.fullObject.school_id),
      grade: new FormControl(this.fullObject.grade),
      agency_id: new FormControl(this.fullObject.agency_id),
      languages: new FormControl(this.fullObject.languages),
      home_language: new FormControl(this.fullObject.home_language),
      blood_group: new FormControl(this.fullObject.blood_group),
      history_of_illness: new FormControl(this.fullObject.history_of_illness),
      status: new FormControl({label:'Active',value:'active'}, [Validators.required])
    });
  }
 

  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get f() { return this.studentForm.controls; }

  submit(): any{
    this.submitted = false;
    if (this.studentForm.valid) {
      
      let pass = this.studentForm.get('password').value;
      let confirmPass = this.studentForm.get('cpassword').value;    
      if(pass === confirmPass){
      }else{
        this._toast.show('warning','Password and Confirm Password must match');
        return false;
      }  
      this.submitted = true;
      this._toast.show('success','Successfully Added');
      this._router.navigate(['users/students']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['users/students']);
  }


}
