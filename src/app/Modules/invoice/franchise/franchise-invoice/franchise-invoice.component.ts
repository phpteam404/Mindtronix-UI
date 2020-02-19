import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-franchise-invoice',
  templateUrl: './franchise-invoice.component.html',
  // template: '<div class="main-content">Hi</div>',
  styleUrls: ['./franchise-invoice.component.scss']
})
export class FranchiseInvoiceComponent implements OnInit {
  FrachiseInvoices: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.FrachiseInvoices = [
      {name:'Online users data', phone:'7894564556',month:'January', bill:1200,status:'Paid'},
      {name:'Sample data', phone:'7894564556',month:'February', bill:1200,status:'Paid'},
      {name:'Abc data', phone:'7894564556',month:'March', bill:12300,status:'Pending'},
      {name:'Test data', phone:'7894564556',month:'April', bill:1400,status:'Paid'},
      {name:'Master data', phone:'7894564556',month:'May', bill:1200,status:'Paid'},
      {name:'Student data', phone:'7894564556',month:'June', bill:1800,status:'Pending'},
      {name:'Form data', phone:'7894564556',month:'July', bill:2200,status:'Paid'},
      {name:'Full data', phone:'7894564556',month:'August', bill:5200,status:'Paid'},
      {name:'Page data', phone:'7894564556',month:'September', bill:1200,status:'Pending'},
      {name:'Grab kit data', phone:'7894564556',month:'October', bill:1200,status:'Paid'},
      {name:'Considered data', phone:'7894564556',month:'January', bill:1200,status:'Paid'},
      {name:'Sample data', phone:'7894564556',month:'January', bill:1200,status:'Pending'},
      {name:'List data', phone:'7894564556',month:'April', bill:1200,status:'Paid'},
      {name:'Online users data 1', phone:'7894564556',month:'May', bill:1200,status:'Paid'},
      {name:'Online users data 2', phone:'7894564556',month:'January', bill:2200,status:'Pending'},
      {name:'Online users data 3', phone:'7894564556',month:'January', bill:1800,status:'Paid'},
      {name:'Online users data 4', phone:'7894564556',month:'July', bill:1600,status:'Pending'},
      {name:'Online users data 5', phone:'7894564556',month:'January', bill:1200,status:'Paid'},
      {name:'Online users data 6', phone:'7894564556',month:'January', bill:1700,status:'Paid'},
      {name:'Online users data 7', phone:'7894564556',month:'January', bill:1400,status:'Pending'},
      {name:'Online users data 8', phone:'7894564556',month:'August', bill:12600,status:'Paid'},     
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
