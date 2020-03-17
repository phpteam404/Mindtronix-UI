import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { TicketService} from 'src/app/services/ticket.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  status: any;
  displayBasic: boolean;
  ticketId:any;
  ticketName:any;
  documents:any=[];
  ticketObj:any=[];
  chatHistory:any;
  prdAssetPath:string = environment.prdAssetPath;

  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              public datepipe: DatePipe,
              public translate: TranslateService,
              private _mService:MasterService,
              private _tService:TicketService) {
                translate.setDefaultLang(environment.defaultLanguage); 


    this.status = [
      {label:'New',value:{id:1,name:'New'}},
      {label:'Inprogress',value:{id:2,name:'Inprogress'}},
      {label:'Closed',value:{id:1,name:'Closed'}}
    ];
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
       this.ticketId = atob(params['params'].id);
       this.ticketName = (params['params'].name);
       this.getTicketInfo(this.ticketId);
      // this.getDigitalContentData();
    });
  }

  getTicketInfo(ticketId){
    var params = new HttpParams().set('ticket_id',ticketId);
    this._tService.getTicketInfo(params).subscribe(res => {
      if(res.status){
        this.ticketObj = res.data.ticket_data;
        this.documents =res.data.ticket_data.documents; 
        this.chatHistory = res.data.chat_history;  
      }
    });
  }

}
