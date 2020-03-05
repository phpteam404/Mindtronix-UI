import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-online-users-invoice',
  templateUrl: './online-users-invoice.component.html',
  styleUrls: ['./online-users-invoice.component.scss']
})
export class OnlineUsersInvoiceComponent implements OnInit {

  students: any;
  cols:any;
 
  status:Filter[];
  selectedStatus:Filter[];
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.status = [
      {label: 'Due',value:'Due'},
      {label:'Paid', value:'Paid'},
      {label:'Over Due', value:'Over Due'},
     
  ];
 
    this.cols = [
      { field: 'invoiceNo', header: 'Invoice No' },
      { field: 'name', header: 'Online User Name' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'email', header: 'Contact Email' },
      { field: 'date', header: 'Invoice Date' },
      { field: 'Amount', header: 'Amount' },
      { field: 'status', header: 'Status' }
      // { field: 'actions', header: 'Actions' }
    ];
    this.getStudentsList();
   }
   getStudentsList(){
    this.students = [
      {invoiceNo:'MII0001', name:'Anil', phone:'9789456556', email:'Anil@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MII0002',name:'Prasad', phone:'7774564556', email:'Prasad@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Invoiced',actions:''},
      {invoiceNo:'MII0003',name:'Naresh', phone:'7894555556', email:'Naresh@gmail.com', date:'24-02-2020', Amount:'₹ 2,000',status:'Due',actions:''},
      {invoiceNo:'MII0004',name:'Swetha', phone:'7894444556', email:'Swetha@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MII0005',name:'Raji', phone:'7894563336', email:'Raji@gmail.com', date:'22-02-2020', Amount:'₹ 3,000',status:'Paid',actions:''},
      {invoiceNo:'MII0006',name:'Ramakrishna', phone:'6878564556', email:'Ramakrishna@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Due',actions:''},
      {invoiceNo:'MII0007',name:'Phani', phone:'6664564556', email:'Phani@gmail.com', date:'27-02-2020', Amount:'₹ 4,000',status:'Paid',actions:''},
      {invoiceNo:'MII0008',name:'Raja', phone:'7894564556', email:'Raja@gmail.com', date:'25-02-2020', Amount:'₹ 3,000',status:'Invoiced',actions:''},
      {invoiceNo:'MII0009',name:'Mohan', phone:'7895641556', email:'Mohan@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Over Due',actions:''},
      {invoiceNo:'MII0010',name:'Rakesh', phone:'7811111556', email:'Rakesh@gmail.com', date:'25-02-2020', Amount:'₹ 2,000',status:'Paid',actions:''},
      {invoiceNo:'MII0011',name:'Latha', phone:'7894500000', email:'Latha@gmail.com', date:'27-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MII0012',name:'Rani', phone:'7890010006', email:'Rani@gmail.com', date:'26-02-2020', Amount:'₹ 3,000',status:'Due',actions:''},
      
    ];
  }
  ngOnInit(): void {
  }
  onChange2(event){
    this.getStudentsList();
    // this.getStudentsList();
    console.log('***', event.value.value);
    if(event.value !=null){
      console.log('list ---', this.students.filter(t=>t.franchise == event.value.value).length);
      if(this.students.filter(t=>t.franchise == event.value.value).length>0)
        this.students = this.students.filter(t=>t.franchise == event.value.value);
    }
    else this.getStudentsList();
  }

  viewUsers(data:any){
    this.router.navigate(['view/'+data.name+'/'+btoa(data.issueId)], {relativeTo: this._route});
  }
}
