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
  constructor(private _router: Router, 
              private _toast: ToasterService,
              private _tService:TicketService,
              private _mService:MasterService,
              public translate: TranslateService) {
                translate.setDefaultLang(environment.defaultLanguage);

    // this.issue = [
    //   {label:'Kit Related',value:{id:1,name:'Kit Related'}},
    //   {label:'Software Related',value:{id:2,name:'Software Related'}},
    //   {label:'Others',value:{id:1,name:'Others'}}
    // ]; 
   }

  ngOnInit(): void {
    this.getMasterDropdown('ticket_issue_type')
  }
  ticketForm  = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    files:new FormControl(''),
    fileSource: new FormControl(),
    issue_type: new FormControl('',[Validators.required])
  });


  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this._mService.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'ticket_issue_type')
          this.ticketIssue =  res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  // submit(): any {
  //   this.submitted = false;
  //   if (this.ticketForm.valid) {
  //     console.log('ticket info',this.ticketForm.value);
  //     var params={};
  //     params = this.ticketForm.value;
  //     params['issue'] =this.ticketForm.value.issue_type.value;
  //     this._tService.addTicket(params).subscribe(res => {
  //       if (res.status) {
  //         this.submitted = true;
  //         this._router.navigate(['ticket']);
  //       }else{
  //         this._toast.show('error',JSON.parse(res.error));
  //       }
  //     });
  //   }else{
  //     this._toast.show('warning','Please enter mandatory fields.');
  //   }
  // }
  
  getTitle() { return this.ticketForm.value.title;}
  getDescription() { return this.ticketForm.value.description;}
  getIssueType() { return this.ticketForm.value.issue_type.value;}

   submit(){
    this.submitted=false;
    if(this.ticketForm.valid){        
        const formData = new FormData();
        formData.append('title', this.getTitle());
        formData.append('description', this.getDescription());
        formData.append('issue', this.getIssueType());
        for (var i = 0; i < this.fileArr.length; i++) { 
          formData.append("files["+i+"]", this.fileArr[i]);
        }
        console.log('formData--', formData);
        this._tService.addTicket(formData).subscribe(res =>{
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
  goToList(){
    this._router.navigate(['ticket']);
  }
  onUploadClicked(event: Event){
    console.log('event--', event);
  }
  onSelectedFilesChanged(event: Event){
    console.log('event--', event);
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      Object.keys(event.target.files).forEach( key => {
        this.fileArr.push(event.target.files[key]);
      });
      this.ticketForm.patchValue({
        fileSource: this.fileArr
      });
    }
  }
}
