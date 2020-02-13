import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'src/app/services/franchise.service';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
  constructor(private franchise: FranchiseService) {

    this.cities = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];
  this.cars = [
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'},
    {vin:'dsad231ff', year:2000, brand:'Audi', color:'red'},
    {vin:'greg34', year:2000, brand:'Bmw', color:'blue'}
];
this.cols = [
  { field: 'vin', header: 'Vin' },
  { field: 'year', header: 'Year' },
  { field: 'brand', header: 'Brand' },
  { field: 'color', header: 'Color' }
];
   }

  ngOnInit(): void {
    //this.getList();
  }

  getList(){
    this.franchise.getList({}).subscribe(res=>{
      if(res.status){
        console.log('res====>>>>', res);
      }
    })
  }

}
