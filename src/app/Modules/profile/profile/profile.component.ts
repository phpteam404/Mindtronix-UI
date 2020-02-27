import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  designation: any;
  submitted=null;
  grade:any;
  constructor(private _router: Router, private _toast: ToasterService) {
    this.grade =[
      {label:'V',value:'V'},
      {label:'VI',value:'VI'},
      {label:'VII',value:'VII'},
      {label:'VIII',value:'VIII'},
      {label:'IX',value:'IX'},
      {label:'X',value:'X'}
    ];
    this.designation = [
      {label:'Student / Parent',value:{id:1,name:'Student / Parent'}},
      // {label:'Super Admin',value:{id:2,name:'Super Admin'}},
      // {label:'Franchise Admin',value:{id:3,name:'Franchise Admin'}},
      // {label:'Site Admin',value:{id:4,name:'Site Admin'}},
      // {label:'Trainer',value:{id:5,name:'Trainer'}}
    ]; 
   }

  ngOnInit(): void {
  }
  profileForm  = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    contact_number: new FormControl(''),
    changePassword: new FormControl(''),
    designation: new FormControl(''),
  });
  

  // submit(){
  //   this.submitted = false;
  //   if(this.profileForm.valid){
  //     this._toast.show('success','Successfully Added');
  //     this.submitted = true;
  //     this.goToList();
  //   }else{
  //     this._toast.show('warning','Please enter mandatory fields.');
  //   }
  // }
  
 
 
}

