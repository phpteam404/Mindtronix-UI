import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-digital-content',
  templateUrl: './add-digital-content.component.html',
  styleUrls: ['./add-digital-content.component.scss']
})
export class AddDigitalContentComponent implements OnInit {
  submitted = null;
  category:any =[];
  subCategory:any =[];
  grade:any =[];
  level:any =[];
  tags:any =[];
  status:any =[];

 

  constructor(private _router: Router,private _ar: ActivatedRoute) {
    this.category= [
      {label: "Science Product", value:"Science Product"},
      {label: "Electric", value:"Electric"},
      {label: "Robot", value:"Robot"}
    ];
    this.subCategory =[
      {label:'Students Science Kits',value:'Students Science Kits'},
      {label:'Robot Management',value:'Robot Management'}
    ];
    this.grade =[
      {label:'V',value:'V'},
      {label:'VI',value:'VI'},
      {label:'VII',value:'VII'},
      {label:'VIII',value:'VIII'},
      {label:'IX',value:'IX'},
      {label:'X',value:'X'}
    ];
    this.level =[
      {label:'Low',value:'Low'},
      {label:'Medium',value:'Medium'},
      {label:'Advanced',value:'Advanced'}
    ];
    this.tags =[
      {label:'Circuit',value:'Circuit'},
      {label:'Battery',value:'Battery'}
    ];
    this.status =[
      {label:'Active',value:1},
      {label:'Inactive',value:0}
    ];
   }
   feeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sub_category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    grade: new FormControl('', [Validators.required]),
    content_level: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    expiry_date: new FormControl(''),  
    status: new FormControl({label:'Active',value:1}, [Validators.required]),  
    files: new FormControl('')
  });
  ngOnInit(): void {
  }
  submit(){
    this.submitted=false;
    console.log('this.feeForm',this.feeForm.value);
    if(this.feeForm.valid){
      this.submitted=true;
     this._router.navigate(['digital_content/view/1']);
    }
  }
  onUploadClicked(event: Event){
    console.log('event--', event);
  }
  onSelectedFilesChanged(event: Event){
    console.log('event--', event);
  }
}
