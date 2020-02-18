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
      {name:'Grab Kit', email:'grabKit@mindtronics.com', phone:'7894564556', manager:'Mike',actions:''},
      {name:'Tech Point', email:'tech_point@mindtronics.com', phone:'7418523654', manager:'Peter',actions:''},
      {name:'Mindex', email:'mindex@mindtronics.com', phone:'9632587412', manager:'Jenny',actions:''},
      {name:'Grade Power', email:'grade_power@mindtronics.com', phone:'6987452541', manager:'Lisa',actions:''},
      {name:'Tera Soft', email:'teraSoft@mindtronics.com', phone:'8965412547', manager:'John II',actions:''},
      {name:'Brain Balance', email:'brain-blnc@mindtronics.com', phone:'7588965415', manager:'John',actions:''},
      {name:'Learning Horizon', email:'lhorizon@mindtronics.com', phone:'9658745896', manager:'Peter',actions:''},
      {name:'Lesson Up', email:'lessonUp@mindtronics.com', phone:'9658745896', manager:'Karen',actions:''},
      {name:'Brain Gym', email:'gym-brain@mindtronics.com', phone:'8569745896', manager:'Dominique',actions:''},
      {name:'Robo Soft', email:'robosoft@mindtronics.com', phone:'7545896552', manager:'Christian',actions:''},
      {name:'Simply Brilliant', email:'sbrilliant@mindtronics.com', phone:'9632568745', manager:'Jimmy',actions:''},
      {name:'Inquistive', email:'inquistive@mindtronics.com', phone:'7895874568', manager:'Trump',actions:''},
      {name:'People Tech', email:'people_tech@mindtronics.com', phone:'9658523645', manager:'Donald',actions:''},
      {name:'Bulb', email:'bulb@mindtronics.com', phone:'7845258963', manager:'Modi',actions:''},
      {name:'Newton', email:'newton@mindtronics.com', phone:'8547896541', manager:'Jack',actions:''},
      {name:'Study Point', email:'spoint@mindtronics.com', phone:'7458963521', manager:'Bill Gates',actions:''},
      {name:'Robo Tech', email:'robo-tech@mindtronics.com', phone:'6985236545', manager:'Obama',actions:''},
      {name:'Tutor Pedia', email:'tpedia@mindtronics.com', phone:'8569874589', manager:'Laura',actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'manager', header: 'Manager' },
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
