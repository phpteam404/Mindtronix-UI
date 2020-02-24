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
        {label:'Select City', value:null},
        {label:'New York', value:null},
        {label:'Rome', value:null},
        {label:'London', value:null},
        {label:'Istanbul', value:null},
        {label:'Paris', value:null}
    ];
    this.franchise = [
        {label:'Select City', value:null},
        {label:'New York', value:null},
        {label:'Rome', value:null},
        {label:'London', value:null},
        {label:'Istanbul', value:null},
        {label:'Paris', value:null}
    ];
    this.cars = [
      {last_login:'20-02-2020', status:'Active', grade:'VII', school:'Academic Heights Public School - AHPS', name:'Grab Kit', email:'grabKit@mindtronics.com', phone:'7894564556', franchise:'Mindtronix Learning Centre',actions:''},
      {last_login:'21-02-2020', status:'Active', grade:'VII', school:'Accord School', name:'Tech Point', email:'tech_point@mindtronics.com', phone:'7418523654', franchise:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {last_login:'19-02-2020', status:'Inactive', grade:'IV', school:'Adarsha Vidyalaya High School', name:'Mindex', email:'mindex@mindtronics.com', phone:'9632587412', franchise:'Mindtronix Learning Centre-Kempapura',actions:''},
      {last_login:'20-02-2020', status:'Active', grade:'VIII', school:'Akshara High School', name:'Grade Power', email:'grade_power@mindtronics.com', phone:'6987452541', franchise:'Mindtronix Learning Centre Yelahanka',actions:''},
      {last_login:'21-02-2020', status:'Active', grade:'VII', school:'Balaji English School', name:'Tera Soft', email:'teraSoft@mindtronics.com', phone:'8965412547', franchise:'Mindtronix Learning Centre JP Nagar',actions:''},
      {last_login:'22-02-2020', status:'Inactive', grade:'IX', school:'BCM High School', name:'Brain Balance', email:'brain-blnc@mindtronics.com', phone:'7588965415', franchise:'Mindtronix Learning Centre Jaya Nagar',actions:''},
      {last_login:'21-02-2020', status:'Active', grade:'VIII', school:'Bharathi Vidyanikethan', name:'Learning Horizon', email:'lhorizon@mindtronics.com', phone:'9658745896', franchise:'Mindtronix Learning centre, BTM Layout',actions:''},
      {last_login:'20-02-2020', status:'Active', grade:'VII', school:'Bharatiya Vidya Bhavan', name:'Lesson Up', email:'lessonUp@mindtronics.com', phone:'9658745896', franchise:'Mindtronix Learning Centre, BEML Layout',actions:''},
      {last_login:'12-02-2020', status:'Active', grade:'V', school:'Bhashyam Public School', name:'Brain Gym', email:'gym-brain@mindtronics.com', phone:'8569745896', franchise:'Mindtronix Learning Centre Malleshwaram',actions:''},
      {last_login:'13-02-2020', status:'Inactive', grade:'VII', school:'Bhavan\'s S.V. Vidyalaya', name:'Robo Soft', email:'robosoft@mindtronics.com', phone:'7545896552', franchise:'Mindtronix Learning Centre E-City',actions:''},
      {last_login:'20-02-2020', status:'Active', grade:'VII', school:'Bhupal Junior College', name:'Simply Brilliant', email:'sbrilliant@mindtronics.com', phone:'9632568745', franchise:'Mindtronix Learning Centre, Banneraghatta',actions:''},
      {last_login:'11-02-2020', status:'Inactive', grade:'VIII', school:'Birla Open Minds International School', name:'Inquistive', email:'inquistive@mindtronics.com', phone:'7895874568', franchise:'Mindtronix Learning Centre Sarjapur',actions:''},
      {last_login:'20-02-2020', status:'Active', grade:'VII', school:'Brilliant High School', name:'People Tech', email:'people_tech@mindtronics.com', phone:'9658523645', franchise:'Donald',actions:''},
      {last_login:'23-02-2020', status:'Active', grade:'VII', school:'CAN Junior College', name:'Bulb', email:'bulb@mindtronics.com', phone:'7845258963', franchise:'Modi',actions:''},
      {last_login:'05-02-2020', status:'Active', grade:'VII', school:'Chaitanya Bharathi School', name:'Newton', email:'newton@mindtronics.com', phone:'8547896541', franchise:'Jack',actions:''},
      {last_login:'06-02-2020', status:'Active', grade:'VI', school:'Dr. KKR’s Gowtham (E.M.) High School', name:'Study Point', email:'spoint@mindtronics.com', phone:'7458963521', franchise:'Bill Gates',actions:''},
      {last_login:'05-02-2020', status:'Active', grade:'VII', school:'Edify School', name:'Robo Tech', email:'robo-tech@mindtronics.com', phone:'6985236545', franchise:'Obama',actions:''},
      {last_login:'20-02-2020', status:'Active', grade:'VII', school:'Narayana Concept School', name:'Tutor Pedia', email:'tpedia@mindtronics.com', phone:'8569874589', franchise:'Laura',actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Student Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'school', header: 'School' },
      { field: 'franchise', header: 'Franchise' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'last_login', header: 'Last Login' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }


  AddNewStudent(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
}
