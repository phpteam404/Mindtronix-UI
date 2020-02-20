import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  cities: any;
  cars: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Grab Kit', email:'grabKit@mindtronics.com', phone:'7894564556', manager:'Mike',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Tech Point', email:'tech_point@mindtronics.com', phone:'7418523654', manager:'Peter',actions:''},
      {status:'Inactive', grade:'IV', city:'Hyderabad', name:'Mindex', email:'mindex@mindtronics.com', phone:'9632587412', manager:'Jenny',actions:''},
      {status:'Active', grade:'VIII', city:'Tirupathi', name:'Grade Power', email:'grade_power@mindtronics.com', phone:'6987452541', manager:'Lisa',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Tera Soft', email:'teraSoft@mindtronics.com', phone:'8965412547', manager:'John II',actions:''},
      {status:'Inactive', grade:'IX', city:'Banglore', name:'Brain Balance', email:'brain-blnc@mindtronics.com', phone:'7588965415', manager:'John',actions:''},
      {status:'Active', grade:'VIII', city:'Tirupathi', name:'Learning Horizon', email:'lhorizon@mindtronics.com', phone:'9658745896', manager:'Peter',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Lesson Up', email:'lessonUp@mindtronics.com', phone:'9658745896', manager:'Karen',actions:''},
      {status:'Active', grade:'V', city:'Hyderabad', name:'Brain Gym', email:'gym-brain@mindtronics.com', phone:'8569745896', manager:'Dominique',actions:''},
      {status:'Inactive', grade:'VII', city:'Tirupathi', name:'Robo Soft', email:'robosoft@mindtronics.com', phone:'7545896552', manager:'Christian',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Simply Brilliant', email:'sbrilliant@mindtronics.com', phone:'9632568745', manager:'Jimmy',actions:''},
      {status:'Inactive', grade:'VIII', city:'Tirupathi', name:'Inquistive', email:'inquistive@mindtronics.com', phone:'7895874568', manager:'Trump',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'People Tech', email:'people_tech@mindtronics.com', phone:'9658523645', manager:'Donald',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Bulb', email:'bulb@mindtronics.com', phone:'7845258963', manager:'Modi',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Newton', email:'newton@mindtronics.com', phone:'8547896541', manager:'Jack',actions:''},
      {status:'Active', grade:'VI', city:'Tirupathi', name:'Study Point', email:'spoint@mindtronics.com', phone:'7458963521', manager:'Bill Gates',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Robo Tech', email:'robo-tech@mindtronics.com', phone:'6985236545', manager:'Obama',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Tutor Pedia', email:'tpedia@mindtronics.com', phone:'8569874589', manager:'Laura',actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Student Name' },
      { field: 'manager', header: 'Parent Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'city', header: 'City' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
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
