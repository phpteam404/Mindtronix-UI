import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  status: any;
  displayBasic: boolean;
  prdAssetPath:string = environment.prdAssetPath;
  constructor() { 
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
  }

}
