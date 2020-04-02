import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';
import { ContentService } from 'src/app/services/content.service';
import { LazyLoadEvent,ConfirmationService } from 'primeng/api';
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
  cols:any;
  schoolCheck:boolean;
  lcCheck:boolean;
  digitalContentId:any;
  digitalContentObj:any={};
  digitalContent:any={};
  documents:any=[];
  franchise:any;
  schools:any;
  schoolchecked:any;
  lcCheckInfo:any;
  previewUrl:any;
  format:any;
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
      this.lcCheckInfo =false;
      this.schoolchecked=false;
      this.MappingForm.reset();
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
    this.MappingForm = new FormGroup({
      allow_lc:new FormControl(''),
      allow_school:new FormControl(''),
      exclude_lc:new FormControl(''),
      exclude_school:new FormControl('')
    });

    this.getMasterDropdown('categories');
    this.getMasterDropdown('sub_categories');
    this.getMasterDropdown('grade');
    this.getMasterDropdown('content_level');
    this.getMasterDropdown('status');
    this.getFranchiseList();
    this.getSchoolsList();
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
  video : any;
  player : any;
  reframed : Boolean = false;
  loadVideo : boolean = false;
  getVideoId(url){
    var regex = new RegExp(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/);
    var matches = regex.exec(url);
    // console.log(matches);
    var videoId = matches[5];
    return videoId;
  }
  closePreview(){
    console.log("******closed");
    //window['onYouTubeIframeAPIReady'] = () => {};
    //window['ÝT'] = undefined;
    this.onPlayerStateChange({'target': 'Y', 'data': 2});
    //document.getElementById( 'player' ).innerHTML='';
     var ele = document.getElementById('player');
     ele.remove();
  }
  previewAttachment(data:any){
    console.log('attachments info',data);
    this.previewFile =true;
    this.previewUrl =data.document_url;
    if(data.module_type == 'url'){
      var videoId = this.getVideoId(data.document_name); // kJ9g_-p3dLA
      this.previewUrl = videoId;
      this.format = data.module_type.toString().toLowerCase();
      this.video = '';
      this.video = this.previewUrl;
     /* if(window['YT']){
        console.log('---1---');
        if(this.player.loadVideoById){
          this.player.loadVideoById(this.video, 0, "default");
          this.startVideo(this.video);
          console.log('---12---');
        } else {
          this.loadPlayerWithId();
          this.startVideo(this.video);
          console.log('---22---');
        }
        console.log('---2---');
      }else */{
        console.log('---3---');
        this.loadPlayerWithId();
      }
      
      // document.body.appendChild(tag);
    }     
    else this.format = data.type.toString().toLowerCase();
  } 
  /* youtube plyer code starts*/
  loadPlayerWithId(){
    setTimeout (() => {
      this.loadVideo = true;
      var tag = document.createElement('script');
      tag.id = "tube";
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      console.log('---4---');
      window['onYouTubeIframeAPIReady'] = () => {
        this.YT = window['YT'];
        this.reframed = false;
        this.player = new window['YT'].Player('player', {
          videoId: this.previewUrl,
          playerVars: {
            autoplay:0,
          },
          events: {
            'onError': this.onPlayerError.bind(this),
            'onReady': (e) => {
              if (!this.reframed) {
                console.log('---5---');
                this.reframed = true;                
                e.target.loadVideoById(this.previewUrl,0,'default');
                this.startVideo(this.previewUrl);
              // reframe(e.target.a);
              }
            }
          }
        });
      };
    },100);
    //window['onYouTubeIframeAPIReady'] = () => this.startVideo(null);
  }
  startVideo(val){
    setTimeout (() => {
      console.log('---6---');
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: (val)?this.previewUrl:this.video,
        playerVars: {
          autoplay:0,
          modestbranding: 0,
          controls: 0,
          disablekb: 0,
          rel: 0,
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
    },500);
  }
  onPlayerReady(event){
    console.log('---7---');
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    console.log('---8---');
    console.log(event)
    /*switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };*/
  };
  cleanTime(){
    console.log('---9---');
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError(event){
    switch(event.data){
      case 2:
        console.log('', this.video);
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
      //console.log('mapping info',this.MappingForm.value);
      var params ={};
      var lc = [];
      var school =[];
      if(this.MappingForm.value.exclude_lc){
        this.MappingForm.value.exclude_lc.forEach(item => {
          lc.push(item.value);
        });
      }
      if(this.MappingForm.value.exclude_school){
        this.MappingForm.value.exclude_school.forEach(item => {
          school.push(item.value);
        });
      }
      params['allow_lc'] =this.lcCheckInfo;
      params['allow_school']=this.schoolchecked;
      params['exclude_lc'] = lc.toString();
      params['exclude_school'] =school.toString();
      console.log('params info',params);
    } 
  }

  schoolChecked(event, control) {
   if(control.checked ==true)
    this.schoolchecked =1;
    else
    this.schoolchecked=0;
 }
 lcChecked(event,control){
   if(control.checked ==true)
    this.lcCheckInfo = 1;
  else
   this.lcCheckInfo=0;
 }
}
