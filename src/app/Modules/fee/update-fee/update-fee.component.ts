import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { HttpParams } from '@angular/common/http';
import { MasterService } from 'src/app/services/master.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-fee',
  templateUrl: '../add-fee/add-fee.component.html',
  styleUrls: ['./update-fee.component.scss']
})
export class UpdateFeeComponent implements OnInit {

  submitted = null;
  term:any =[];
  status:any =[];
  formObj:any={};
  pageTitle:string="Update Fee Structure";
  feeForm: FormGroup;
  isUpdate:boolean = true;

  constructor(private _router: Router,
              private _toast: ToasterService,
              private _ar: ActivatedRoute,
              private _masterService: MasterService,
              private _service: FeeService,
              public translate: TranslateService) {
     translate.setDefaultLang(environment.defaultLanguage);
    var id:any;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      var param = new HttpParams().set('fee_master_id',id);
      _service.getById(param).subscribe(res=>{
        if(res.status){
          this.formObj = res.data.data[0];
          this.feeForm.setValue({
            fee_master_id: this.formObj.fee_master_id,  
            name: this.formObj.name,
            amount: Number(this.formObj.amount),
            term: this.formObj.term,
            discount: this.formObj.discount,
            discount_details: this.formObj.discount_details,  
            status: this.formObj.status, 
          });          
        }
      });
    });
  }
  

  ngOnInit(): void {
    this.feeForm = new FormGroup({
      fee_master_id: new FormControl(this.formObj.fee_master_id),  
      name: new FormControl(this.formObj.name, [Validators.required]),
      amount: new FormControl(this.formObj.amount, [Validators.required]),
      term: new FormControl(this.formObj.term, [Validators.required]),
      discount: new FormControl(this.formObj.discount),
      discount_details: new FormControl(this.formObj.discount_details),  
      status: new FormControl(this.formObj.status, [Validators.required]),  
    });
    this.getMasterData('fee_term');
    this.getMasterData('status');
  }

  getStatus(){ return this.feeForm.value.status.value; }
  getTerm(){ return this.feeForm.value.term.value; }

  submit(): any {
    this.submitted = false;
    if (this.feeForm.valid) {
      var params={};
      params = this.feeForm.value;
      params['status'] = this.getStatus();
      params['term'] = this.getTerm();
      this._service.saveFee(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          // this._toast.show('success',res.message);
          this.goToList();
        }else{
          this._toast.show('error',JSON.parse(res.error));
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['fee_management']);
  }
  //This service is to Get Master childs Based on Selected Master
  getMasterData(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._masterService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'fee_term')
          this.term =  res.data.data;
        if(masterKey == 'status')
          this.status =  res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
}
