import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  list: any;
  cols:any;
  display: boolean = false;

  constructor(private router: Router, private _route: ActivatedRoute) {
    this.list = [
      {name:'1 (One Month)', price:'$24.95', offer_type:'FREE SHIP',discount:'Save $9.95/mo', actions:''},
      {name:'3 (Three Months)', price:'$60.00', offer_type:'FREE SHIP',discount:'Save $29.70/mo', actions:''},
      {name:'6 (Six Months)', price:'$110.00', offer_type:'FREE SHIP',discount:'Save $69.40/mo', actions:''},
      {name:'12 (Twelve Months)', price:'$205.00', offer_type:'FREE SHIP',discount:'Save $153.80/mo', actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Name'},
      { field: 'price', header: 'Price'},
      { field: 'offer_type', header: 'Offer Type'},
      { field: 'discount', header: 'Discount'},
      { field: 'actions', header: 'Actions'}
    ];
  }
  
  ngOnInit(): void {}
  addNewCategory() {
      this.display = true;
  }
  
}

