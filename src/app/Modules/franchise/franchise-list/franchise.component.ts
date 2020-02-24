import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'src/app/services/franchise.service';
import { Router, ActivatedRoute } from '@angular/router';
import {DatexPipe} from 'src/app/customPipesDirectives/_pipe/datex.pipe';
@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseListComponent implements OnInit {
  cities: any;
  list: any;
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
    this.list = [
      {id:1,code:'LC_001',franchise_name:'Mindtronix Learning Centre', email:'mindtronixlc@mindtronics.com', contact_number:'7997666616', 
        city:'Bengaluru',created_on:'02-12-2019',status:'Active',actions:''},
      {id:2,code:'LC_002',franchise_name:'Mindtronix Learning Centre Vidyaranyarapura', email:'mindtronixlcvdp@mindtronics.com', contact_number:'076187 11378', 
        city:'Bengaluru',created_on:'02-11-2019',status:'Inactive',actions:''},
      {id:3,code:'LC_003',franchise_name:'Mindtronix Learning Centre-Kempapura', email:'mindtronixkmp@mindtronics.com', contact_number:'9876512345', 
        city:'Bengaluru',created_on:'02-12-2018',status:'Active',actions:''},
      {id:4,code:'LC_004',franchise_name:'Mindtronix Learning Centre Yelahanka', email:'mindtronixyel@mindtronics.com', contact_number:'9867538952', 
        city:'Bengaluru',created_on:'20-10-2019',status:'Active',actions:''},
      {id:5,code:'LC_005',franchise_name:'Mindtronix Learning Centre JP Nagar', email:'mindtronixjp@mindtronics.com', contact_number:'07207676333', 
        city:'Bengaluru',created_on:'26-08-2019',status:'Inactive',actions:''},
      {id:6,code:'LC_006',franchise_name:'Mindtronix Learning Centre Jaya Nagar', email:'mindtronixjy@mindtronics.com', contact_number:'9010208050', 
        city:'Bengaluru',created_on:'25-06-2019',status:'Inactive',actions:''},
      {id:7,code:'LC_007',franchise_name:'Mindtronix Learning centre, BTM Layout', email:'mindtronixbtm@mindtronics.com', contact_number:'9870564328', 
        city:'Bengaluru',created_on:'20-07-2019',status:'Active',actions:''},
      {id:8,code:'LC_008',franchise_name:'Mindtronix Learning Centre, BEML Layout', email:'mindtronixbeml@mindtronics.com', contact_number:'8185884731', 
        city:'Bengaluru',created_on:'11-03-2018',status:'Active',actions:''},
      {id:9,code:'LC_009',franchise_name:'Mindtronix Learning Centre Malleshwaram', email:'mindtronixmaleswaram@mindtronics.com', contact_number:'07997666623', 
        city:'Bengaluru',created_on:'10-03-2019',status:'Active',actions:''},
      {id:10,code:'LC_010',franchise_name:'Mindtronix Learning Centre E-City', email:'mindtronixecity@mindtronics.com', contact_number:'9676526363', 
        city:'Bengaluru',created_on:'05-08-2019',status:'Inactive',actions:''},
      {id:11,code:'LC_011',franchise_name:'Mindtronix Learning Centre, Banneraghatta', email:'mindtronixbng@mindtronics.com', contact_number:'9542794144', 
        city:'Bengaluru',created_on:'13-02-2020',status:'Active',actions:''},
      {id:12,code:'LC_012',franchise_name:'Mindtronix Learning Centre Sarjapur', email:'mindtronixsrp@mindtronics.com', contact_number:'9394791766', 
        city:'Bengaluru',created_on:'11-03-2018',status:'Inactive',actions:''}
    ];
    this.cols =  [
      { field: 'code', header: 'Franchise Code' },
      { field: 'franchise_name', header: 'Franchise Name' },
      { field: 'email', header: 'Email' },
      { field: 'contact_number', header: 'Contact Number' },
      { field: 'city', header: 'City' },
      { field: 'created_on', header :'Created On'},
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
  GoToSchools(event: Event){
    this.router.navigate(['schools'], {});
  }
  GoToUsers(event: Event){
    this.router.navigate(['users'], {});
  }

  viewFranchise(data){
    console.log('view===', data);
    this.router.navigate(['view/'+btoa(data)],{ relativeTo: this._route});
  }
  editFranchise(data){
    console.log('edit===', btoa(data));
    console.log('edit===', window.atob(btoa(data)));
   this.router.navigate(['update/'+btoa(data)],{ relativeTo: this._route});
  }
}
