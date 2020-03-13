import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers,RequestOptions  } from '@angular/http'
import { HttpParams } from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { MasterService } from 'src/app/services/master.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, formatDate } from '@angular/common';
import {DigitalContentService} from 'src/app/services/digital-content.service';

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
  selectedFile:any;
  categories:any;
  sub_categories:any;
  content_level:any;

  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              public datepipe: DatePipe,
              public fb: FormBuilder,
              private _dService:DigitalContentService,
              public translate: TranslateService,
              private masterservices:MasterService) {
                translate.setDefaultLang(environment.defaultLanguage);

   }
   digitalForm = new FormGroup({
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
    this.getMasterDropdown('categories');
    this.getMasterDropdown('sub_categories');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('tags');
    this.getMasterDropdown('content_level');
    this.getMasterDropdown('status');
  }

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterservices.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'categories')
          this.categories =  res.data.data;
        if(masterKey == 'sub_categories')
          this.sub_categories =  res.data.data;
        if(masterKey =='grade')
          this.grade =res.data.data;
        if(masterKey =='tags')
          this.tags =res.data.data;
        if(masterKey =='content_level')
           this.content_level=res.data.data;
        if(masterKey =='status'){
          this.status =res.data.data;
          this.digitalForm.controls['status'].setValue(res.data.data[0]);
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }

  getCategory() { return this.digitalForm.value.category.value;}
  getSubCategory() { return this.digitalForm.value.sub_category.value;}
  getContentLevel() { return this.digitalForm.value.content_level.value;}
  getGrade() { return this.digitalForm.value.grade.value;}
  getTags() { return this.digitalForm.value.tags.value;}
  getDate() { return this.digitalForm.value.expiry_date;}
  getStatus() { return this.digitalForm.value.status.value;}


  submit(){
    const formData = new FormData();
    this.submitted=false;
    console.log('this.digitalForm',this.digitalForm.value);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    if(this.digitalForm.valid){
        var params={};
        params =this.digitalForm.value;
        params['expiry_date'] =this.datepipe.transform(this.getDate(), 'yyyy/MM/dd');
        params['category'] = this.getCategory();
        params['sub_category'] = this.getSubCategory();
        params['content_level'] = this.getContentLevel();
        params['grade'] = this.getGrade();
        params['tags'] = this.getTags();
        params['status'] = this.getStatus();
        params['files'] =   this.selectedFile;
      this._dService.addDigitalContent(params).subscribe(res =>{
         if(res.status){
            this.submitted=true;
            this._router.navigate(['digital_content']);
         }
         else
         {
          this._toast.show('error',JSON.parse(res.error));
         }
      });
    }
    else
    {
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  onUploadClicked(event:Event) {
    console.log('selected info',event[0].name);
    this.selectedFile =event[0].name;
  }
  

  onSelectedFilesChanged(event){
    console.log('selected info',event[0].name);
      this.selectedFile =event[0].name;
  }
  goToList(){
    this._router.navigate(['digital_content']);
  }
  

}
