import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-other-master',
  templateUrl: './other-master.component.html',
  styleUrls: ['./other-master.component.scss']
})
export class OtherMasterComponent implements OnInit {
  cities: any;
  cars: any;
  cols:any;
  cities2: City[];
  selectedCities2: City[];
  displayBasic: boolean;
  name = 'Grade';
  description = 'Grade';
  constructor(private router: Router, private _route: ActivatedRoute) { 
    
    this.cars = [
      {name:'Electronics', description:'Electronics description', action:''},
      {name:'Physics', description:'Physics description', action:''},
      {name:'Chemistry', description:'Chemistry description', action:''},
      {name:'Robotics', description:'Robotics Description', action:''}
    ];
    this.cols = [
      { field: 'name', header: 'Master Name' },
      { field: 'description', header: 'Master Description' },
      { field: 'action', header: 'Actions' }
    ];
    //An array of cities
    this.cities2 = [
      {name: 'Grade', code: 'GRD'},
      {name: 'Category', code: 'CT'},
      {name: 'Sub-Category', code: 'SCT'},
      {name: 'Tag', code: 'Tg'},
      {name: 'Content-Level', code: 'CL'}
  ];
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  ChangeModelLable(event) {
    this.name = event.value.name;
    this.description = event.value.name;
    // console.log('event.value', event.value);
  }
  AddMaster(event: Event){
    console.log('Adding Master');
  }
  ngOnInit(): void {
  }

}
