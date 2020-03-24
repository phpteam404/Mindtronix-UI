import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { InvoiceService} from 'src/app/services/invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService} from 'primeng/api';

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
  previouslist:any;
  dueDate:any;
  invoiceStatus:any;
  StudentInvoiceId:any;
  studentName:any;
  studentId:any;
  studentInvoiceObj:any=[];
  loading:boolean;
  paidDate:any;
  submitted =null;
  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _mservice:MasterService,
              private _Service:InvoiceService,
              public translate: TranslateService) { 
     translate.setDefaultLang(environment.defaultLanguage);
   
    this.cols = [
      { field: 'invoice_number', header: 'Invoice No' },
      { field: 'invoice_date', header: 'Date' },
      { field: 'amount', header: 'Amount' },
      { field: 'status', header: 'Status' }
    ];
  }
  showBasicDialog(flag) {
    this.displayBasic = flag;
    this.submitted=null;
    this.updateForm.reset();
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.StudentInvoiceId = atob(params['params'].id);
      this.studentName = (params['params'].name);
      this.getStudentInvoiceData(this.StudentInvoiceId);
    });
    this.getMasterDropdown('invoice_status');
    this.getMasterDropdown('invoice_payment_mode');
  }
  

  updateForm  = new FormGroup({
    status: new FormControl('', [Validators.required]),
    payment_type: new FormControl('', [Validators.required]),
    comments:new FormControl('')
  });

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._mservice.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'invoice_status')
           this.invoiceStatus =  res.data.data;
        if(masterKey =='invoice_payment_mode')
          this.type =res.data.data;
      }
    });
  }
  
  getStudentInvoiceData(StudentInvoiceId){
    var params = new HttpParams().set('student_invoice_id',StudentInvoiceId);
    this._Service.getStudentsView(params).subscribe(res => {
      if(res.status){
        this.studentInvoiceObj = res.data.data[0];
        this.dueDate = res.data.due_date;
        this.paidDate =res.data.paid_date;
        this.studentId = res.data.data[0].student_id;
        console.log('studentid---',this.studentId);
        this.getPreviousInvoiceList(this.studentId);
      }
    });
  }


   getPreviousInvoiceList(id:any){
    var params = new HttpParams().set('student_id',id);
    this._Service.getPreviousinvoices(params).subscribe(res=>{
       if(res.status){
        //this.cols = res.data.table_headers;
        this.previouslist = res.data.data;
       }
    });
   }

   updateStatus():any{
     this.submitted =false;
     if(this.updateForm.valid){
       console.log('')
        var params={};
        params['student_invoice_id'] = this.StudentInvoiceId;
        params['status'] =this.updateForm.value.status.value;
        params['payment_type']= this.updateForm.value.payment_type.value;
        params['comments'] =this.updateForm.value.comments;
        this._Service.updateInvoiceStatus(params).subscribe(res=>{
          if(res.status){
            this.submitted = true;
            this.updateForm.reset();
            this.showBasicDialog(false);
          }
        });
     }
   }
}
