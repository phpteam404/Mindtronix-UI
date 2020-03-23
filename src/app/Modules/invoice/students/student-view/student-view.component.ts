import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { InvoiceService} from 'src/app/services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  status1: any;
  displayBasic: boolean;
  type:any;
  students:any;
  cols:any;
  dueDate:any;
  invoiceStatus:any;
  StudentInvoiceId:any;
  studentName:any;
  studentInvoiceObj:any=[];
  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _service:MasterService,
              private _Service:InvoiceService,
              public translate: TranslateService) { 
     translate.setDefaultLang(environment.defaultLanguage);
   
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
  hideBasicDialog(){
    this.displayBasic =false;
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.StudentInvoiceId = atob(params['params'].id);
      this.studentName = (params['params'].name);
      this.getStudentInvoiceData(this.StudentInvoiceId);
    });
    this.getMasterDropdown('invoice_status');
  }
  
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._service.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'invoice_status')
           this.invoiceStatus =  res.data.data;

      }
    });
  }
  
  getStudentInvoiceData(StudentInvoiceId){
    var params = new HttpParams().set('student_invoice_id',StudentInvoiceId);
    this._Service.getStudentsView(params).subscribe(res => {
      if(res.status){
        this.studentInvoiceObj = res.data.data[0];
        this.dueDate = res.data.due_date;
        //this.contacts = res.data.data[0].franchise_contacts_information;
        //this.FeeList = res.data.data[0].fee_detalis;
        //this.franchiseExtraInfo = res.data;        
      }
    });
  }
}
