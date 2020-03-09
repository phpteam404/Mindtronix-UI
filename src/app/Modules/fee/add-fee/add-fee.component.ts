import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit {

  submitted = null;
  term:any =[];
  status:any =[];
  isUpdate:boolean = false;

  pageTitle:string="Create Fee Structure";
  constructor(private _router: Router, 
              private _toast: ToasterService, 
              private _masterService: MasterService, 
              private _commonService: CommonService, 
              private _service: FeeService) {
   }
  feeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    term: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    discount_details: new FormControl(''),  
    status: new FormControl('', [Validators.required]),  
  });

  ngOnInit(): void {
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
          this._router.navigate(['fee_management']);
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
        if(masterKey == 'status'){
          this.status =  res.data.data;
          this.feeForm.controls['status'].setValue(res.data.data[0]);
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
}
