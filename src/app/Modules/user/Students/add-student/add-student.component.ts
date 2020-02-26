import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import  dropdown  from 'src/app/jsons/dropdown.json';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  cities:any;
  status:any;
  submitted = null;
  maxDate: Date;

  NationalityList:{name:string,id:string}[] = dropdown.nationality;
  BloodGroupList :{name:string,id:string}[] =dropdown.blood_group;
  MotherTongueList :{name:string,id:string}[] =dropdown.mother_tongue;
  FeeStructureList :{name:string,id:string}[] =dropdown.fee_structure;
  RelationList:{name:string,id:string}[]=dropdown.relation;
  ClassesList :{name:string,id:string}[]=dropdown.classes;
  pageTitle = "Create Student";
  constructor(private _router: Router, private _toast: ToasterService) {     
    console.log('AddStudentComponent---' );
    this.status =[
          {label:'Active',value:'active'},
          {label:'InActive',value:'Inactive'}
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
  }
  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
    password: new FormControl('',[ Validators.required,
                                  //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    cpassword: new FormControl('',[ Validators.required,
                                    // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    place_of_birth: new FormControl(''),
    mother_tongue: new FormControl(''),
    address: new FormControl(''),
    parent_name: new FormControl('', [Validators.required]),
    fee_structure: new FormControl('', [Validators.required]),
    phone_no: new FormControl(''),
    relation: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
    occupation: new FormControl(''),
    mobile_phone1: new FormControl(''),
    mobile_phone2: new FormControl(''),
    school_id: new FormControl(''),
    grade: new FormControl(''),
    agency_id: new FormControl(''),
    languages: new FormControl(''),
    home_language: new FormControl(''),
    blood_group: new FormControl(''),
    history_of_illness: new FormControl(''),
    status: new FormControl({label:'Active',value:'active'}, [Validators.required])
  });

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
