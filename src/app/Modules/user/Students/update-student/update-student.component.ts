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
  franchiseId: any;
  schoolId:any;
  selectedFeeData:any;
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
      console.log('*********', params['params']);
      var id = atob(params['params']['id?:school_id?:franchise_id']);
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
            date_of_birth : this.studentObj.date_of_birth ?new Date(this.studentObj.date_of_birth):'',
            grade: this.studentObj.grade,
            parent_name : this.studentObj.parent_name,
            occupation : this.studentObj.occupation,
            nationality : this.studentObj.nationality,
            mother_tongue : this.studentObj.mother_tongue,
            relation : this.studentObj.relation,
            blood_group: this.studentObj.blood_group,
            fee_structure: this.studentObj.fee_structure,
            school_id: this.studentObj.school_id,
            school_name: this.studentObj.school_name ? this.studentObj.school_name : '',
            lead_source:this.studentObj.lead_source ? this.studentObj.lead_source : '',
            address : this.studentObj.address,
            mobile_phone1 : this.studentObj.mobile_phone,
            phone_no:this.studentObj.home_phone_no,
            mobile_phone2 : this.studentObj.mobile_phone2,
            status : this.studentObj.status,
            history_of_illness : this.studentObj.history_of_illness
          });
          this.getSelectedFeeInfo();
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
        date_of_birth: new FormControl(''),
        nationality: new FormControl(''),
        place_of_birth: new FormControl(''),
        mother_tongue: new FormControl(''),
        address: new FormControl(''),
        parent_name: new FormControl(''),
        fee_structure: new FormControl(''),
        phone_no: new FormControl('',[Validators.minLength(10)]),
        relation: new FormControl(''),
        email: new FormControl('', [Validators.email]),
        occupation: new FormControl(''),
        mobile_phone1: new FormControl('', [Validators.minLength(10)]),
        mobile_phone2: new FormControl('',[Validators.minLength(10)]),
        school_id: new FormControl(''),
        school_name:new FormControl(''),
        lead_source:new FormControl('',[Validators.required]),
        grade: new FormControl(''),
        blood_group: new FormControl(''),
        history_of_illness: new FormControl(''),
        status: new FormControl('', [Validators.required])
    });
    this._ar.queryParams.subscribe(params => {
      if(params.franchise_id){
        this.franchiseId = atob(params.franchise_id);
      }
      if(params.school_id){
        this.schoolId = atob(params.school_id);
      }
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

  getNationality(){
    if(this.studentForm.value.nationality)
      return this.studentForm.value.nationality.value;
    else return null;
  }
  getMotherTongue()
  { 
    if(this.studentForm.value.mother_tongue)
       return this.studentForm.value.mother_tongue.value;
    else return null;
  }
  getFeeStructure()
  { 
     if(this.studentForm.value.fee_structure)
        return this.studentForm.value.fee_structure.value;
     else return null;
  }
  getRelation()
  { 
    if(this.studentForm.value.relation)
      return this.studentForm.value.relation.value;
    else return null;
  }
  getSchool() 
  { 
    if(this.studentForm.value.school_id)
      return this.studentForm.value.school_id.value;
    else return null;
  }
  getGrade()
  { 
    if(this.studentForm.value.grade)
      return this.studentForm.value.grade.value;
    else return null;
  }
  getBloodGroup()
  { 
    if(this.studentForm.value.blood_group)
       return this.studentForm.value.blood_group.value;
    else return null;
  }
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
    // this._router.navigate(['users/students']);
    if(this.schoolId && this.franchiseId==undefined)
      this._router.navigate(['users/students'],{queryParams:{'school_id':btoa(this.schoolId)}});
    else if(this.schoolId==undefined && this.franchiseId)
      this._router.navigate(['users/students'],{queryParams:{'franchise_id':btoa(this.franchiseId)}});
    else if(this.schoolId && this.franchiseId)
      this._router.navigate(['users/students'],{queryParams:{'school_id':btoa(this.schoolId),'franchise_id':btoa(this.franchiseId)}});
    else
      this._router.navigate(['users/students']);
  }
  getSelectedFeeInfo(){
    this.selectedFeeData = this.studentForm.value.fee_structure;
  }
}
