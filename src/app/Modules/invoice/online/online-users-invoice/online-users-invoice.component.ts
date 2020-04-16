import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { HttpParams } from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { DatePipe, formatDate } from '@angular/common';
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
  submitted = null;
  month: any;
  year: any;
  fromDate: any;
  toDate: any;
  cols:any;
  status_id: any;
  lastSixMonths:any;
  selectedMonth:any;
  totalRecords:number;
  loading:boolean;
  onlineusersInvoiceList:any
  invoiceStatusList:any;
  invoiceData:any={};
  listParamRef: LazyLoadEvent;
  showFilters:boolean;  
  currentMonth:any;
  filterRoles = ["1","6","8","7"];
  constructor(private router: Router, 
              private _route: ActivatedRoute,
              private _ls: LocalStorageService,
              private _mservice: MasterService,
              private _service: InvoiceService,
              private _toast: ToasterService,
              public translate: TranslateService,
              public datepipe: DatePipe) {
        translate.setDefaultLang(environment.defaultLanguage);
        var curRoleId = this._ls.getItem('user',true).data.user_role_id.toString();
        if(this.filterRoles.includes(curRoleId)) this.showFilters=true;
        else this.showFilters=false;
   }

   filtersForm = new FormGroup({
    from_date: new FormControl(''),
    to_date: new FormControl(''),
    status_id: new FormControl(''),
  });

  

  isEmptyTable() {
    return (this.onlineusersInvoiceList== 0 ? true : false);
  }
  ngOnInit(): void {
    this.getMasterDropdown('invoice_status');
    this.filtersForm.reset();
  }
  getMasterDropdown(masterKey): any {
    var params = new HttpParams()
      .set('master_key', masterKey)
      .set('dropdown', "true")
    return this._mservice.getMasterChilds(params).subscribe(res => {
      if (res.status) {
        if (masterKey == 'invoice_status')
          this.invoiceStatusList = res.data.data;

      }
    });
  }
  
  loadOnlineUsersInvoiceLazy(event: LazyLoadEvent) {
    this.loading=true;
    var sortOrder = (event.sortOrder == 1) ? "ASC" : "DESC";
    var params = new HttpParams()
      .set('start', event.first + '')
      .set('number', event.rows + '');
    if (event.sortField) {
      params = params.set('sort', event.sortField);
      params = params.set('order', sortOrder);
    }
    if (event.globalFilter) {
      params = params.set('search_key', event.globalFilter);
    }
    this.fromDate = this.datepipe.transform(this.filtersForm.value.from_date, 'yyyy-MM-dd');
    this.toDate = this.datepipe.transform(this.filtersForm.value.to_date, 'yyyy-MM-dd');
    if(this.filtersForm.value.status_id && this.filtersForm.value.status_id.value){
      this.status_id = this.filtersForm.value.status_id.value;
    }else this.status_id=null;
    
    if(this.fromDate) params = params.set('from_date', this.fromDate);
    if (this.toDate) params = params.set('to_date', this.toDate);
    if (this.status_id) params = params.set('status_id', this.status_id);
    if(this.selectedMonth)
      params =params.set('month',this.selectedMonth);
    else
    {
      this.currentMonth=new Date().getFullYear().toString() +'-'+'0'+(new Date().getMonth()+1).toString().slice(-2);
      params =params.set('month',this.currentMonth);
    }
    this.listParamRef = event;
    this._service.getOnlineUsersInvoiceList(params).subscribe(res => {
      if (res.status) {
        this.cols = res.data.table_headers;
        this.onlineusersInvoiceList = res.data.data;
        this.invoiceData = res.data;
        this.lastSixMonths = res.data.last_six_months;
        this.totalRecords = res.data.total_records;
        this.loading=false;
      }
    });
  }
 
  
  submit(): any {
    this.submitted = false;
    let fromDateSelected = this.filtersForm.get('from_date').value;
    let toDateSelected = this.filtersForm.get('to_date').value;
    if(fromDateSelected != null && toDateSelected == null)
    {
      this._toast.show('warning','Please Select To Date');
      return false;
    }
    if(toDateSelected !=null && fromDateSelected ==null)
     {
        this._toast.show('warning','Please Select From Date');
        return false;
     }
    if (this.filtersForm.valid) {
      this.loadOnlineUsersInvoiceLazy(this.listParamRef);
    }
  }
  resetFilters(){
    this.filtersForm.reset();
    this.loading=true;
    this.loadOnlineUsersInvoiceLazy(this.listParamRef);
  }
  monthSelected(event:any){
    this.selectedMonth = event.value.value;
    this.loadOnlineUsersInvoiceLazy(this.listParamRef);
  }
  viewonlineusers(data:any){
    this.router.navigate(['view/'+data.user_name+'/'+btoa(data.onlineuser_invoice_id)], {relativeTo: this._route});
  }
}
