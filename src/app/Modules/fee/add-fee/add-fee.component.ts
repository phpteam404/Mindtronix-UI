import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';

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
    // this.term= [
    //   {label: "Monthly", value:"monthly"},
    //   {label: "Quarterly", value:"quarterly"},
    //   {label: "Half Yearly", value:"half_yearly"},
    //   {label: "Yearly", value:"yearly"},
    // ];
    // this.status =[
    //   {label:'Active',value:1},
    //   {label:'InActive',value:0}
    // ];
   }
  feeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    term: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    discount_details: new FormControl(''),  
    status: new FormControl({label:'Active',value:'1'}, [Validators.required]),  
  });

  ngOnInit(): void {
    this.getMasterChilds('fee_term');
    this.getMasterChilds('status');
  }
  // convenience getter for easy access to form fields
  get f() { return this.feeForm.controls; }

  
  submit(): any {
    this.submitted = false;
    if (this.feeForm.valid) {
      var params={};
      params = this.feeForm.value;
      params['status'] = this.feeForm.value.status.value;
      params['term'] = this.feeForm.value.term.value;
      this._service.saveFee(params).subscribe(res => {
        if (res.status) {
          this.submitted = true;
          this._toast.show('success',res.message);
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
  getMasterChilds(Master_key): any{
    return this._masterService.getMasterChilds(Master_key).subscribe(res=>{
      if(res.status){
        if(Master_key == 'fee_term')
          this.term =  res.data.data;
        if(Master_key == 'status')
          this.status =  res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
}
