import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { SchoolService } from 'src/app/services/school.service';
import { HttpParams } from '@angular/common/http';
import { UserService} from 'src/app/services/user.service';
import { FeeService} from 'src/app/services/fee.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-student',
  templateUrl: '../add-student/add-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  isUpdate:boolean=true; 
  studentObj:any={};
  status:any;
  submitted = null;
  maxDate: Date;
  nationality:any;
  blood_group:any;
  mothertongue:any;
  feeTerm:any;
  relation:any;
  schools:any;
  grade:any;
  studentForm: FormGroup;
  constructor(private _router: Router,
              private _toast: ToasterService,
              private _ar: ActivatedRoute,
              private _mService:MasterService,
              private _service:UserService,
              private _sService:SchoolService,
              private _feeService:FeeService,
              public datepipe: DatePipe,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);

    this.maxDate = new Date();
    _ar.paramMap.subscribe(params => {
      var id = atob(params['params']['id?:school_id']);
      var param = new HttpParams().set('user_id', id);
      _service.getStudentById(param).subscribe(res => {
        if (res.status) {
          this.studentObj = res.data.data[0];
          console.log('studentobj info', this.studentObj);
          this.studentForm.setValue({
            user_id : this.studentObj.user_id,
            student_name : this.studentObj.student_name,
            email : this.studentObj.contact_email,
            place_of_birth: this.studentObj.place_of_birth,
            date_of_birth : new Date(this.studentObj.date_of_birth),
            grade: this.studentObj.grade,
            parent_name : this.studentObj.parent_name,
            occupation : this.studentObj.occupation,
            nationality : this.studentObj.nationality,
            mother_tongue : this.studentObj.mother_tongue,
            relation : this.studentObj.relation,
            blood_group: this.studentObj.blood_group,
            fee_structure: this.studentObj.fee_structure,
            school_id: this.studentObj.school_id,
            address : this.studentObj.address,
            mobile_phone1 : this.studentObj.mobile_phone,
            phone_no:this.studentObj.home_phone_no,
            mobile_phone2 : this.studentObj.mobile_phone2,
            status : this.studentObj.status,
            history_of_illness : this.studentObj.history_of_illness
          });
        }
      });
    });
  }

  ngOnInit(): void {
    this.getMasterDropdown('nationality');
    this.getMasterDropdown('mothertongue');
    this.getFeeStructureDropDown();
    this.getMasterDropdown('relation');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('blood_group');
    this.getMasterDropdown('status');
    this.getschoolsDropdown();
    this.studentForm = new FormGroup({
        user_id: new FormControl(''),
        student_name: new FormControl('', [Validators.required]),
        date_of_birth: new FormControl('', [Validators.required]),
        nationality: new FormControl('', [Validators.required]),
        place_of_birth: new FormControl(''),
        mother_tongue: new FormControl(''),
        address: new FormControl(''),
        parent_name: new FormControl('', [Validators.required]),
        fee_structure: new FormControl('', [Validators.required]),
        phone_no: new FormControl('',[Validators.minLength(10) ]),
        relation: new FormControl(''),
        email: new FormControl('',[Validators.required,Validators.email]),
        occupation: new FormControl(''),
        mobile_phone1: new FormControl('', [Validators.required,Validators.minLength(10) ]),
        mobile_phone2: new FormControl('',[Validators.minLength(10)]),
        school_id: new FormControl(''),
        grade: new FormControl(''),
        blood_group: new FormControl(''),
        history_of_illness: new FormControl(''),
        status: new FormControl('', [Validators.required])
    });
  }

  getMasterDropdown(masterKey): any {
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._mService.getMasterChilds(params).subscribe(res => {
      if(res.status){
        if(masterKey == 'nationality'){
          this.nationality =  res.data.data;
        }
        if(masterKey=='mothertongue')
           this.mothertongue =res.data.data;
        if(masterKey=='relation')
           this.relation=res.data.data;
        if(masterKey=='grade')
           this.grade = res.data.data;
        if(masterKey =='blood_group')
          this.blood_group =res.data.data;
        if(masterKey =='status')
          this.status =res.data.data;
      }
    });
  }

  getschoolsDropdown(){
    this._sService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
      }
    });
  }

  getFeeStructureDropDown(){
    var params = new HttpParams();
    this._feeService.getFeeDropDown(params).subscribe(res=>{
      if(res.status){
        this.feeTerm = res.data.data;
     }
    });
  }

  getNationality(){ return this.studentForm.value.nationality.value;}
  getMotherTongue(){ return this.studentForm.value.mother_tongue.value;}
  getFeeStructure(){ return this.studentForm.value.fee_structure.value;}
  getRelation(){ return this.studentForm.value.relation.value;}
  getSchool(){ return this.studentForm.value.school_id.value;}
  getGrade(){ return this.studentForm.value.grade.value;}
  getBloodGroup(){ return this.studentForm.value.blood_group.value;}
  getStatus(){ return this.studentForm.value.status.value;}

  submit(): any {
    this.submitted = false;
    console.log('student edit info',this.studentForm.value);
    if (this.studentForm.valid) {
    
      var params={};
      params = this.studentForm.value;
      params['user_role_id'] =4;
      params['nationality'] = this.getNationality();
      params['mother_tongue'] = this.getMotherTongue();
      params['fee_structure'] = this.getFeeStructure();
      params['relation'] = this.getRelation();
      params['school_id'] = this.getSchool();
      params['grade'] = this.getGrade();
      params['blood_group'] =this.getBloodGroup();
      params['status'] = this.getStatus();
      params['date_of_birth'] =this.datepipe.transform(this.studentForm.value.date_of_birth, 'yyyy/MM/dd');
      this._service.saveUser(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.goToList();
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['users/students']);
  }
}
