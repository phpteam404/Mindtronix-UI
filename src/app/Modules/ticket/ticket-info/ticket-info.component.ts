import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams} from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/services/ticket.service'; 
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  issue: any;
  fileArr:any = [];
  ticketIssue:any;
  submitted=null;
  maxSize = environment.maxUploadSize;
  fileTypes = ["image/jpeg","image/png","video/mp4","video/quicktime"];
  constructor(private _router: Router, 
              private _toast: ToasterService,
              private _tService:TicketService,
              private _mService:MasterService,
              public translate: TranslateService) {
      translate.setDefaultLang(environment.defaultLanguage);
   }

  ngOnInit(): void {
    this.getMasterDropdown('ticket_issue_type')
  }
  ticketForm  = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required]),
    files:new FormControl(''),
    issue_type: new FormControl('',[Validators.required])
  });

  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('type','all')
                  .set('dropdown',"true")
    return this._mService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'ticket_issue_type')
          this.ticketIssue =  res.data.data;
      }
    });
  }  
  getTitle() { return this.ticketForm.value.title;}
  getDescription() { return this.ticketForm.value.description;}
  getIssueType() { return this.ticketForm.value.issue_type.value;}

  submit(){
    this.submitted=false;
    if(this.ticketForm.valid){   
      console.log('ticket info',this.ticketForm.value);
        const formData = new FormData();
        formData.append('title', this.getTitle());
        formData.append('description', this.getDescription());
        formData.append('issue', this.getIssueType());
        if(Number(this.getUploadedFilesSize()) > Number(this.maxSize)){
          this._toast.show('warning','Maximum File upload size is 20 MB!');
          this.ticketForm.patchValue({
            files:''
          })
          return false;
        }
        for (var i = 0; i < this.fileArr.length; i++) { 
          formData.append("files["+i+"]", this.fileArr[i]);
        }
        this._tService.addTicket(formData).subscribe(res =>{
          if(res.status){
              this.submitted=true;
              this.goToList();
          }
        });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['ticket']);
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
          this.ticketForm.patchValue({
            files:''
          })
          return false;
        }
      });
    }
  }
  deleteSelectedFile(indx){
    this.fileArr.splice(indx, 1);
    this.ticketForm.patchValue({
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
