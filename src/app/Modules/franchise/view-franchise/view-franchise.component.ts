import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-franchise',
  templateUrl: './view-franchise.component.html',
  styleUrls: ['./view-franchise.component.scss']
})
export class ViewFranchiseComponent implements OnInit {
  students: any;
  cols:any;
  constructor(private route: ActivatedRoute) {
    this.students = [
      {name:'Tom Smith', phone:'9789456556',title:'Admin'},
      {name:'sample data', phone:'7774564556',title:'Site Admin'},
      {name:'abc data', phone:'7894555556',title:'Super Admin'},
      {name:'test data', phone:'7894444556',title:'Admin'},
      {name:'master data', phone:'7894563336',title:'Admin'},
      
    ];
    this.cols = [
      { field: 'title', header: 'Contact Title' },
      { field: 'name', header: 'Contact Name' },
      { field: 'phone', header: 'Contact Phone' }
    ]
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('params---', params);
    });
  }

}
