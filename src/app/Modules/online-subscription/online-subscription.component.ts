import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent} from 'primeng/api';
@Component({
  selector: 'app-online-subscription',
  templateUrl: './online-subscription.component.html',
  styleUrls: ['./online-subscription.component.scss']
})
export class OnlineSubscriptionComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  // loading: boolean;
  list:any;
  constructor() {  this.list = [
    {id:1,name:'Ramakrishna', email:'Ramakrishna@gmail.com',phone:'9123451231', date:'27-01-2020', plan:'Monthly',planAmount:'₹ 1,000', planDate:'30-03-2020'},
    {id:2,name:'Prasad', email:'Prasad@gmail.com',phone:'9966552312', date:'28-01-2020', plan:'Yearly',planAmount:'₹ 10,000', planDate:'28-01-2021'},
    {id:3,name:'Naresh', email:'Naresh@gmail.com',phone:'8886877234', date:'29-01-2020', plan:'Monthly',planAmount:'₹ 1,000', planDate:'30-03-2020'},
    {id:4,name:'Anil', email:'Anil@gmail.com',phone:'9123672312', date:'01-02-2020', plan:'Yearly',planAmount:'₹ 10,000', planDate:'28-01-2021'},
    {id:5,name:'Raja', email:'Raja@gmail.com',phone:'7732017766', date:'02-02-2020', plan:'Monthly',planAmount:'₹ 10,000', planDate:'30-03-2020'},
    {id:6,name:'Pavan', email:'Pavan@gmail.com',phone:'8872321025', date:'03-02-2020', plan:'Yearly',planAmount:'₹ 10,000', planDate:'28-01-2021'},
    {id:7,name:'Teja', email:'Teja@gmail.com',phone:'9849731709', date:'04-02-2020', plan:'Monthly',planAmount:'₹ 10,000', planDate:'30-03-2020'},
    {id:8,name:'Phani', email:'Phani@gmail.com',phone:'9515734829', date:'05-02-2020', plan:'Yearly',planAmount:'₹ 10,000', planDate:'28-01-2021'},
  ];
  this.cols = [
    { field: 'name', header: 'Name' },
    { field: 'phone', header: 'Contact Number' },
    { field: 'email', header: 'Contact Email' },
    { field: 'date', header: 'Date of Registration' },
    { field: 'plan', header: 'Plan' },
    { field: 'planAmount', header: 'Plan Amount' },
    { field: 'planDate', header: 'Plan Expiry Date' }
  ];
 }
 isEmptyTable() {
  return (this.list.length == 0 ? true : false);
} 
  ngOnInit(): void {
  }

 
}
