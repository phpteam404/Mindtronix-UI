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
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.scss']
})
export class SchoolViewComponent implements OnInit {
  status1: any;
  displayBasic: boolean;
  type: any;
  students: any;
  cols: any;
  previouslist: any=[];
  date: any;
  invoiceStatus: any;
  SchoolInvoiceId: any;
  schoolName: any;
  schoolId: any;
  schoolInvoiceObj: any = [];
  loading: boolean;
  paidDate: any;
  invoiceId: any;
  schoolsInvoiceId:any;
  enableField:boolean;
  paidAmount:any;
  submitted = null;
  constructor(private _ar: ActivatedRoute,
    private _router: Router,
    private _mservice: MasterService,
    private _Service: InvoiceService,
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
    if(!flag){
      this.updateForm.reset();
      this.getFields();
    }
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.SchoolInvoiceId = atob(params['params'].id);
      this.schoolName = (params['params'].name);
      this.getSchoolsInvoiceData(this.SchoolInvoiceId);
    });
    this.getMasterDropdown('invoice_status');
    this.getMasterDropdown('invoice_payment_mode'); 
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

  getSchoolsInvoiceData(SchoolInvoiceId) {
    var params = new HttpParams().set('school_invoice_id', SchoolInvoiceId);
    this._Service.getSchoolInvoiceInfo(params).subscribe(res => {
      console.log('result info',res);
      if (res.status) {
        this.schoolInvoiceObj = res.data.data[0];
        this.schoolId = res.data.data[0].school_id;
        this.schoolsInvoiceId = res.data.data[0].school_invoice_id;
        this.getPreviousInvoiceList(this.schoolId,this.schoolsInvoiceId);
        if(this.schoolInvoiceObj.paid_date !='0000-00-00 00:00:00'){
              this.date = this.schoolInvoiceObj.paid_date;
        }
        //this._router.navigate(['invoices/students_invoice/view',data.student_name,btoa(data.student_invoice_id)]);
      }
    });
  }

  getPreviousInvoiceList(data: any,id:any) {
    var params = new HttpParams()
      .set('school_id', data)
      .set('school_invoice_id',id);
    this._Service.getPreviousinvoices(params).subscribe(res => {
      console.log('previous invoice info',res);
      if (res.status) {
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
  getAmount (){
    if(this.updateForm.value.amount)
       return this.updateForm.value.amount
    else
      return null;
    }

  updateStatus(): any {
    this.submitted = false;
    if (this.updateForm.valid) {
      var params = {};
      params['school_invoice_id'] = Number(this.SchoolInvoiceId);
      params['status'] = this.getStatus();
      if(this.getAmount())
        params['paid_amount'] = this.getAmount();
      if(this.getPaymentType())
        params['payment_type'] = this.getPaymentType();
      params['comments'] = this.updateForm.value.comments;
      console.log(params);
      this._Service.updateInvoiceStatus(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.updateForm.reset();
          this.showBasicDialog(false);
          this.getSchoolsInvoiceData(this.SchoolInvoiceId);
        }
      });
    }
  }

  viewPreviousInvoices(data: any) {
    console.log('previous invoice  info', data);
    var params = new HttpParams().set('school_invoice_id', data.school_invoice_id);
    this._Service.getSchoolInvoiceInfo(params).subscribe(res => {
      if (res.status) {
        this.schoolInvoiceObj = res.data.data[0];
        //this._router.navigate(['invoices/school_invoice/view',data.student_name,btoa(data.school_invoice_id)]);
      }
    });
  }

  getPaidAmount(){
    this.updateForm.controls['amount'].setValue(Number(this.schoolInvoiceObj.amount));
  }
  getStatusLabel(){
    if(this.updateForm.value.status)
      return this.updateForm.value.status.label.toLowerCase();
    else return null;
  }
  statusType:any = ["paid"];
  getFields(){

    if(this.statusType.includes(this.getStatusLabel())){

      this.updateForm.controls['amount'].setValidators([Validators.required]);
      this.updateForm.controls['amount'].updateValueAndValidity();

      this.updateForm.controls['payment_type'].setValidators([Validators.required]);
      this.updateForm.controls['payment_type'].updateValueAndValidity();

      this.getPaidAmount();
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
  downloadPdf(){
    var params =new HttpParams().set('school_invoice_id',this.SchoolInvoiceId);
    this._Service.generateInvoicePdf(params).subscribe(res =>{
      FileSaver.saveAs(res.data.file_url, res.data.filename);
    })
  }
}