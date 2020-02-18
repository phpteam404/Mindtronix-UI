import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';


@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit {

  cities:any;
  submitted = false;
  constructor(private _router: Router, private _toast: ToasterService) {     
      this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
      ];
  }
  feeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    offer_type: new FormControl(''),
    offer_details: new FormControl(''),
    discount: new FormControl(''),
    discount_details: new FormControl(''),  
  });

  get getname(): any { return this.feeForm.get('name'); }
  get getprice(): any { return this.feeForm.get('price');}
  get getphone(): any { return this.feeForm.get('phone');}
  get getdescription(): any { return this.feeForm.get('description');}
  get getoffertype(): any { return this.feeForm.get('offer_type');}
  get getofferdetails(): any { return this.feeForm.get('offer_details');}
  get getdiscount(): any { return this.feeForm.get('discount');}
  get getdiscountdetails(): any { return this.feeForm.get('discount_details');}

  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get f() { return this.feeForm.controls; }

  submit(): any{
    this.submitted = true;
    if (this.feeForm.valid) {
      this._toast.show('success','Successfully Added');
      this._router.navigate(['fee_structure']);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['fee_structure']);
  }

  
}
