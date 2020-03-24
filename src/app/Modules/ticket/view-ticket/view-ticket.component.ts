import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { TicketService} from 'src/app/services/ticket.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  status: any;
  viewModal: boolean;
  ticketId:any;
  ticketName:any;
  documents:any=[];
  ticketObj:any=[];
  fileArr:any=[];
  chatHistory:any;
  prdAssetPath:string = environment.prdAssetPath;
  submitted=null;
  fileTypes = ["image/jpeg","image/png"];
  maxSize = environment.maxUploadSize; 
  previewFile:boolean =false;
  isClosed:boolean =false;
  preview:any;
  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              public _toast: ToasterService,
              public datepipe: DatePipe,
              public translate: TranslateService,
              private _mService:MasterService,
              private _tService:TicketService) {
    translate.setDefaultLang(environment.defaultLanguage); 
  }
  updateTicketModal(flag) {
    this.viewModal = flag;
    this.updateForm.reset();
    this.fileArr=[];
    this.updateForm.setValue({
      status: this.ticketObj.status_display,
      comments:'',
      files:''
    });
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
       this.ticketId = atob(params['params'].id);
       this.ticketName = (params['params'].name);
       this.getTicketInfo(this.ticketId);
      this.getMasterDropdown('ticket_status');
    });
  }
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('ticket_id',this.ticketId)
                  .set('dropdown',"true")
    return this._mService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'ticket_status')
          this.status =  res.data.data;
      }
    });
  }  
  updateForm  = new FormGroup({
    status: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
    files:new FormControl('')
  });

  getTicketInfo(ticketId){
    var params = new HttpParams().set('ticket_id',ticketId);
    this._tService.getTicketInfo(params).subscribe(res => {
      if(res.status){
        this.ticketObj = res.data.ticket_data;
        if(this.ticketObj.status=='Close'){
          this.isClosed = true;
          this.ticketObj.status_display = {label: "Re Open",value: 49};
        }else this.isClosed = false;
        console.log('isClosed', this.isClosed);
        this.documents =res.data.ticket_data.documents; 
        this.chatHistory = res.data.chat_history;  
        console.log('this.status', this.status);        
      }
    });
  }
  getStatus() { return this.updateForm.value.status.value;}
  updateTicket(){
    this.submitted=false;
    if(this.updateForm.valid){
      this.submitted=true;
      console.log('form val', this.updateForm.value);
      const formData = new FormData();
      formData.append('ticket_id', this.ticketId);
      formData.append('ticket_status', this.getStatus());
      formData.append('message', this.updateForm.value.comments);
      if(Number(this.getUploadedFilesSize()) > Number(this.maxSize)){
        this._toast.show('warning','Maximum File upload size is 20 MB!');
        this.updateForm.patchValue({
          files:''
        })
        return false;
      }
      for (var i = 0; i < this.fileArr.length; i++) { 
        formData.append("files["+i+"]", this.fileArr[i]);
      }
      this._tService.updateTicketStatus(formData).subscribe(res =>{
        if(res.status){
            this.submitted=true;
            this.updateTicketModal(false);
            this.getTicketInfo(this.ticketId);
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
  onFileSelect(event){
    if (event.target.files.length > 0) {
      Object.keys(event.target.files).forEach( key => {        
        if(this.fileTypes.indexOf(event.target.files[key].type)> -1){
          event.target.files[key].sizeVal = this.bytesToSize(event.target.files[key].size);        
          this.fileArr.push(event.target.files[key]);
        }
        else {
          this._toast.show('warning','No file uploaded or invalid file type!');
          this.updateForm.patchValue({
            files:''
          })
          return false;
        }
      });     
    }
  }
  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = Number(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)));
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }
  getUploadedFilesSize(){
    var size=0;
    this.fileArr.forEach(item => { 
      if(item)
        size+=item.size;
    });
    return size;
  }
  deleteSelectedFile(indx){
    this.fileArr.splice(indx, 1);
    this.updateForm.patchValue({
      files:''
    })
  }
  previewAttachment(data:any){
    this.previewFile =true;
    this.preview =data.document_url;
  }
}
