import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit {

  submitted = null;
  term:any =[];
  status:any =[];

  pageTitle:string="Create Fee Structure";
  constructor(private _router: Router, private _toast: ToasterService) {
    this.term= [
      {label: "Monthly", value:"monthly"},
      {label: "Quarterly", value:"quarterly"},
      {label: "Half Yearly", value:"half_yearly"},
      {label: "Yearly", value:"yearly"},
    ];
    this.status =[
      {label:'Active',value:'active'},
      {label:'InActive',value:'Inactive'}
    ];
   }
  feeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    term: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    discount_details: new FormControl(''),  
    status: new FormControl({label:'Active',value:'active'}, [Validators.required]),  
  });
  get getname(): any { return this.feeForm.get('name'); }
  get getamount(): any { return this.feeForm.get('amount'); }
  get getterm(): any { return this.feeForm.get('term'); }
  get getdiscount(): any { return this.feeForm.get('discount'); }
  get getdiscountdetails(): any { return this.feeForm.get('discount_details'); }

  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get f() { return this.feeForm.controls; }

  submit(): any{
    this.submitted = false;
    if (this.feeForm.valid) {
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this._router.navigate(['fee_management']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['fee_management']);
  }
}
