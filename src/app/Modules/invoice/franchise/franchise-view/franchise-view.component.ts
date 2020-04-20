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
  selector: 'app-franchise-view',
  templateUrl: './franchise-view.component.html',
  styleUrls: ['./franchise-view.component.scss']
})
export class FranchiseViewComponent implements OnInit {
  status1: any;
  displayBasic: boolean;
  type: any;
  cols: any;
  previouslist: any=[];
  dueDate: any;
  invoiceStatus: any;
  franchiseInvoiceId: any;
  franchiseName: any;
  studentId: any;
  franchiseInvoiceObj: any =[] ;
  loading: boolean;
  paidDate: any;
  franchiseId: any;
  amountMode:any;
  enableField:boolean;
  statusUpdate:any;
  franchiseviewinvoiceId:any;
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
      this.franchiseInvoiceId = atob(params['params'].id);
      this.franchiseName = (params['params'].name);
      this.getFranchiseInvoiceData(this.franchiseInvoiceId);
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
  getFranchiseInvoiceData(franchiseInvoiceId) {
    var params = new HttpParams().set('franchise_invoice_id', franchiseInvoiceId);
    this._service.getFranchiseView(params).subscribe(res => {
      if (res.status) {
        this.franchiseInvoiceObj = res.data.data[0];
        this.franchiseId = res.data.data[0].franchise_id;
        this.franchiseviewinvoiceId = res.data.data[0].franchise_invoice_id;
        this.getPreviousInvoiceList(this.franchiseId, this.franchiseviewinvoiceId);
      }
    });
  }
  getPreviousInvoiceList(data: any, id: any) {
    var params = new HttpParams()
      .set('franchise_id', data)
      .set('franchise_invoice_id', id);
    this._service.getPreviousinvoices(params).subscribe(res => {
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
  getAmount() { 
    if(this.updateForm.value.amount)
      return this.updateForm.value.amount;
    else return null;
  }
  isEmptyTable() {
    return (this.previouslist.length == 0 ? true : false);
  }
  updateStatus(): any {
    this.submitted = false;
    if (this.updateForm.valid) {
      var params = {};
      params['franchise_invoice_id'] = this.franchiseInvoiceId;
      params['status'] = this.getStatus();
      if(this.getPaymentType())
        params['payment_type'] = this.getPaymentType();
      if(this.getAmount())
        params['paid_amount'] = this.getAmount();
      params['comments'] = this.updateForm.value.comments;
      this._service.updateInvoiceStatus(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this.updateForm.reset();
          this.showBasicDialog(false);
          this.getFranchiseInvoiceData(this.franchiseInvoiceId);
        }
      });
    }
  }

  viewPreviousInvoices(data: any) {
    var params = new HttpParams().set('franchise_invoice_id', data.franchise_invoice_id);
    this._service.getFranchiseView(params).subscribe(res => {
      if (res.status) {
        this.franchiseInvoiceObj = res.data.data[0];
      }
    });
  }
  getPaidAmount(){
    this.updateForm.controls['amount'].setValue(Number(this.franchiseInvoiceObj.amount));
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
    var params =new HttpParams().set('franchise_invoice_id',this.franchiseInvoiceId);
    this._service.generateInvoicePdf(params).subscribe(res =>{
      if(res.status){
        FileSaver.saveAs(res.data.file_url, res.data.filename); 
      }
    })
  }

}
