import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-franchise-view',
  templateUrl: './franchise-view.component.html',
  styleUrls: ['./franchise-view.component.scss']
})
export class FranchiseViewComponent implements OnInit {
  status1: any;
  displayBasic: boolean;
  type:any;
  students:any;
  cols:any;
  constructor() { 
    this.status1 = [
      {label:'Paid',value:{id:1,name:'Paid'}},
      {label:'Due',value:{id:2,name:'Due'}},
      {label:'Invoiced',value:{id:3,name:'Due'}},
      {label:'Over Due',value:{id:4,name:'Over Due'}}
    ];
    this.type = [
      {label:'Cash',value:{id:1,name:'Cash'}},
      {label:'Online',value:{id:2,name:'Online'}}
    ];
    this.cols = [
      { field: 'invoiceNo', header: 'Invoice No' },
      { field: 'date', header: 'Date' },
      { field: 'Amount', header: 'Amount' },
      { field: 'status', header: 'Status' }
    ];
    this.students = [
      {invoiceNo:'MIS0001',date:'25-02-2020', Amount:'₹ 1,000',status:'Paid'},
      {invoiceNo:'MIS0002', date:'26-02-2020', Amount:'₹ 5,000',status:'Invoiced'},
      {invoiceNo:'MIS0003',date:'24-02-2020', Amount:'₹ 2,000',status:'Due'},
      {invoiceNo:'MIS0004', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid'},
      {invoiceNo:'MIS0005', date:'22-02-2020', Amount:'₹ 3,000',status:'Paid'},
      {invoiceNo:'MIS0006', date:'25-02-2020', Amount:'₹ 1,000',status:'Due'},
    
    ];
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  ngOnInit(): void {
  }

}
