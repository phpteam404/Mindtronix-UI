import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-invoice',
  templateUrl: './student-invoice.component.html',
  styleUrls: ['./student-invoice.component.scss']
})
export class StudentInvoiceComponent implements OnInit {

  students: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
 
    this.students = [
      {name:'Tom Smith', phone:'9789456556',month:'January', bill:1200,status:'Paid',actions:''},
      {name:'sample data', phone:'7774564556',month:'February', bill:1200,status:'Paid'},
      {name:'abc data', phone:'7894555556',month:'March', bill:12300,status:'Pending'},
      {name:'test data', phone:'7894444556',month:'April', bill:1400,status:'Paid'},
      {name:'master data', phone:'7894563336',month:'May', bill:1200,status:'Paid'},
      {name:'student data', phone:'6878564556',month:'June', bill:1800,status:'Pending'},
      {name:'Form data', phone:'6664564556',month:'July', bill:2200,status:'Paid'},
      {name:'Full data', phone:'7894564556',month:'August', bill:5200,status:'Paid'},
      {name:'page data', phone:'7895641556',month:'September', bill:1200,status:'Pending'},
      {name:'grab kit data', phone:'7811111556',month:'October', bill:1200,status:'Paid'},
      {name:'considered data', phone:'7894500000',month:'January', bill:1200,status:'Paid'},
      {name:'Prasad', phone:'7890010006',month:'January', bill:1200,status:'Pending'},
      {name:'Test data', phone:'7000000006',month:'April', bill:1200,status:'Paid'},
      {name:'John', phone:'7894564556',month:'May', bill:1200,status:'Paid'},
      {name:'Mark', phone:'8512475698',month:'January', bill:2200,status:'Pending'},
      {name:'Stev', phone:'9856854785',month:'January', bill:1800,status:'Paid'},
      {name:'John II', phone:'9658932541',month:'July', bill:1600,status:'Pending'},
      {name:'AAA', phone:'9654785412',month:'January', bill:1200,status:'Paid'},
      {name:'BBB', phone:'9696965652',month:'January', bill:1700,status:'Paid'},
      {name:'Invoice', phone:'7485896541',month:'January', bill:1400,status:'Pending'},
      {name:'Invoice 2', phone:'8569856985',month:'August', bill:12600,status:'Paid'},     
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
