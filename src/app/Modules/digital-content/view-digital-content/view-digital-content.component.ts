import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { ContentService } from 'src/app/services/content.service';
import { LazyLoadEvent,ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe} from '@angular/common';
declare var require:any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-view-digital-content',
  templateUrl: './view-digital-content.component.html',
  styleUrls: ['./view-digital-content.component.scss']
})
export class ViewDigitalContentComponent implements OnInit {

  prdAssetPath:string = environment.prdAssetPath;
  categories:any =[];
  sub_categories:any =[];
  submitted=null;
  grade:any =[];
  content_level:any =[];
  tags:any =[];
  first:number=0;
  status:any =[];
  fileArr:any = [];
  displayBasic3: boolean;
  chart:Chart;
  contentName:any;
  maxDate: Date;
  digitalForm:FormGroup;
  displayBasic:boolean;
  digitalContentObj:any={};
  
  digitalContentId:any;
  digitalContent:any={};
  cols:any;
  
  documents:any=[];
  fileTypes = ["image/jpeg",
              "image/png",
              "application/pdf",
              "video/mp4",
              "video/quicktime"];
  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              private _toast: ToasterService,
              private _service:ContentService,
              public datepipe: DatePipe,
              private _confirm: ConfirmationService,
              private _mservice:MasterService,
              private _cService: CommonService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    this.maxDate = new Date();
    this.cols = [
      { field: 'attacheImg', header: 'Img' },
      { field: 'document_name', header: 'Name' },
      { field: 'action', header: 'Actions' }
    ];          
  } 

     
  showBasicDialog3() {
    this.displayBasic3 = true;
    this.getDigitalContentData();
  }

  hideBasicDialog() {
    this.displayBasic3 = false;
    this.digitalForm.reset();
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.digitalContentId = atob(params['params'].id);
      this.contentName = (params['params'].name);
      this.getDigitalContentInfo(this.digitalContentId);
      this.getDigitalContentData();
    });
    this.loadStatisticsChart();

    this.digitalForm = new FormGroup({
    digital_content_management_id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sub_category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    grade: new FormControl('', [Validators.required]),
    content_level: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    expiry_date: new FormControl(''),  
    status: new FormControl('', [Validators.required]),
    files:new FormControl(''),
    //fileSource: new FormControl('')
    });

    this.getMasterDropdown('categories');
    this.getMasterDropdown('sub_categories');
    this.getMasterDropdown('grade');
    // this.getMasterDropdown('tags');
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
  loadStatisticsChart(){
    let chart = new Chart({
      chart: {
        type: 'column',
        height: 250
      },
      title: {
        text: null
      },
     
       xAxis: {
        categories: [
            'Dec 2019',
            'Jan 2020',
            'Feb 2020',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'No.of Views'
        }
      //   labels: {
      //     format: '{value} k'
      // }
    },
      credits: {
        enabled: false
      },
      colors: ['#30ad07'],
      series: []
    });
    chart['options']['series']=[];
    chart['options']['series'][0]={
      name: 'No.of Views',
      data: [83, 78, 106]
    };
    this.chart = chart;
  }


  DeleteAttachments(data) {
    this._confirm.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'documents')
                    .set('id', data.document_id);   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
               this.first=0;
               this.getDigitalContentInfo(this.digitalContentId);
          }else{
            this._toast.show('error',JSON.parse(res.error));
          }
        });
      },
      reject: () => {}
    });
  }
  onFileSelect(event) {
    
    if (event.target.files.length > 0) {
      Object.keys(event.target.files).forEach( key => {
        if(this.fileTypes.indexOf(event.target.files[key].type)> -1){
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
      formData.append('digital_content_management_id',this.digitalContentId);
      formData.append('name', this.getName());
      formData.append('description', this.getDesc());
      formData.append('category', this.getCategory());
      formData.append('sub_category', this.getSubCategory());
      formData.append('expiry_date', this.datepipe.transform(this.getDate(), 'yyyy/MM/dd'));
      formData.append('status', this.getStatus());
      formData.append('tags', this.getTags());
      formData.append('grade', this.getGrade());
      formData.append('content_level', this.getContentLevel());
      for (var i = 0; i < this.fileArr.length; i++) { 
        formData.append("files["+i+"]", this.fileArr[i]);
      }
      this._service.addDigitalContent(formData).subscribe(res=>{
        if(res.status){
          this.submitted = true;
          this.getDigitalContentInfo(this.digitalContentObj.digital_content_management_id); 
          if(this.contentName === this.digitalForm.value.name){
          }else{}
        }
      });
      this.hideBasicDialog();
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  getDigitalContentInfo(digitalContentId){
    var params = new HttpParams()
               .set('digital_content_management_id',digitalContentId)
               .set('request_type','view');
    this._service.getDigitalContentInfo(params).subscribe(res => {
      if(res.status){
        this.digitalContentObj = res.data.data[0];
        this.documents =res.data.data[0].documents;      
      }
    });
  }
  getDigitalContentData(){
    var param = new HttpParams() 
            .set('digital_content_management_id',this.digitalContentId)
           .set('request_type','edit');
    this._service.getDigitalContentInfo(param).subscribe(res => {
      if(res.status){
        this.digitalContent = res.data.data[0];
        this.digitalForm.setValue({
          name : this.digitalContent.name,
          category : this.digitalContent.category,
          sub_category : this.digitalContent.sub_category,
          description : this.digitalContent.description ? this.digitalContent.description :'',
          grade : this.digitalContent.grade,
          content_level : this.digitalContent.content_level,
          tags: (this.digitalContent.tags)?this.digitalContent.tags.split(","):[],
          expiry_date : new Date(this.digitalContent.expiry_date),
          status : this.digitalContent.status,
          files:'',
          digital_content_management_id:''
        }); 
      }
    });
  }
 
  loadDigitalContentLazy(event: LazyLoadEvent) {
    var sortOrder= (event.sortOrder==1) ? "ASC" : "DESC";
    var params = new HttpParams()
      .set('start', event.first+'')
      .set('number', event.rows+'');
    if (event.sortField) {
      params = params.set('sort', event.sortField);
      params = params.set('order', sortOrder);
    }
    if (event.globalFilter) {
      params = params.set('search_key', event.globalFilter);
    }
  }
  isEmptyTable(){
    return (this.documents == 0 ? true : false);
  }
}
