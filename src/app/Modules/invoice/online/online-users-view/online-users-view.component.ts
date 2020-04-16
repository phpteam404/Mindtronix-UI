import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-online-users-view',
  templateUrl: './online-users-view.component.html',
  styleUrls: ['./online-users-view.component.scss']
})
export class OnlineUsersViewComponent implements OnInit {
  status1: any;
  submitted=null;
  displayBasic: boolean;
  type:any;
  students:any;
  cols:any;
  invoiceStatus:any;
  enableField:boolean;
  onlineUserInvoiceId:any;
  onlineUserName:any;
  date:any;
  onlineUserInvoiceObj:any =[];
  previouslist:any;
  onlineuserId:any;
  onlineInvoiceId:any;
  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _mservice:MasterService,
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

  isEmptyTable() {
    return (this.previouslist.length == 0 ? true : false);
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.onlineUserInvoiceId = atob(params['params'].id);
      this.onlineUserName = (params['params'].name);
      this.getOnlineUserInvoiceData(this.onlineUserInvoiceId);
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

  getOnlineUserInvoiceData(onlineUserInvoiceId) {
    var params = new HttpParams().set('onlineuser_invoice_id', onlineUserInvoiceId);
    this._service.getOnlineUsersInvoiceList(params).subscribe(res => {
      if (res.status) {
        this.onlineUserInvoiceObj = res.data.data[0];
        if(this.onlineUserInvoiceObj.paid_date !='0000-00-00 00:00:00'){
          this.date = this.onlineUserInvoiceObj.paid_date;
        }
        this.onlineuserId = res.data.data[0].online_user_id;
        this.onlineInvoiceId = res.data.data[0].onlineuser_invoice_id;
        this.getPreviousInvoiceList(this.onlineuserId, this.onlineInvoiceId);
      }
    });
  }


  getPreviousInvoiceList(data: any, id: any) {
    var params = new HttpParams()
      .set('online_user_id', data)
      .set('onlineuser_invoice_id', id);
    this._service.getPreviousinvoices(params).subscribe(res => {
      if (res.status) {
        this.previouslist = res.data.data;
      }
    });
  }

  viewPreviousInvoices(data: any) {
    var params = new HttpParams().set('onlineuser_invoice_id', data.onlineuser_invoice_id);
    this._service.getOnlineUsersInvoiceList(params).subscribe(res => {
      if (res.status) {
        this.onlineUserInvoiceObj = res.data.data[0];
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
      params['onlineuser_invoice_id'] = this.onlineUserInvoiceId;
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
          this.getOnlineUserInvoiceData(this.onlineUserInvoiceId);
        }
      });
    }
  }
  getPaidAmount(){
    this.updateForm.controls['amount'].setValue(Number(this.onlineUserInvoiceObj.amount));
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
}
