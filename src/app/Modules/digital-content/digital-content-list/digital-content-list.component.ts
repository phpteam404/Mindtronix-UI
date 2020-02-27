import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digital-content-list',
  templateUrl: './digital-content-list.component.html',
  styleUrls: ['./digital-content-list.component.scss']
})
export class DigitalContentListComponent implements OnInit {
  list: any;
  cols:any;
  constructor(private _router: Router, private _ar: ActivatedRoute) {
    this.list = [
      {name:'Electric Kit', grade:'X', category:'Science Product', subCategory:'Students Science Kits',level:'Medium', views:10,actions:''},
      {name:'Optic Kit', grade:'IX', category:'Science Product', subCategory:'Students Science Kits',level:'Advanced', views:4,actions:''},
      {name:'Electric Kit', grade:'VII', category:'Science Product', subCategory:'Students Science Kits',level:'Medium', views:7,actions:''},
      {name:'Electric Kit', grade:'V', category:'Science Product', subCategory:'Students Science Kits',level:'Medium', views:5,actions:''}
    ];
    this.cols = [
      { field: 'name', header: 'Content Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'category', header: 'Category' },
      { field: 'subCategory', header: 'Sub Category' },
      { field: 'level', header: 'Level' },
      { field: 'views', header: 'No.of Views' },
      { field: 'actions', header: 'Actions' }
    ];
   }

  ngOnInit(): void {
  }
  addNewContent(event: Event){
    this._router.navigate(['add'],{relativeTo:this._ar});
  }

}
