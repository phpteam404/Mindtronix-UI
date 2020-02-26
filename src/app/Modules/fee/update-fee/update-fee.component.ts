import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';

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

  constructor(private _router: Router, private _toast: ToasterService, private _ar: ActivatedRoute, private _service: FeeService) {
    this.term= [
      {label: "Monthly", value:"monthly"},
      {label: "Quarterly", value:"quarterly"},
      {label: "Half Yearly", value:"half_yearly"},
      {label: "Yearly", value:"yearly"},
    ];
    this.status =[
      {label:'Active',value:1},
      {label:'InActive',value:0}
    ];
    var id;
    _ar.paramMap.subscribe(params => {
      id = atob(params['params'].id);
      console.log('params===>>>', id);
      //this.fullObject = this.list.filter(t=>t.id == id)[0];
      _service.getById({'id':id}).subscribe(res=>{
        if(res.status){
          console.log('data---', res.data);
          this.formObj = res.data[0];
          this.feeForm.setValue({
            fee_master_id: this.formObj.fee_master_id,  
            name: this.formObj.name,
            amount: this.formObj.amount,
            term: this.formObj.term,
            discount: this.formObj.discount,
            discount_details: this.formObj.discount_details,  
            status: this.formObj.status, 
          });          
        }
      });
    });
    console.log('Constructor---');
  }
  

  ngOnInit(): void {
    console.log('ngOnInit---');
    this.feeForm = new FormGroup({
      fee_master_id: new FormControl(this.formObj.fee_master_id),  
      name: new FormControl(this.formObj.name, [Validators.required]),
      amount: new FormControl(this.formObj.amount, [Validators.required]),
      term: new FormControl(this.formObj.term, [Validators.required]),
      discount: new FormControl(this.formObj.discount),
      discount_details: new FormControl(this.formObj.discount_details),  
      status: new FormControl(this.formObj.status, [Validators.required]),  
    });
  }
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
}
