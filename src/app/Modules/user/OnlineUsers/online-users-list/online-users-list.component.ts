import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online-users-list',
  templateUrl: './online-users-list.component.html',
  styleUrls: ['./online-users-list.component.scss']
})
export class OnlineUsersListComponent implements OnInit {

  allUsersList:any=[];
  cols:any=[];
  totalRecords:number;
  constructor(private _router: Router, private _ar: ActivatedRoute) { 
    this.cols = [
      { field: 'name', header: 'Student Name' },
      { field: 'manager', header: 'Parent Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'city', header: 'City' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
    this.getUsersList();
  }
  getUsersList(){
    this.allUsersList = [
      {status:'Active', grade:'VI', city:'Vijayawada', name:'John', email:'john@mindtronics.com', phone:'8185884731', manager:'mickey',actions:''},
      {status:'Active', grade:'IX', city:'Hyderabad', name:'Jith', email:'jith@mindtronics.com', phone:'9676526363', manager:'johnson',actions:''},
      {status:'Inactive', grade:'IV', city:'Hyderabad', name:'Mindex', email:'mindex@mindtronics.com', phone:'9533518785', manager:'Jenny',actions:''},
      {status:'Active', grade:'X', city:'Warangal', name:'Samuel', email:'samuel@mindtronics.com', phone:'6987452541', manager:'Lisa',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Dev', email:'teraSoft@mindtronics.com', phone:'8965412547', manager:'John II',actions:''},
      {status:'Inactive', grade:'IX', city:'Banglore', name:'Likith', email:'likith@mindtronics.com', phone:'7588965415', manager:'John',actions:''},
      {status:'Active', grade:'VIII', city:'Khanmmam', name:'johnson', email:'johnson@mindtronics.com', phone:'9658745896', manager:'Peter',actions:''},
      {status:'Active', grade:'VII', city:'Vizag', name:'Mohith', email:'mohith@mindtronics.com', phone:'9658745896', manager:'Karen',actions:''},
      {status:'Active', grade:'V', city:'Hyderabad', name:'Mathew', email:'mathew@mindtronics.com', phone:'8569745896', manager:'Dominique',actions:''},
      {status:'Inactive', grade:'VII', city:'Tirupathi', name:'Johith', email:'johith@mindtronics.com', phone:'7545896552', manager:'Christian',actions:''},
      {status:'Active', grade:'VII', city:'vijayawada', name:'Saleem', email:'saleem@mindtronics.com', phone:'9632568745', manager:'Jimmy',actions:''},
      {status:'Inactive', grade:'VIII', city:'Tirupathi', name:'sampath', email:'sampath@mindtronics.com', phone:'7895874568', manager:'Trump',actions:''},
      {status:'Active', grade:'VII', city:'Ongole', name:'Hendrick', email:'hendrick@mindtronics.com', phone:'9658523645', manager:'Donald',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'smith', email:'smith@mindtronics.com', phone:'9876572152', manager:'Modi',actions:''},
      {status:'Active', grade:'VII', city:'Nirmal', name:'Koen', email:'koen@mindtronics.com', phone:'8547896541', manager:'Jack',actions:''},
      {status:'Active', grade:'VI', city:'Tirupathi', name:'Kindt', email:'kindt@mindtronics.com', phone:'7458963521', manager:'Bill Gates',actions:''},
      {status:'Active', grade:'VII', city:'machilipatnam', name:'johan', email:'johan@mindtronics.com', phone:'6985236545', manager:'Obama',actions:''},
      {status:'Active', grade:'VII', city:'Tirupathi', name:'Verdans', email:'verdans@mindtronics.com', phone:'8569874589', manager:'Laura',actions:''}
    ];
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }
  ngOnInit(): void {
  }
  updateOnlineUser(data: any){
    this._router.navigate(['update/'+data.name+'/'+1],{relativeTo:this._ar});
  }
}
