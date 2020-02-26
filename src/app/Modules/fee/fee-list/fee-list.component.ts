import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss']
})
export class FeeListComponent implements OnInit {

  list: any;
  cols:any;
  constructor(private router: Router,
             private _route: ActivatedRoute,
             private _serice: FeeService,
             private _toast: ToasterService) {
   
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
    this.getList();
  }

  getList(){
    this._serice.getList({}).subscribe(res=>{
      if(res.status){
        this.list=res.data;
      }else{
       this._toast.show('error',res.error);
      }
    });
  }

  addNewFee(event: Event){
    this.router.navigate(['add'],{relativeTo: this._route});
  }

  UpdateFee(data:any){
    this.router.navigate(['update/'+ btoa(data.fee_master_id)],{relativeTo: this._route})
  }
}
