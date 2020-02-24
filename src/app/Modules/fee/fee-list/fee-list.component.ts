import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss']
})
export class FeeListComponent implements OnInit {

  list: any;
  cols:any;
  constructor(private router: Router, private _route: ActivatedRoute) {
   
    this.list = [
      {name:'1 (One Month)', amount:2500, term:'Monthly',discount:10, status:'Active',actions:''},
      {name:'3 (Three Months)', amount:6000, term:'Quarterly',discount:15, status:'Active',actions:''},
      {name:'6 (Six Months)', amount:11000, term:'Half Yearly',discount:20, status:'Active',actions:''},
      {name:'12 (Twelve Months)', amount:20500, term:'Yearly',discount:25, status:'Inactive',actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
  }
  ngOnInit(): void {
  }

  addNewFee(event: Event){
    this.router.navigate(['add'],{relativeTo: this._route});
  }
}
