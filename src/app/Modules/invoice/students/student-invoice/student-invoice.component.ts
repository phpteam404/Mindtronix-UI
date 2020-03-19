import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, formatDate } from '@angular/common';

interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-student-invoice',
  templateUrl: './student-invoice.component.html',
  styleUrls: ['./student-invoice.component.scss']
})
export class StudentInvoiceComponent implements OnInit {

  students: any;
  cols:any;
  totalRecords:number;
  status:Filter[];
  selectedStatus:Filter[];
  minDate:Date = new Date();
  constructor(private router: Router, 
              private _route: ActivatedRoute,
              public translate: TranslateService,
              public datepipe: DatePipe) {
                translate.setDefaultLang(environment.defaultLanguage);

    this.status = [
      {label: 'Due',value:'Due'},
      {label:'Paid', value:'Paid'},
      {label:'Over Due', value:'Over Due'},
     
  ];
 
    this.cols = [
      { field: 'invoiceNo', header: 'Invoice No' },
      { field: 'name', header: 'Student Name' },
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
      {invoiceNo:'MIS0001', name:'Anil', phone:'9789456556', email:'Anil@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0002',name:'Prasad', phone:'7774564556', email:'Prasad@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Invoiced',actions:''},
      {invoiceNo:'MIS0003',name:'Naresh', phone:'7894555556', email:'Naresh@gmail.com', date:'24-02-2020', Amount:'₹ 2,000',status:'Due',actions:''},
      {invoiceNo:'MIS0004',name:'Swetha', phone:'7894444556', email:'Swetha@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0005',name:'Raji', phone:'7894563336', email:'Raji@gmail.com', date:'22-02-2020', Amount:'₹ 3,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0006',name:'Ramakrishna', phone:'6878564556', email:'Ramakrishna@gmail.com', date:'25-02-2020', Amount:'₹ 1,000',status:'Due',actions:''},
      {invoiceNo:'MIS0007',name:'Phani', phone:'6664564556', email:'Phani@gmail.com', date:'27-02-2020', Amount:'₹ 4,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0008',name:'Raja', phone:'7894564556', email:'Raja@gmail.com', date:'25-02-2020', Amount:'₹ 3,000',status:'Invoiced',actions:''},
      {invoiceNo:'MIS0009',name:'Mohan', phone:'7895641556', email:'Mohan@gmail.com', date:'26-02-2020', Amount:'₹ 5,000',status:'Over Due',actions:''},
      {invoiceNo:'MIS0010',name:'Rakesh', phone:'7811111556', email:'Rakesh@gmail.com', date:'25-02-2020', Amount:'₹ 2,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0011',name:'Latha', phone:'7894500000', email:'Latha@gmail.com', date:'27-02-2020', Amount:'₹ 1,000',status:'Paid',actions:''},
      {invoiceNo:'MIS0012',name:'Rani', phone:'7890010006', email:'Rani@gmail.com', date:'26-02-2020', Amount:'₹ 3,000',status:'Due',actions:''},
      
    ];
  }

  isEmptyTable() {
    return (this.students.length == 0 ? true : false);
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

  viewStudents(data:any){
    this.router.navigate(['view/'+data.name+'/'+btoa(data.issueId)], {relativeTo: this._route});
  }
}
