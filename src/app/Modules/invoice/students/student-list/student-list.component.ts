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
      {name:'online users data', phone:'7894564556',month:'january', bill:1200,status:'paid',actions:''},
      {name:'sample data', phone:'7894564556',month:'February', bill:1200,status:'paid'},
      {name:'abc data', phone:'7894564556',month:'March', bill:12300,status:'pending'},
      {name:'test data', phone:'7894564556',month:'April', bill:1400,status:'paid'},
      {name:'master data', phone:'7894564556',month:'May', bill:1200,status:'paid'},
      {name:'student data', phone:'7894564556',month:'June', bill:1800,status:'pending'},
      {name:'form data', phone:'7894564556',month:'July', bill:2200,status:'paid'},
      {name:'full data', phone:'7894564556',month:'August', bill:5200,status:'paid'},
      {name:'page data', phone:'7894564556',month:'September', bill:1200,status:'pending'},
      {name:'grab kit data', phone:'7894564556',month:'October', bill:1200,status:'paid'},
      {name:'considered data', phone:'7894564556',month:'january', bill:1200,status:'paid'},
      {name:'sample data', phone:'7894564556',month:'january', bill:1200,status:'pending'},
      {name:'list data', phone:'7894564556',month:'April', bill:1200,status:'paid'},
      {name:'online users data', phone:'7894564556',month:'May', bill:1200,status:'paid'},
      {name:'online users data', phone:'7894564556',month:'january', bill:2200,status:'pending'},
      {name:'online users data', phone:'7894564556',month:'january', bill:1800,status:'paid'},
      {name:'online users data', phone:'7894564556',month:'July', bill:1600,status:'pending'},
      {name:'online users data', phone:'7894564556',month:'january', bill:1200,status:'paid'},
      {name:'online users data', phone:'7894564556',month:'january', bill:1700,status:'paid'},
      {name:'online users data', phone:'7894564556',month:'january', bill:1400,status:'pending'},
      {name:'online users data', phone:'7894564556',month:'August', bill:12600,status:'paid'},     
    ];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone' },
      { field: 'month', header: 'Month' },
      { field: 'bill', header: 'Bill' },
      { field: 'status', header: 'Status' }
    ]
   }

  ngOnInit(): void {
  }

}
