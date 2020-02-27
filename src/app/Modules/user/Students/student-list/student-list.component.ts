import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  cities: any;
  cars: any;
  cols:any;
  schools:Filter[];
  selectedSchool:Filter[];
  franchise:Filter[];
  selectedFranchise:Filter[];
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.schools = [
        {label: 'Select School',value:null},
        {label:'Academic Heights Public School - AHPS', value:'Academic Heights Public School - AHPS'},
        {label:'Accord School', value:'Accord School'},
        {label:'Adarsha Vidyalaya High School', value:'Adarsha Vidyalaya High School'},
        {label:'BCM High School', value:'BCM High School'},
        {label:'Bharathi Vidyanikethan', value:'Bharathi Vidyanikethan'},
        {label:'Narayana Concept School', value:'Narayana Concept School'},
        {label:'Bhashyam Public School', value:'Bhashyam Public School'},
    ];
    
    
    this.cols = [
      { field: 'name', header: 'Student Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'school', header: 'School' },
      { field: 'franchise', header: 'Franchise' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'last_login', header: 'Last Login' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
    this.getStudentsList();
    this.getFranchiseList();
  }
  getFranchiseList(){
    this.franchise = [
      {label: 'Select Franchise',value:null},
      {label:'Mindtronix Learning Centre', value:'Mindtronix Learning Centre'},
      {label:'Mindtronix Learning Centre Vidyaranyarapura', value:'Mindtronix Learning Centre Vidyaranyarapura'},
      {label:'Mindtronix Learning Centre-Kempapura', value:'Mindtronix Learning Centre-Kempapura'},
      {label:'Mindtronix Learning Centre Yelahanka', value:'Mindtronix Learning Centre Yelahanka'},
      {label:'Mindtronix Learning Centre JP Nagar', value:'Mindtronix Learning Centre JP Nagar'}
    ];
  }
  getStudentsList(){
    this.cars = [
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
  }
  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }


  AddNewStudent(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }

  onChange(event){
    this.getStudentsList();
    console.log('***', event.value.value);
    if(event.value !=null){
      console.log('list ---', this.cars.filter(t=>t.school == event.value.value).length);
      if(this.cars.filter(t=>t.school == event.value.value).length>0)
        this.cars = this.cars.filter(t=>t.school == event.value.value);
    }
    else this.getStudentsList();
  }
  onChange2(event){
    this.getStudentsList();
    // this.getStudentsList();
    console.log('***', event.value.value);
    if(event.value !=null){
      console.log('list ---', this.cars.filter(t=>t.franchise == event.value.value).length);
      if(this.cars.filter(t=>t.franchise == event.value.value).length>0)
        this.cars = this.cars.filter(t=>t.franchise == event.value.value);
    }
    else this.getStudentsList();
  }
  EditStudent(data:any){
    this.router.navigate(['update/'+data.name+'/'+btoa(data.id)],{ relativeTo: this._route});
  }
  viewStudent(data:any){
    this.router.navigate(['view/'+data.name+'/'+btoa(data.id)],{ relativeTo: this._route});
  }
}
