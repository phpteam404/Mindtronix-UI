import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online-users-invoice',
  templateUrl: './online-users-invoice.component.html',
  styleUrls: ['./online-users-invoice.component.scss']
})
export class OnlineUsersInvoiceComponent implements OnInit {

  userInvoices: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.userInvoices = [
      {name:'Smith', phone:'7894564556',month:'January', bill:1200,status:'Pain'},
      {name:'Tech', phone:'8569745896',month:'February', bill:1200,status:'Pain'},
      {name:'Skill Set', phone:'8965455444',month:'March', bill:12300,status:'Pending'},
      {name:'Grab Kit', phone:'8524512032',month:'April', bill:1400,status:'Pain'},
      {name:'Tehno', phone:'9632012012',month:'May', bill:1200,status:'Pain'},
      {name:'Rhino', phone:'9652014256',month:'June', bill:1800,status:'Pending'},
      {name:'Cheepu', phone:'8574222563',month:'July', bill:2200,status:'Pain'},
      {name:'Reindeet', phone:'7894561240',month:'August', bill:5200,status:'Pain'},
      {name:'Soft Tech', phone:'9632541023',month:'September', bill:1200,status:'Pending'},
      {name:'Fun Jump', phone:'8521023654',month:'October', bill:1200,status:'Pain'},
      {name:'Little Star', phone:'8536941255',month:'January', bill:1200,status:'Pain'},
      {name:'Super Kid', phone:'9623525212',month:'January', bill:1200,status:'Pending'},
      {name:'Kidz', phone:'7774564556',month:'April', bill:1200,status:'Pain'},
      {name:'Olive', phone:'7891212156',month:'May', bill:1200,status:'Pain'},
      {name:'Olav', phone:'7893636367',month:'January', bill:2200,status:'Pending'},
      {name:'Anna', phone:'7894444551',month:'January', bill:1800,status:'Pain'},
      {name:'Kristuf', phone:'7445454553',month:'July', bill:1600,status:'Pending'},
      {name:'Frozen', phone:'7898994556',month:'January', bill:1200,status:'Pain'},
      {name:'Funtaas', phone:'7656524558',month:'January', bill:1700,status:'Pain'},
      {name:'Sample', phone:'7844444552',month:'January', bill:1400,status:'Pending'},
      {name:'Test', phone:'7891111116',month:'August', bill:12600,status:'Pain'},      
    ];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone' },
      { field: 'month', header: 'Month' },
      { field: 'bill', header: 'Bill' },
      { field: 'status', header: 'Status' }
    ]
  }

  ngOnInit(): void {}

}
