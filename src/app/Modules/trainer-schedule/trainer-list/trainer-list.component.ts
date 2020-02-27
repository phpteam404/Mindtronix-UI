import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  totalRecords: number;
  cols: any[];
  // loading: boolean;
  trainers:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
    this.trainers = [
      {id:1,topic:'Gesture Controlled Robot', time:'10:00 AM',totime:'12:00 AM', date:'27-02-2020'},
      {id:2,topic:'Edge Detection Robot', time:'11:00 AM',totime:'12:30 PM', date:'28-02-2020'},
      {id:3,topic:'Fire Fighting Robot', time:'10:30 AM',totime:'11:00 AM', date:'29-02-2020'},
      {id:4,topic:'Mobile Controlled Robot', time:'11:15 AM',totime:'12:00 AM', date:'01-03-2020'},
      {id:5,topic:'Line Follower Robot', time:'10:45 AM',totime:'11:45 AM', date:'02-03-2020'},
      {id:6,topic:'Gesture Controlled Robot', time:'02:00 PM',totime:'03:00 PM', date:'03-03-2020'},
      {id:7,topic:'Fire Fighting Robot', time:'12:00 AM',totime:'02:00 PM', date:'04-03-2020'},
      {id:8,topic:'Line Follower Robot', time:'03:00 PM',totime:'05:00 PM', date:'05-03-2020'},
    ];
    this.cols = [
      { field: 'topic', header: 'Topic' },
      { field: 'date', header: 'Date' },
      { field: 'time', header: 'From Time' },
      { field: 'totime', header: 'To Time' },
      { field: 'actions', header: 'Actions' }
    ];
   }

  ngOnInit(): void {
  }

  addNewSchedule(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditSchedule(data:any){
    this.router.navigate(['update/'+btoa(data.id)],{ relativeTo: this._route});
  }
}
