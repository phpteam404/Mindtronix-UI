import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-digital-content',
  templateUrl: './view-digital-content.component.html',
  styleUrls: ['./view-digital-content.component.scss']
})
export class ViewDigitalContentComponent implements OnInit {

  prdAssetPath:string = environment.prdAssetPath;
  category:any =[];
  subCategory:any =[];
  grade:any =[];
  level:any =[];
  tags:any =[];
  status:any =[];
  displayBasic3: boolean;
  chart:Chart;

  constructor() { 
    this.category= [
      {label: "Science Product", value:"Science Product"},
      {label: "Electric", value:"Electric"},
      {label: "Robot", value:"Robot"}
    ];
    this.subCategory =[
      {label:'Students Science Kits',value:'Students Science Kits'},
      {label:'Robot Management',value:'Robot Management'}
    ];
    this.grade =[
      {label:'V',value:'V'},
      {label:'VI',value:'VI'},
      {label:'VII',value:'VII'},
      {label:'VIII',value:'VIII'},
      {label:'IX',value:'IX'},
      {label:'X',value:'X'}
    ];
    this.level =[
      {label:'Low',value:'Low'},
      {label:'Medium',value:'Medium'},
      {label:'Advanced',value:'Advanced'}
    ];
    this.tags =[
      {label:'Circuit',value:'Circuit'},
      {label:'Battery',value:'Battery'}
    ];
    this.status =[
      {label:'Active',value:1},
      {label:'Inactive',value:0}
    ];
  }
  showBasicDialog3() {
    this.displayBasic3 = true;
  }
  ngOnInit(): void {
    this.loadStatisticsChart();
  }
  loadStatisticsChart(){
    let chart = new Chart({
      chart: {
        type: 'column',
        height: 250
      },
      title: {
        text: null
      },
     
       xAxis: {
        categories: [
            'Dec 2019',
            'Jan 2020',
            'Feb 2020',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'No.of Views'
        }
      //   labels: {
      //     format: '{value} k'
      // }
    },
      credits: {
        enabled: false
      },
      colors: ['#30ad07'],
      series: []
    });
    chart['options']['series']=[];
    chart['options']['series'][0]={
      name: 'No.of Views',
      data: [83, 78, 106]
    };
    console.log('chart--', chart);
    this.chart = chart;
  }
}
