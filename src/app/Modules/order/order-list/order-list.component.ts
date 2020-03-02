import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
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
      {issueId:'#MI000005', name:'rani', date:'05-02-2020', email:'rani@gmail.com', phone:'7766556291', status:'Pending',amount:'₹ 6,000'},
      {issueId:'#MI000006', name:'latha', date:'06-02-2020', email:'latha@gmail.com', phone:'8886809088', status:'Open',amount:'₹ 8,000'},
      {issueId:'#MI000007', name:'sravan', date:'08-02-2020', email:'sravan@gmail.com', phone:'9966554213', status:'Open',amount:'₹ 10,000'},
      {issueId:'#MI000008', name:'ramakrishna', date:'09-02-2020', email:'ramakrishna@gmail.com', phone:'8267819210', status:'Closed',amount:'₹ 2,000'},
      {issueId:'#MI000009', name:'swetha', date:'12-02-2020', email:'swetha@gmail.com', phone:'9977342112', status:'Open',amount:'₹ 5,000'},
      {issueId:'#MI000010', name:'prasad', date:'10-02-2020', email:'prasad@gmail.com', phone:'7839021324', status:'Closed',amount:'₹ 3,000'}
     
    ];
    this.cols = [
      
      { field: 'issueId', header: 'Order ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
      { field: 'status', header: 'Status' }
    ];
  }
  ngOnInit(): void {
  
  }

 
}
