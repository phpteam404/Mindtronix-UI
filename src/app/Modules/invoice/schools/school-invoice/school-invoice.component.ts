import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MasterService } from 'src/app/services/master.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';

interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-school-invoice',
  templateUrl: './school-invoice.component.html',
  styleUrls: ['./school-invoice.component.scss']
})
export class SchoolInvoiceComponent implements OnInit {
  cols: any;
  totalRecords: number;
  schoolInvoicelist: any;
  invoiceStatusList: any;
  schoolnvoiceData: any={};
  month: any;
  year: any;
  fromDate: any;
  toDate: any;
  submitted = null;
  status_id: any;
  lastSixMonths:any;
  selectedMonth:any;
  loading:boolean;
  listParamRef: LazyLoadEvent;

  constructor(private router: Router,
              private _route: ActivatedRoute,
              public translate: TranslateService,
              private _mservice: MasterService,
              private _service: InvoiceService,
              private _toast: ToasterService,
              public datepipe: DatePipe) {
                translate.setDefaultLang(environment.defaultLanguage);
    }

    filtersForm = new FormGroup({
      from_date: new FormControl(''),
      to_date: new FormControl(''),
      status_id: new FormControl(''),
    });

    isEmptyTable() {
      return (this.schoolInvoicelist == 0 ? true : false);
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


  viewStudents(data: any) {
    this.router.navigate(['view/' + data.school_name + '/' + btoa(data.school_invoice_id)], { relativeTo: this._route });
  }

  loadSchoolsInvoiceListLazy(event: LazyLoadEvent) {
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
    if(this.selectedMonth) params= params.set('month',this.selectedMonth);
    this.listParamRef = event;
    this._service.schoolsInvoiceList(params).subscribe(res => {
      console.log('result info',res);
      if (res.status) {
        this.cols = res.data.table_headers;
        this.schoolInvoicelist = res.data.data;
        this.schoolnvoiceData = res.data;
        this.lastSixMonths = res.data.last_six_months;
        this.totalRecords = res.data.total_records;
        this.loading=false;
      }
    });
  }

  submit(): any {
    this.submitted = false;
    console.log('info--',this.filtersForm.value);
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
      this.loadSchoolsInvoiceListLazy(this.listParamRef);
    }
  }

  resetFilters(){
    this.filtersForm.reset();
    this.loading=true;
    this.loadSchoolsInvoiceListLazy(this.listParamRef);
  }

  monthSelected(event:any){
    this.selectedMonth = event.value.value;
    this.loadSchoolsInvoiceListLazy(this.listParamRef);
  }

  createSchool(event:Event){
    this.router.navigate(['add'],{relativeTo:this._route});
  }

}
