import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
declare var require:any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  status1: any;
  displayBasic: boolean;
  type: any;
  students: any;
  cols: any;
  previouslist: any=[];
  dueDate: any;
  invoiceStatus: any;
  StudentInvoiceId: any;
  studentName: any;
  studentId: any;
  studentInvoiceObj: any = [];
  loading: boolean;
  paidDate: any;
  invoiceId: any;
  enableField:boolean;
  statusUpdate:any;
  submitted = null;
  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _mservice: MasterService,
              private _service: InvoiceService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);

    this.cols = [
      { field: 'invoice_number', header: 'Number' },
      { field: 'invoice_date', header: 'Date' },
      { field: 'total_amount', header: 'Amount' },
      { field: 'status', header: 'Status' }
    ];
  }
  showBasicDialog(flag) {
    this.displayBasic = flag;
    this.submitted = null;
    if(!flag)
    this.updateForm.reset();
    this.getFields();
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.StudentInvoiceId = atob(params['params'].id);
      this.studentName = (params['params'].name);
      this.getStudentInvoiceData(this.StudentInvoiceId);
    });
    this.getMasterDropdown('invoice_status');
    this.getMasterDropdown('invoice_payment_mode');
    this.getMasterDropdown('invoice_update');
  }

  updateForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
    payment_type: new FormControl(''),
    amount:new FormControl(''),
    comments: new FormControl('')
  });
  isEmptyTable() {
    return (this.previouslist.length == 0 ? true : false);
  }
  getMasterDropdown(masterKey): any {
    var params = new HttpParams()
      .set('master_key', masterKey)
      .set('dropdown', "true")
      .set('invoice_update' ,"true");
    return this._mservice.getMasterChilds(params).subscribe(res => {
      if (res.status) {
        if (masterKey == 'invoice_status')
          this.invoiceStatus = res.data.data;
        if (masterKey == 'invoice_payment_mode')
          this.type = res.data.data;
      }
    });
  }

  getStudentInvoiceData(StudentInvoiceId) {
    var params = new HttpParams().set('student_invoice_id', StudentInvoiceId);
    this._service.getStudentsView(params).subscribe(res => {
      if (res.status) {
        this.studentInvoiceObj = res.data.data[0];
        this.dueDate = res.data.due_date;
        this.paidDate = res.data.paid_date;
        this.studentId = res.data.data[0].student_id;
        this.invoiceId = res.data.data[0].student_invoice_id;
        console.log('studentid---', this.studentId);
        this.getPreviousInvoiceList(this.studentId, this.invoiceId);
        //this._router.navigate(['invoices/students_invoice/view',data.student_name,btoa(data.student_invoice_id)]);
      }
    });
  }

  getPreviousInvoiceList(data: any, id: any) {
    var params = new HttpParams()
      .set('student_id', data)
      .set('student_invoice_id', id);
    this._service.getPreviousinvoices(params).subscribe(res => {
      if (res.status) {
        //this.cols = res.data.table_headers;
        this.previouslist = res.data.data;
      }
    });
  }

  getStatus() {
    if(this.updateForm.value.status)
      return this.updateForm.value.status.value;
    else return null;
  }
  getPaymentType() { 
    if(this.updateForm.value.payment_type)
      return this.updateForm.value.payment_type.value;
    else return null;
  }
  getAmount() { 
    if(this.updateForm.value.amount)
      return this.updateForm.value.amount;
    else return null;
  }


  updateStatus(): any {
    this.submitted = false;
    if (this.updateForm.valid) {
      console.log('update from value', this.updateForm.value);
      var params = {};
      params['student_invoice_id'] = this.StudentInvoiceId;
      params['status'] = this.getStatus();
      if(this.getPaymentType())
        params['payment_type'] = this.getPaymentType();
      if(this.getAmount())
        params['paid_amount'] = this.getAmount();
      params['comments'] = this.updateForm.value.comments;
      console.log(params);
      this._service.updateInvoiceStatus(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.updateForm.reset();
          this.showBasicDialog(false);
          this.getStudentInvoiceData(this.StudentInvoiceId);
        }
      });
    }
  }
  viewPreviousInvoices(data: any) {
    console.log('previous invoice  info', data);
    var params = new HttpParams().set('student_invoice_id', data.student_invoice_id);
    this._service.getStudentsView(params).subscribe(res => {
      if (res.status) {
        this.studentInvoiceObj = res.data.data[0];
        this.dueDate = res.data.due_date;
        this.paidDate = res.data.paid_date;
        //this._router.navigate(['invoices/students_invoice/view',data.student_name,btoa(data.student_invoice_id)]);
      }
    });
  }

  getPaidAmount(){
    this.updateForm.controls['amount'].setValue(Number(this.studentInvoiceObj.amount));
  }
  getStatusLabel(){
    if(this.updateForm.value.status)
      return this.updateForm.value.status.label.toLowerCase();
    else return null;
  }
  statusType:any = ["paid"];
  getFields(){
    
    if(this.statusType.includes(this.getStatusLabel())){

      this.getPaidAmount();

      this.updateForm.controls['amount'].setValidators([Validators.required]);
      this.updateForm.controls['amount'].updateValueAndValidity();

      this.updateForm.controls['payment_type'].setValidators([Validators.required]);
      this.updateForm.controls['payment_type'].updateValueAndValidity();

      this.enableField = true;
    }
    else{
      this.updateForm.get('payment_type').clearValidators();      
      this.updateForm.controls['payment_type'].updateValueAndValidity();
      this.updateForm.controls['payment_type'].setValue(null);

      this.updateForm.get('amount').clearValidators();      
      this.updateForm.controls['amount'].updateValueAndValidity();
      this.updateForm.controls['amount'].setValue(null);

      this.enableField =false;
    }
  }
  downloadPDF(){
    var params = new HttpParams().set('student_invoice_id',this.StudentInvoiceId);
    this._service.generateInvoicePdf(params).subscribe(res=>{
      if(res.status){
        FileSaver.saveAs(res.data.file_url, res.data.filename);
      }
    })
  }
}