import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { InvoiceService} from 'src/app/services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/utils/local-storage.service';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.scss']
})
export class SchoolCreateComponent implements OnInit {
  submitted = null;
  pageTitle:string = "Create School";
  isUpdate:boolean = false;
  franchise:any=[];
  state:any=[];
  city:any=[];
  country:any=[];
  schools:any;

  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _ls: LocalStorageService,
              private schoolService:SchoolService,
              private _service:InvoiceService,
              public translate: TranslateService) { 
    translate.setDefaultLang(environment.defaultLanguage);
  }

  createForm = new FormGroup({
    school_id: new FormControl('', [Validators.required]),
    school_invoice_description: new FormControl(''),
    school_manual_invoice_id:new FormControl(''),
    amount: new FormControl('',[Validators.required]),
    tax: new FormControl(''),
    discount: new FormControl(''),
  });
  ngOnInit(): void {
    this.getSchoolsList();
  }

  getSchoolsList() {
    this.schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
      }
    });
  }

  getschool() { return this.createForm.value.school_id.value;}

  submit(): any {
    this.submitted = false;
    if (this.createForm.valid) {
      console.log('createForm info',this.createForm.value);
      var params={};
      params = this.createForm.value;
      params['school_id'] = this.getschool();
      this._service.generateSchoolInvoice(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._router.navigate(['invoices/school_invoice']);
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }  
  goToList(){
     this._router.navigate(['invoices/school_invoice']);
  }  
}
