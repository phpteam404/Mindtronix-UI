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
      {date:'1-02-2020', title:'Kit Not Working', created_by:'Sanjay', status:'Open',last_update:'1-02-2020'},
      {date:'7-02-2020', title:'User Manual Missing', created_by:'Krish', status:'Open',last_update:'7-02-2020'},
      {date:'2-02-2020', title:'Missing Components', created_by:'Arjun', status:'Pending',last_update:'2-02-2020'},
      {date:'4-02-2020', title:'Want to Return', created_by:'Darma', status:'Open',last_update:'4-02-2020'},
      {date:'12-02-2020', title:'Unable to Use', created_by:'Bheem', status:'Open',last_update:'12-02-2020'},
      {date:'5-02-2020', title:'Need an Exchange', created_by:'Nikil', status:'Pending',last_update:'5-02-2020'},
      {date:'6-02-2020', title:'Unable to Use', created_by:'Sahadev', status:'Open',last_update:'6-02-2020'},
      {date:'8-02-2020', title:'Kit Not Working', created_by:'Vyas', status:'Open',last_update:'8-02-2020'},
      {date:'9-02-2020', title:'Damaged Kit Received', created_by:'Ganesh', status:'Closed',last_update:'9-02-2020'},
      {date:'10-02-2020', title:'Want to Return', created_by:'Duryodan', status:'Open',last_update:'10-02-2020'},
      {date:'11-02-2020', title:'Need an Exchange', created_by:'Karan', status:'Open',last_update:'11-02-2020'},
      {date:'13-02-2020', title:'User Manual Missing', created_by:'Drone', status:'Open',last_update:'13-02-2020'},
      {date:'3-02-2020', title:'Damaged Kit Received', created_by:'Drupad', status:'Open',last_update:'3-02-2020'},
      {date:'14-02-2020', title:'Unable to Use', created_by:'Beeshm', status:'Open',last_update:'14-02-2020'},
      {date:'15-02-2020', title:'Want to Return', created_by:'Gandhi', status:'Open',last_update:'15-02-2020'},
      {date:'16-02-2020', title:'Need an Exchange', created_by:'Druta', status:'Open',last_update:'16-02-2020'},
      {date:'17-02-2020', title:'Unable to Use', created_by:'Dushya', status:'Open',last_update:'17-02-2020'},
      {date:'18-02-2020', title:'Damaged Kit Received', created_by:'Balram', status:'Open',last_update:'18-02-2020'}
    ];
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'title', header: 'Issue' },
      { field: 'created_by', header: 'Created By' },
      { field: 'status', header: 'Status' },
      { field: 'last_update', header: 'Last Update' }
    ];
  }
  ngOnInit(): void {
    //this.getList();
   console.log('getList');
  }

  AddNewTicket(event: Event){
    this.router.navigate(['info'], {relativeTo: this._route});
  }
}
