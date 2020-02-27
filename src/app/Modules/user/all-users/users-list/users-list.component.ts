import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  roles: any;
  allUsersList: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.roles = [
        {label:'Trainer', value:'Trainer'},
        {label:'Site Admin', value:'Site Admin'},
        {label:'Learning Center Admin', value:'Learning Center Admin'}
    ];    
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'role', header: 'Role' },
      { field: 'manager', header: 'Franchise' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
    this.getUsersList();
  }
  getUsersList(){
    this.allUsersList = [
      {id:1,status:'Active',role:'Site Admin',name:'Grab Kit', email:'grabKit@mindtronics.com', phone:'7894564556', manager:'Mindtronix Learning Centre',actions:''},
      {id:2,status:'Active',role:'Site Admin',name:'Tech Point', email:'tech_point@mindtronics.com', phone:'7418523654', manager:'Mindtronix Learning Centre Vidyaranyarapura',actions:''},
      {id:3,status:'Active',role:'Trainer',name:'Mindex', email:'mindex@mindtronics.com', phone:'9632587412', manager:'Mindtronix Learning Centre Centre-Kempapura',actions:''},
      {id:4,status:'Active',role:'Site Admin',name:'Grade Power', email:'grade_power@mindtronics.com', phone:'6987452541', manager:'Mindtronix Learning Centre Yelahanka',actions:''},
      {id:5,status:'Inactive',role:'Trainer',name:'Tera Soft', email:'teraSoft@mindtronics.com', phone:'8965412547', manager:'Mindtronix Learning Centre JP Nagar',actions:''},
      {id:6,status:'Active',role:'Trainer',name:'Brain Balance', email:'brain-blnc@mindtronics.com', phone:'7588965415', manager:'Mindtronix Learning Centre, BTM Layout',actions:''},
      {id:7,status:'Active',role:'Site Admin',name:'Learning Horizon', email:'lhorizon@mindtronics.com', phone:'9658745896', manager:'Mindtronix Learning Centre, BEML Layout',actions:''},
      {id:8,status:'Inactive',role:'Trainer',name:'Lesson Up', email:'lessonUp@mindtronics.com', phone:'9658745896', manager:'Mindtronix Learning Centre Malleshwaram',actions:''},
      {id:9,status:'Inactive',role:'Site Admin',name:'Brain Gym', email:'gym-brain@mindtronics.com', phone:'8569745896', manager:'Mindtronix Learning Centre E-City',actions:''},
      {id:10,status:'Active',role:'Site Trainer',name:'Robo Soft', email:'robosoft@mindtronics.com', phone:'7545896552', manager:'Mindtronix Learning Centre, Banneraghatta',actions:''},
      {id:11,status:'Active',role:'Site Admin',name:'Simply Brilliant', email:'sbrilliant@mindtronics.com', phone:'9632568745', manager:'Mindtronix Learning Centre Sarjapur',actions:''},
      {id:12,status:'Inactive',role:'Site Admin',name:'Inquistive', email:'inquistive@mindtronics.com', phone:'7895874568', manager:'Mindtronix Learning Centre',actions:''},
      {id:13,status:'Active',role:'Trainer',name:'People Tech', email:'people_tech@mindtronics.com', phone:'9658523645', manager:'Mindtronix Learning Centre',actions:''},
      {id:14,status:'Inactive',role:'Site Admin',name:'Bulb', email:'bulb@mindtronics.com', phone:'7845258963', manager:'Mindtronix Learning Centre',actions:''},
      {id:15,status:'Active',role:'Learning Center Admin',name:'Newton', email:'newton@mindtronics.com', phone:'8547896541', manager:'Mindtronix Learning Centre',actions:''},
      {id:16,status:'Inactive',role:'Learning Center Admin',name:'Study Point', email:'spoint@mindtronics.com', phone:'7458963521', manager:'Mindtronix Learning Centre',actions:''},
      {id:17,status:'Inactive',role:'Site Admin',name:'Robo Tech', email:'robo-tech@mindtronics.com', phone:'6985236545', manager:'Mindtronix Learning Centre',actions:''},
      {id:18,status:'Inactive',role:'Learning Center Admin',name:'Tutor Pedia', email:'tpedia@mindtronics.com', phone:'8569874589', manager:'Mindtronix Learning Centre',actions:''}
    ];
  }

  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }

  AddNewUser(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  editUser(data:any){
    this.router.navigate(['update/'+data.name+'/'+btoa(data.id)], {relativeTo: this._route});
  }

  onChange(event){
    this.getUsersList();
    console.log('***', event.value);
    if(event.value !=null){
      console.log('list ---', this.allUsersList.filter(t=>t.role == event.value.value).length);
      if(this.allUsersList.filter(t=>t.role == event.value.value).length>0)
        this.allUsersList = this.allUsersList.filter(t=>t.role == event.value.value);
    }
    else this.getUsersList();
  }

}
