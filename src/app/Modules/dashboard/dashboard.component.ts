import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cities: any;
  cars: any;
  ordercols:any;
  ticket:any;
  cols:any;
  revenueMonth:any;
  constructor() {
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {issueId:'#MI000001', name:'prasad', date:'01-02-2020', email:'prasad@gmail.com', phone:'9977342112', status:'Closed',amount:'₹ 1,000'},
      {issueId:'#MI000002', name:'pavan', date:'07-02-2020', email:'pavan@gmail.com', phone:'7623342012', status:'Open',amount:'₹ 10,000'},
      {issueId:'#MI000003', name:'raju', date:'02-02-2020', email:'raju@gmail.com', phone:'9977012232', status:'Pending',amount:'₹ 7,000'},
      {issueId:'#MI000004', name:'rakhi', date:'04-02-2020', email:'rakhi@gmail.com', phone:'9977342112', status:'Closed',amount:'₹ 3,000'},
      {issueId:'#MI000005', name:'rani', date:'05-02-2020', email:'rani@gmail.com', phone:'7766556291', status:'Pending',amount:'₹ 6,000'}
     
    ];
    this.ordercols = [
      
      { field: 'issueId', header: 'Order ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
      { field: 'status', header: 'Status' }
    ];
    this.ticket = [
      {issueId:'#MI000001', type:'Kit Related', date:'01-02-2020', title:'Kit Not Working', created_by:'Sanjay', status:'Open',last_update:'01-02-2020'},
      {issueId:'#MI000002', type:'Software Related', date:'07-02-2020', title:'User Manual Missing', created_by:'Krish', status:'Open',last_update:'07-02-2020'},
      {issueId:'#MI000003', type:'Kit Related', date:'02-02-2020', title:'Missing Components', created_by:'Arjun', status:'Pending',last_update:'02-02-2020'},
      {issueId:'#MI000004', type:'Kit Related', date:'04-02-2020', title:'Want to Return', created_by:'Darma', status:'Open',last_update:'04-02-2020'},
      {issueId:'#MI000005', type:'Kit Related', date:'05-02-2020', title:'Need an Exchange', created_by:'Nikil', status:'Pending',last_update:'05-02-2020'}
     
    ];
    this.cols = [
      
      { field: 'issueId', header: 'Issue ID' },
      { field: 'title', header: 'Issue Title' },
      { field: 'type', header: 'Issue Type' },
      { field: 'created_by', header: 'Created By' },
      { field: 'date', header: 'Created Date' },
      { field: 'status', header: 'Status' }
    ];
    this.revenueMonth = [
      {label:'Feb 2020', value:'Feb 2020'},
      {label:'Jan 2020', value:'Jan 2020'},
      {label:'Dec 2019', value:'Dec 2019'},
    ];
  }
  ngOnInit(): void {
  
  }

 
}