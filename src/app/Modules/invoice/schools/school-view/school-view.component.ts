import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

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
  previouslist: any;
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
      { field: 'amount', header: 'Amount' },
      { field: 'status', header: 'Status' }
    ];
  }
  showBasicDialog(flag) {
    this.displayBasic = flag;
    this.submitted = null;
    this.updateForm.reset();
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


  getMasterDropdown(masterKey): any {
    var params = new HttpParams()
      .set('master_key', masterKey)
      .set('dropdown', "true")
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

  getStatus() { return this.updateForm.value.status.value; }
  getPaymentType() { 
    if(this.updateForm.value.payment_type)
      return this.updateForm.value.payment_type.value;
    else null;
  }


  updateStatus(): any {
    this.submitted = false;
    if (this.updateForm.valid) {
      console.log('update from value', this.updateForm.value);
      var params = {};
      params['school_invoice_id'] = Number(this.SchoolInvoiceId);
      params['status'] = this.getStatus();
      params['payment_type'] = this.getPaymentType();
      params['paid_amount'] =this.updateForm.value.amount;
      params['comments'] = this.updateForm.value.comments;
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
}
