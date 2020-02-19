import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'src/app/services/franchise.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseListComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
  constructor(private franchise: FranchiseService,private router: Router, private _route: ActivatedRoute) {
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {franchise_name:'Mindtronix Learning Centre', email:'mindtronixlc@mindtronics.com', contact_number:'7997666616', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
     {franchise_name:'Mindtronix Learning Centre Vidyaranyarapura', email:'mindtronixlcvdp@mindtronics.com', contact_number:'076187 11378', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre-Kempapura', email:'mindtronixkmp@mindtronics.com', contact_number:'9876512345', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre Yelahanka', email:'mindtronixyel@mindtronics.com', contact_number:'9867538952', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre JP Nagar', email:'mindtronixjp@mindtronics.com', contact_number:'07207676333', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre Jaya Nagar', email:'mindtronixjy@mindtronics.com', contact_number:'9010208050', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning centre, BTM Layout', email:'mindtronixbtm@mindtronics.com', contact_number:'9870564328', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre, BEML Layout', email:'mindtronixbeml@mindtronics.com', contact_number:'8185884731', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
     {franchise_name:'Mindtronix Learning Centre Malleshwaram', email:'mindtronixmaleswaram@mindtronics.com', contact_number:'07997666623', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre E-City', email:'mindtronixecity@mindtronics.com', contact_number:'9676526363', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre, Banneraghatta', email:'mindtronixbng@mindtronics.com', contact_number:'9542794144', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''},
      {franchise_name:'Mindtronix Learning Centre Sarjapur', email:'mindtronixsrp@mindtronics.com', contact_number:'9394791766', 
      city:'Bengaluru',website_address:'www.mindtronix.com',status:'Active',actions:''}
    ];
    this.cols = [
      { field: 'franchise_name', header: 'Franchise Name' },
      { field: 'email', header: 'Email' },
      { field: 'contact_number', header: 'Contact Number' },
      { field: 'city', header: 'City' },
      { field: 'website_address', header :'website Address'},
      { field: 'status', header:'Status'},
      { field: 'actions', header: 'Actions'}
    ];
  }

  ngOnInit(): void {
    this.getList();
   console.log('getList');
  }

  getList(){
    this.franchise.getList({}).subscribe(res=>{
      if(res.status){
        console.log('res====>>>>', res);
      }
    })
  }

  AddNewFranchise(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
}
