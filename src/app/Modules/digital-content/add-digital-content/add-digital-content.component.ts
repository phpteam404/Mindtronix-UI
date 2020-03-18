import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams} from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { MasterService } from 'src/app/services/master.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe} from '@angular/common';
import { ContentService } from 'src/app/services/content.service';

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
  selectedFile:any=[];
  categories:any;
  sub_categories:any;
  content_level:any;
  fileArr:any = [];
  maxSize = environment.maxUploadSize; 
  fileTypes = ["image/jpeg",
              "image/png",
              "application/pdf",
              "video/mp4",
              "video/quicktime"];
  constructor(private _router: Router,
              private _toast: ToasterService,
              private _mservice:MasterService,
              public _service: ContentService,
              private datepipe: DatePipe,
              private translate: TranslateService){
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
    status: new FormControl('', [Validators.required]),  
    files: new FormControl()
  });
  ngOnInit(): void {
    this.getMasterDropdown('categories');
    this.getMasterDropdown('sub_categories');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('content_level');
    this.getMasterDropdown('status');
  }

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._mservice.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'categories')
          this.categories =  res.data.data;
        if(masterKey == 'sub_categories')
          this.sub_categories =  res.data.data;
        if(masterKey =='grade')
          this.grade =res.data.data;
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
  getTags() { return this.digitalForm.value.tags;}
  getDate() { return this.digitalForm.value.expiry_date;}
  getStatus() { return this.digitalForm.value.status.value;}
  getName() { return this.digitalForm.value.name;}
  getDesc() { return this.digitalForm.value.description;}


  submit(){
    this.submitted=false;
    if(this.digitalForm.valid){        
        const formData = new FormData();
        formData.append('name', this.getName());
        formData.append('description', this.getDesc());
        formData.append('category', this.getCategory());
        formData.append('sub_category', this.getSubCategory());
        formData.append('expiry_date', this.datepipe.transform(this.getDate(), 'yyyy/MM/dd'));
        formData.append('status', this.getStatus());
        formData.append('tags', this.getTags());
        formData.append('grade', this.getGrade());
        formData.append('content_level', this.getContentLevel());
        if(Number(this.getUploadedFilesSize()) > Number(this.maxSize)){
          this._toast.show('warning','Maximum File upload size is 20 MB!');
          this.digitalForm.patchValue({
            files:''
          })
          return false;
        }
        for (var i = 0; i < this.fileArr.length; i++) { 
          formData.append("files["+i+"]", this.fileArr[i]);
        }
        this._service.addDigitalContent(formData).subscribe(res =>{
          if(res.status){
              this.submitted=true;
              this.goToList();
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

  onSelectedFilesChanged(event){
      this.selectedFile = event.target.files;
  }
  goToList(){
    this._router.navigate(['digital_content']);
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      Object.keys(event.target.files).forEach( key => {        
        if(this.fileTypes.indexOf(event.target.files[key].type)> -1){
          event.target.files[key].sizeVal = this.bytesToSize(event.target.files[key].size);        
          this.fileArr.push(event.target.files[key]);
        }
        else {
          this._toast.show('warning','No file uploaded or invalid file type!');
          this.digitalForm.patchValue({
            files:''
          })
          return false;
        }
      });     
    }
  }
  deleteSelectedFile(indx){
    this.fileArr.splice(indx, 1);
    this.digitalForm.patchValue({
      files:''
    })
  }
  getUploadedFilesSize(){
    var size=0;
    this.fileArr.forEach(item => { 
      if(item)
        size+=item.size;
    });
    return size;
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = Number(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)));
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }
}
