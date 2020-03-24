import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MasterService } from 'src/app/services/master.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';


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

  cols: any;
  totalRecords: number;
  invoicelist: any;
  invoiceStatus: any;
  invoiceCount: any;
  totalInvoiceAmount: number;
  invoiceCollectedAmount: number;
  month: any;
  year: any;
  dueAmount: any;
  constructor(private router: Router,
    private _route: ActivatedRoute,
    public translate: TranslateService,
    private _mservice: MasterService,
    private _service: InvoiceService,
    public datepipe: DatePipe) {
    translate.setDefaultLang(environment.defaultLanguage);

  }

  isEmptyTable() {
    return (this.invoicelist == 0 ? true : false);
  }
  ngOnInit(): void {
    this.getMasterDropdown('invoice_status');
  }
  getMasterDropdown(masterKey): any {
    var params = new HttpParams()
      .set('master_key', masterKey)
      .set('dropdown', "true")
    return this._mservice.getMasterChilds(params).subscribe(res => {
      if (res.status) {
        if (masterKey == 'invoice_status')
          this.invoiceStatus = res.data.data;

      }
    });
  }

  viewStudents(data: any) {
    console.log('data info', data);
    this.router.navigate(['view/' + data.student_name + '/' + btoa(data.student_invoice_id)], { relativeTo: this._route });
    //this.router.navigate(['view/'+data.student_name+'/'+btoa(data.student_invoice_id)+'/'+data.student_id],{relativeTo: this._route});
  }
  loadStudentsInvoiceLazy(event: LazyLoadEvent) {
    console.log('event info', event);
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
    if (event.filters['status_id']) {
      params = params.set('status_id', event.filters['status_id'].value.value);
    }
    if (event.filters['to_date']) {
      //params =params.set('to_date',this.datepipe.transform(event.filters['to_date'].value, 'yyyy/MM/dd'));
      params = params.set('to_date', event.filters['to_date'].value);
    }
    if (event.filters['from_date']) {
      //params =params.set('from_date',this.datepipe.transform(event.filters['from_date'].value, 'yyyy/MM/dd'));
      params = params.set('from_date', event.filters['from_date'].value);
    }
    this._service.getstudentInvoice(params).subscribe(res => {
      if (res.status) {
        this.cols = res.data.table_headers;
        this.invoicelist = res.data.data;
        this.invoiceCount = res.data.invoices_count;
        this.totalInvoiceAmount = res.data.total_invoices_amount;
        this.invoiceCollectedAmount = res.data.total_collected_amount;
        this.dueAmount = res.data.due_amount;
        this.totalRecords = res.data.total_records;
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.month = monthNames[(new Date()).getMonth()];
        this.year = new Date().getFullYear();
      }
    });
  }
}
