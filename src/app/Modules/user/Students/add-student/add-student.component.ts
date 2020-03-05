import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { HttpParams } from '@angular/common/http';
import { SchoolService } from 'src/app/services/school.service';
import { UserService} from 'src/app/services/user.service';
import { FeeService} from 'src/app/services/fee.service';
import { DatePipe } from '@angular/common';
//import  dropdown  from 'src/app/jsons/dropdown.json';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  status:any;
  submitted = null;
  maxDate: Date;
  nationality:any;
  mothertongue:any;
  relation:any;
  feeTerm:any;
  grade:any;
  blood_group:any;
  schools:any;
  isUpdate:boolean=false;
  pageTitle = "Create Student";

  constructor(private _router: Router, private _toast: ToasterService,
              private masterService:MasterService,
              private schoolService:SchoolService,
              private userService:UserService,
              private feeService:FeeService,
              public datepipe: DatePipe) {     
    console.log('AddStudentComponent---' );
    this.maxDate = new Date();
    console.log('this.status--', this.status);    
  }
  studentForm = new FormGroup({
    student_name: new FormControl('', [Validators.required]),
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
    mobile_phone1: new FormControl('', [Validators.required]),
    mobile_phone2: new FormControl(''),
    school_id: new FormControl('',[Validators.required]),
    grade: new FormControl(''),
    blood_group: new FormControl(''),
    history_of_illness: new FormControl(''),
    status: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.getMasterDropdown('status');
    this.getMasterDropdown('nationality');
    this.getMasterDropdown('mothertongue');
    this.getMasterDropdown('relation');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('blood_group');
    this.getschoolsDropdown();
    this.getFeeStructureDropDown();
  }

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'status'){
          this.status =  res.data.data;
          this.studentForm.controls['status'].setValue(res.data.data[0]);
        }
        if(masterKey == 'nationality')
           this.nationality =  res.data.data;
        if(masterKey=='mothertongue')
           this.mothertongue =res.data.data;
        if(masterKey=='relation')
           this.relation=res.data.data;
        if(masterKey=='grade')
           this.grade = res.data.data;
        if(masterKey =='blood_group')
          this.blood_group =res.data.data;
        }else{
        this._toast.show('error',res.error);
      }
    });
  }

  getschoolsDropdown(){
    this.schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
      }
    });
  }
  getFeeStructureDropDown(){
    this.feeService.getFeeDropDown({}).subscribe(res=>{
      if(res.status){
        this.feeTerm = res.data.data;
      }
    });
  }

  submit(): any{
    this.submitted = false;
    if (this.studentForm.valid) {
      console.log('stdent info',this.studentForm.value);
      let pass = this.studentForm.get('password').value;
      let confirmPass = this.studentForm.get('cpassword').value;    
      if(pass === confirmPass){
          var params={};
          params =this.studentForm.value;
          params['user_role_id'] =4;
          params['nationality'] =this.studentForm.value.nationality.value;
          params['mother_tongue'] =this.studentForm.value.mother_tongue.value;
          params['fee_structure'] =this.studentForm.value.fee_structure.value;
          params['relation'] =this.studentForm.value.relation.value;
          params['school_id'] =this.studentForm.value.school_id.value;
          params['grade'] = this.studentForm.value.grade.value;
          params['blood_group'] =this.studentForm.value.blood_group.value;
          params['status'] =this.studentForm.value.status.value;
          params['date_of_birth'] =this.datepipe.transform(this.studentForm.value.date_of_birth, 'yyyy/MM/dd');
          this.userService.saveUser(params).subscribe(res => {
            if (res.status) {
              this.submitted = true;
              this.goToList();
            }else{
              this._toast.show('error',JSON.parse(res.error));
            }
          });
      }else{
        this._toast.show('warning','Password and Confirm Password must match');
        return false;
      }
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['users/students']);
  }

}
