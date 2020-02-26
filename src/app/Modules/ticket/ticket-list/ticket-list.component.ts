import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {issueId:'#MI000001', type:'Kit Related', date:'01-02-2020', title:'Kit Not Working', created_by:'Sanjay', status:'Open',last_update:'01-02-2020'},
      {issueId:'#MI000002', type:'Software Related', date:'07-02-2020', title:'User Manual Missing', created_by:'Krish', status:'Open',last_update:'07-02-2020'},
      {issueId:'#MI000003', type:'Kit Related', date:'02-02-2020', title:'Missing Components', created_by:'Arjun', status:'Pending',last_update:'02-02-2020'},
      {issueId:'#MI000004', type:'Kit Related', date:'04-02-2020', title:'Want to Return', created_by:'Darma', status:'Open',last_update:'04-02-2020'},
      {issueId:'#MI000005', type:'Kit Related', date:'05-02-2020', title:'Need an Exchange', created_by:'Nikil', status:'Pending',last_update:'05-02-2020'},
      {issueId:'#MI000006', type:'Software Related', date:'06-02-2020', title:'Unable to Use', created_by:'Sahadev', status:'Open',last_update:'06-02-2020'},
      {issueId:'#MI000007', type:'Software Related', date:'08-02-2020', title:'Kit Not Working', created_by:'Vyas', status:'Open',last_update:'08-02-2020'},
      {issueId:'#MI000008', type:'Kit Related', date:'09-02-2020', title:'Damaged Kit Received', created_by:'Ganesh', status:'Closed',last_update:'09-02-2020'},
      {issueId:'#MI000009', type:'Software Related', date:'12-02-2020', title:'Unable to Use', created_by:'Bheem', status:'Open',last_update:'12-02-2020'},
      {issueId:'#MI000010', type:'Kit Related', date:'10-02-2020', title:'Want to Return', created_by:'Duryodan', status:'Open',last_update:'10-02-2020'},
      {issueId:'#MI000011', type:'Software Related', date:'11-02-2020', title:'Need an Exchange', created_by:'Karan', status:'Open',last_update:'11-02-2020'},
      {issueId:'#MI000012', type:'Kit Related', date:'13-02-2020', title:'User Manual Missing', created_by:'Drone', status:'Open',last_update:'13-02-2020'},
      {issueId:'#MI000013', type:'Software Related', date:'03-02-2020', title:'Damaged Kit Received', created_by:'Drupad', status:'Open',last_update:'03-02-2020'},
      {issueId:'#MI000014', type:'Kit Related', date:'14-02-2020', title:'Unable to Use', created_by:'Beeshm', status:'Open',last_update:'14-02-2020'},
      {issueId:'#MI000015', type:'Software Related', date:'15-02-2020', title:'Want to Return', created_by:'Gandhi', status:'Open',last_update:'15-02-2020'},
      {issueId:'#MI000016', type:'Kit Related', date:'16-02-2020', title:'Need an Exchange', created_by:'Druta', status:'Open',last_update:'16-02-2020'},
      {issueId:'#MI000017', type:'Software Related', date:'17-02-2020', title:'Unable to Use', created_by:'Dushya', status:'Open',last_update:'17-02-2020'},
      {issueId:'#MI000018', type:'Software Related', date:'18-02-2020', title:'Damaged Kit Received', created_by:'Balram', status:'Open',last_update:'18-02-2020'}
    ];
    this.cols = [
      
      { field: 'issueId', header: 'Issue ID' },
      { field: 'title', header: 'Issue Title' },
      { field: 'type', header: 'Issue Type' },
      { field: 'created_by', header: 'Created By' },
      { field: 'date', header: 'Created Date' },
      { field: 'status', header: 'Status' }
    ];
  }
  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }

  AddNewTicket(event: Event){
    this.router.navigate(['info'], {relativeTo: this._route});
  }

  viewTicket(data:any){
    this.router.navigate(['view/'+btoa(data.issueId)], {relativeTo: this._route});
  }
}
