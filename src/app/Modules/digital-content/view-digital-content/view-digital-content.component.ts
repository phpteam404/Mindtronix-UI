import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { ContentService } from 'src/app/services/content.service';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe} from '@angular/common';
import { environment } from 'src/environments/environment';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
declare var require:any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-view-digital-content',
  templateUrl: './view-digital-content.component.html',
  styleUrls: ['./view-digital-content.component.scss']
})
export class ViewDigitalContentComponent implements OnInit {

  categories:any =[];
  sub_categories:any =[];
  submitted=null;
  grade:any =[];
  contentLevel:any =[];
  status:any =[];
  fileArr:any = [];
  chart:Chart;
  contentName:any;
  minDate: Date = new Date();
  digitalForm:FormGroup;
  AttachmentForm:FormGroup;
  MappingForm:FormGroup;
  excludeList:any;
  editModal: boolean=false;
  viewModal:boolean =false;
  uploadAttachments:boolean=false;
  previewFile:boolean=false;
  previewURL:boolean=false;
  cols:any;
  digitalContentId:any;
  digitalContentObj:any={};
  digitalContent:any={};
  documents:any=[];
  franchise:any;
  schools:any;
  previewUrl:any;
  format:any;
  franchiseStatus:any;
  schoolStatus:any;
  mappingobj:any;
  maxSize = environment.maxUploadSize;
  prdAssetPath:string = environment.prdAssetPath;
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
              private fb: FormBuilder,
              private _schoolService:SchoolService,
              private _fService:FranchiseService,
              private _confirm: ConfirmationService,
              private _mservice:MasterService,
              private _cService: CommonService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    this.cols = [
      { field: 'attacheImg', header: 'Thumbnail' },
      { field: 'document_name', header: 'Name' },
      { field: 'action', header: 'Actions' }
    ];          
  }     
  updateContentModal(flag) {
    this.editModal = flag;
    if(this.editModal){
      this.digitalForm.reset();
      this.getDigitalContentInfo('edit');
    }
  }

  updateMappingModel(flag){
    this.viewModal = flag;
    if(this.viewModal){
      this.getDigitalContentMappingInfo();
     /* if(this.mappingobj.all_franchise ==1)
         this.MappingForm.value.franchise == true
      else
        this.MappingForm.value.franchise ==false;*/
    }
  }
  uploadAttachmentModal(flag) {
    this.uploadAttachments = flag;
    this.fileArr=[];
    if(flag) this.AttachmentForm.reset();
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.digitalContentId = atob(params['params'].id);
      this.contentName = (params['params'].name);
      this.getDigitalContentInfo('view');
    });
    this.loadStatisticsChart();

    this.digitalForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      sub_category: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      grade: new FormControl(''),
      content_level: new FormControl(''),
      tags: new FormControl('', [Validators.required]),
      expiry_date: new FormControl(''),  
      preUrl:new FormControl(''),
      postUrl:new FormControl(''),
      externalUrl:new FormControl(''),
      status: new FormControl('', [Validators.required])
    });
    this.AttachmentForm = new FormGroup({
      files:new FormControl(''),
    });
    this.MappingForm = this.fb.group({
      all_franchise: '',
      all_schools:'',
      exclude_franchise:new FormControl(''),
      exclude_school:new FormControl()
    });

    this.getMasterDropdown('categories');
    this.getMasterDropdown('sub_categories');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('content_level');
    this.getMasterDropdown('status');
    this.getFranchiseList();
    this.getSchoolsList();
    // const tag = document.createElement('script');
   // this.playVideo("XqZsoesa55w");
    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
  }
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true");
    return this._mservice.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'categories')
          this.categories =  res.data.data;
        if(masterKey == 'sub_categories')
          this.sub_categories =  res.data.data;
        if(masterKey == 'grade')
          this.grade = res.data.data;
        if(masterKey == 'content_level')
           this.contentLevel=res.data.data;
        if(masterKey == 'status'){
          this.status = res.data.data;
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  getFranchiseList(){
    this._fService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
        this.franchise = res.data.data;
      }
    });
  }
  getSchoolsList() {
    this._schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
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
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'documents')
                    .set('id', data.document_id);   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
               this.getDigitalContentInfo('view');
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
  getCategory() { return this.digitalForm.value.category.value;}
  getSubCategory() { return this.digitalForm.value.sub_category.value;}
  getContentLevel() { return this.digitalForm.value.content_level.value;}
  getGrade() { return this.digitalForm.value.grade.value;}
  getTags() { return this.digitalForm.value.tags;}
  getDate() { return this.digitalForm.value.expiry_date;}
  getStatus() { return this.digitalForm.value.status.value;}
  getName() { return this.digitalForm.value.name;}
  getDesc() { return this.digitalForm.value.description;}
  getPreUrl() { return this.digitalForm.value.preUrl;}
  getPostUrl() { return this.digitalForm.value.postUrl;}
  getExternalUrl() { return this.digitalForm.value.externalUrl;}

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
      formData.append('pre_url',this.getPreUrl());
      formData.append('post_url',this.getPostUrl());
      formData.append('external_urls',this.getExternalUrl());
      formData.append('content_level', this.getContentLevel());      
      this._service.addDigitalContent(formData).subscribe(res=>{
        if(res.status){
          this.submitted = true;
          this.getDigitalContentInfo('view'); 
          if(this.contentName === this.digitalForm.value.name){
          }else{}
        }
      });
      this.updateContentModal(false);
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  getDigitalContentInfo(mode:string){
    var params = new HttpParams()
               .set('digital_content_management_id',this.digitalContentId)
               .set('request_type',mode);
    this._service.getDigitalContentInfo(params).subscribe(res => {
      if(res.status){
        if(mode == 'view'){
          this.digitalContentObj = res.data.data[0];
          this.digitalContentObj.expiry_date = (this.digitalContentObj.expiry_date != '0000-00-00')?this.digitalContentObj.expiry_date:'';
          this.documents = res.data.data[0].documents;
          this.documents.forEach(item => {
            if(item.module_type=='url'){
              item.type = 'url';
              var vId = this.getVideoId(item.document_name);
              item.img = 'https://img.youtube.com/vi/'+vId+'/3.jpg';
            }
            else item.type = item.document_name.split('.').pop().toString().toLowerCase();
          });
        }else{
          this.digitalContent = res.data.data[0];
          this.digitalForm.setValue({
            name : this.digitalContent.name,
            category : this.digitalContent.category,
            sub_category : this.digitalContent.sub_category,
            description : this.digitalContent.description ? this.digitalContent.description :'',
            grade : this.digitalContent.grade,
            content_level : this.digitalContent.content_level,
            preUrl:this.digitalContent.pre_url ? this.digitalContent.pre_url :'',
            postUrl:this.digitalContent.post_url ? this.digitalContent.post_url : '',
            externalUrl : this.digitalContent.externalUrl ? this.digitalContent.externalUrl :'',
            tags: (this.digitalContent.tags)?this.digitalContent.tags.split(","):[],
            expiry_date : (this.digitalContent.expiry_date != '0000-00-00')?new Date(this.digitalContent.expiry_date):'',
            status : this.digitalContent.status
          });
        }
      }
    });
  }
  downloadPdf(url,name){
    FileSaver.saveAs(url, name);
  }  
  isEmptyTable(){
    return (this.documents.length == 0 ? true : false);
  }
  onSubmit(){
    this.submitted=false;
    if(this.AttachmentForm.valid && this.fileArr.length>0){
      const formData = new FormData();
      formData.append('digital_content_management_id',this.digitalContentId);
      if(Number(this.getUploadedFilesSize()) > Number(this.maxSize)){
        this._toast.show('warning','Maximum File upload size is 20 MB!');
        this.AttachmentForm.patchValue({
          files:''
        })
        return false;
      }
      for (var i = 0; i < this.fileArr.length; i++) { 
        formData.append("files["+i+"]", this.fileArr[i]);        
      }
      this._service.getDocuments(formData).subscribe(res=>{
        if(res.status){
          this.submitted = true;
          this.getDigitalContentInfo('view'); 
        }
      });
      this.uploadAttachmentModal(false);
    }else{
      this._toast.show('warning','Choose atleast one file!');
    }
  }
  YT : any;
  public player : any;
  reframed : Boolean = false;
  getVideoId(url){
    var regex = new RegExp(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/);
    var matches = regex.exec(url);
    var videoId = matches[5];
    return videoId;
  }
  closePreview(){
    var ele = document.getElementById("tube");
    var ele2 = document.getElementById("tube1");
    if(ele2) ele2.remove();
    if(ele) ele.remove();
  }
  previewAttachment(data:any){    
    if(data.module_type == 'url'){
      var videoId = this.getVideoId(data.document_name); // kJ9g_-p3dLA
      this.previewUrl = '';
      this.previewUrl = videoId;
      this.format = data.module_type.toString().toLowerCase();
      this.previewURL = true;
      this.loadPlayerWithId();
    }
    else{
      this.previewUrl = data.document_url;
      this.previewFile = true;
      this.format = data.type.toString().toLowerCase();
    } 
  } 
  /* youtube plyer code starts*/
  loadPlayerWithId(){
    var tag;
    var ele = document.getElementById("tube");
    var ele2 = document.getElementById("tube1");
    if(ele2) ele2.remove();
    if(ele) ele.remove();
    else{
      tag = document.createElement('script');
      tag.id = "tube";
      tag.src = "https://www.youtube.com/iframe_api";
    } 
    if(tag == undefined){       
      tag = document.createElement('script');
      tag.id = "tube1";
      tag.src = "https://www.youtube.com/iframe_api";
    }
    document.body.append(tag);
    window['onYouTubeIframeAPIReady'] = () => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.previewUrl,
        playerVars: {
          autoplay:0,
          modestbranding: 1,
          controls: 1,
          start: 0,
          disablekb: 0,
          rel : 0,
          showinfo: 0,
          fs: 0,
          playsinline: 1
        },
        events: {
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              console.log('---5---',e);
              this.reframed = true;
              e.target.loadVideoById(this.previewUrl,0,'default');
              setTimeout (() => {
                this.startVideo(this.previewUrl);
              },100);
            }
          }
        }
      });
    };
  }
  startVideo(val){
    this.YT = window['YT'];
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.previewUrl,
      playerVars: {
        autoplay:0,
        modestbranding: 1,
        controls: 0,
        disablekb: 0,
        rel : 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events:{
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          if (!this.reframed) {
            this.reframed = true;
            e.target.loadVideoById(this.previewUrl,0,'default');
          }
        }
        // 'onReady' : this.onPlayerReady.bind(this),
      }
    });
  }
  onPlayerReady(event){
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    console.log('---8---',event);    
  };
  cleanTime(){
    console.log('---9---');
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError(event){
    switch(event.data){
      case 2:
        console.log('', this.previewURL);
      break;
      case 100:
        break;
      case 150 || 101:
        break;
    }
  }
  /* youtube plyer code ends*/
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
  deleteSelectedFile(indx){
    this.fileArr.splice(indx, 1);
    this.AttachmentForm.patchValue({
      files:''
    })
  }

  submitMapping() {
    this.submitted = false;
    if (this.MappingForm.valid) {
      var params ={};
      var lc = [];
      var school =[];
      if(this.MappingForm.value.exclude_franchise){
        this.MappingForm.value.exclude_franchise.forEach(item => {
          lc.push(item.value);
        });
      }
      if(this.MappingForm.value.exclude_school){
        this.MappingForm.value.exclude_school.forEach(item => {
          school.push(item.value);
        });
      } 
      params['content_id'] =Number(this.digitalContentId);
      params['all_franchise'] =(this.MappingForm.value.all_franchise)?1:0;
      params['all_schools']=(this.MappingForm.value.all_schools)?1:0;
      params['exclude_franchise'] = lc.toString();
      params['exclude_school'] =school.toString();
      this._service.MapDigitalContent(params).subscribe(res =>{
        if(res.status){
           this.updateMappingModel(false);
           this.getDigitalContentMappingInfo();
        }
      });
    } 
  }

  getDigitalContentMappingInfo(){
    var params =new HttpParams()
                .set('content_id',this.digitalContentId);
    this._service.viewDigitalContentMapping(params).subscribe(res =>{
      this.mappingobj = res.data[0];
      var schoolArr=[],franchiseArr=[];
      var selectedFranchise = [];
      selectedFranchise = (this.mappingobj.exclude_franchise)? this.mappingobj.exclude_franchise.split(',') : '';
      var selectedSchool = [];
      selectedSchool = (this.mappingobj.exclude_school)? this.mappingobj.exclude_school.split(',') : '';
      this.franchise.forEach(item=>{
        if(selectedFranchise.includes(item.value.toString())){
          franchiseArr.push(item);
        }
      })
      this.schools.forEach(item =>{
        if(selectedSchool.includes(item.value.toString())){
          schoolArr.push(item);
        }
      })
      this.MappingForm.setValue({
        all_schools: (this.mappingobj.all_schools ==1)? true:false,
        all_franchise: (this.mappingobj.all_franchise ==1)? true:false,
        exclude_franchise : franchiseArr,
        exclude_school : schoolArr
      });
    })
  }

  donwloadQrCode(){
    FileSaver.saveAs(this.digitalContentObj.qr_code, this.digitalContentObj.content_name);
  }
}
