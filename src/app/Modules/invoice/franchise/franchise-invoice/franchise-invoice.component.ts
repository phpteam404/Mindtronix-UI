import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-franchise-invoice',
  templateUrl: './franchise-invoice.component.html',
  // template: '<div class="main-content">Hi</div>',
  styleUrls: ['./franchise-invoice.component.scss']
})
export class FranchiseInvoiceComponent implements OnInit {
 
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
      { field: 'name', header: 'Franchise Name' },
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
      {invoiceNo:'MIF0001', name:'Mindtronix Learning Centre', phone:'9789456556', email:'Anil@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0002',name:'Mindtronix Learning Centre Vidyaranyarapura', phone:'7774564556', email:'Prasad@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Invoiced',actions:''},
      {invoiceNo:'MIF0003',name:'Mindtronix Learning Centre-Kempapura', phone:'7894555556', email:'Naresh@gmail.com', date:'24-02-2020', Amount:'₹ 2,000',status:'Due',actions:''},
      {invoiceNo:'MIF0004',name:'Mindtronix Learning Centre Yelahanka', phone:'7894444556', email:'Swetha@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0005',name:'Mindtronix Learning Centre JP Nagar', phone:'7894563336', email:'Raji@gmail.com', date:'22-02-2020', Amount:'₹ 3,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0006',name:'Mindtronix Learning Centre Jaya Nagar', phone:'6878564556', email:'Ramakrishna@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Due',actions:''},
      {invoiceNo:'MIF0007',name:'Mindtronix Learning centre, BTM Layout', phone:'6664564556', email:'Phani@gmail.com', date:'27-02-2020', Amount:'₹ 4,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0008',name:'Mindtronix Learning Centre, BEML Layout', phone:'7894564556', email:'Raja@gmail.com', date:'25-02-2020', Amount:'₹ 3,000',status:'Invoiced',actions:''},
      {invoiceNo:'MIF0009',name:'Mindtronix Learning Centre Malleshwaram', phone:'7895641556', email:'Mohan@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Over Due',actions:''},
      {invoiceNo:'MIF0010',name:'Mindtronix Learning Centre E-City', phone:'7811111556', email:'Rakesh@gmail.com', date:'25-02-2020', Amount:'₹ 2,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0011',name:'Mindtronix Learning Centre, Banneraghatta', phone:'7894500000', email:'Latha@gmail.com', date:'27-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIF0012',name:'Mindtronix Learning Centre Sarjapur', phone:'7890010006', email:'Rani@gmail.com', date:'26-02-2020', Amount:'₹ 3,000',status:'Due',actions:''},
      
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

  viewFranchise(data:any){
    this.router.navigate(['view/'+data.name+'/'+btoa(data.issueId)], {relativeTo: this._route});
  }
}
