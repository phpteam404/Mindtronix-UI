import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-view-franchise',
  templateUrl: './view-franchise.component.html',
  styleUrls: ['./view-franchise.component.scss']
})
export class ViewFranchiseComponent implements OnInit {
  students: any;
  cols:any;
  FeeList:any=[];
  FeeStructureCols:any=[];
  displayBasic: boolean;
  displayBasic1: boolean;
  displayBasic2: boolean;
  status:any;
  title:any;
  revenueMonth:any;  
  chart:Chart;

  constructor(private route: ActivatedRoute) {
    this.students = [
      {name:'Tom Smith', phone:'9789456556',title:'Admin', email:'mindtronixsrp@mindtronics.com'},
      {name:'sample data', phone:'7774564556',title:'Site Admin', email:'mindtronixsrp@mindtronics.com'},
      {name:'abc data', phone:'7894555556',title:'Super Admin', email:'mindtronixsrp@mindtronics.com'},
      {name:'test data', phone:'7894444556',title:'Admin', email:'mindtronixsrp@mindtronics.com'},
      {name:'master data', phone:'7894563336',title:'Admin', email:'mindtronixsrp@mindtronics.com'},
      
    ];
    this.cols = [
      { field: 'title', header: 'Contact Title' },
      { field: 'name', header: 'Contact Name' },
      { field: 'phone', header: 'Contact Phone' },
      { field: 'email', header: 'Contact Email' }
    ];

    this.FeeList = [
      {id:1,name:'1 (One Month)', amount:2500, term:'Monthly',discount:10},
      {id:2,name:'3 (Three Months)', amount:6000, term:'Quarterly',discount:15},
      {id:3,name:'6 (Six Months)', amount:11000, term:'Half Yearly',discount:20},
      {id:4,name:'12 (Twelve Months)', amount:20500, term:'Yearly',discount:25}
    ];
    this.FeeStructureCols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
     
    ];
    this.status =[
      {label:'Active',value:'active'},
      {label:'InActive',value:'Inactive'}
];
this.title =[
      {label:'Franchise Admin',value:'Franchise Admin'},
      {label:'Accountant',value:'Accountant'},
      {label:'Finance',value:'Finance'},
      {label:'Technical',value:'Technical'}
];
this.revenueMonth = [
   {label:'Feb 2020', value:'Feb 2020'},
   {label:'Jan 2020', value:'Jan 2020'},
   {label:'Dec 2019', value:'Dec 2019'},
];
   }
   showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog1() {
    this.displayBasic1 = true;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('params---', params);
    });
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
            text: 'Amount'
        },
        labels: {
          format: '{value} k'
      }
    },
      credits: {
        enabled: false
      },
      colors: ['#30ad07','#ff0000'],
      series: []
    });
    
    chart['options']['series']=[];
    chart['options']['series'][0]={
      name: 'Invoiced Amount',
      data: [83.6, 78.8, 106.4]
    };
    chart['options']['series'][1]={
      name: 'Collected Amount',
      data: [49.9, 71.5, 98.5]
    };
    console.log('chart--', chart);
    this.chart = chart;
  }

}
