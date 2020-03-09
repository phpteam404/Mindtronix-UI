import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { FeeService } from 'src/app/services/fee.service';
import { MasterService } from 'src/app/services/master.service';

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
  title:any;
  revenueMonth:any;
  chart:Chart;
  
  franchise:any={};
  franchiseObj:any={};
  franchiseExtraInfo:any={};
  
  firstForm:FormGroup;
  submitted1=null;
  secondForm:FormGroup;
  submitted2=null;
  ThridForm:FormGroup;
  submitted3=null;
  
  FeeStructureList:any;
  status:any=[];
  state:any=[];
  city:any=[];
  country:any=[];
  franchiseId:any;
  franchiseName:any;

  secondFormIndex:number;

  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _service: FranchiseService,
              private _toast: ToasterService,
              private _feeService: FeeService,
              private masterservices:MasterService) {
   
    this.cols = [
      { field: 'contact_title', header: 'Contact Title' },
      { field: 'name', header: 'Contact Name' },
      { field: 'contact_phone', header: 'Contact Phone' },
      { field: 'contact_email', header: 'Contact Email' },
      {field: 'actions', header: 'Actions'}
    ];

    this.FeeList = [
      {id:1,name:'1 (One Month)', amount:2500, term:'Monthly',discount:10,actions:''},
      {id:2,name:'3 (Three Months)', amount:6000, term:'Quarterly',discount:15,actions:''},
      {id:3,name:'6 (Six Months)', amount:11000, term:'Half Yearly',discount:20,actions:''},
      {id:4,name:'12 (Twelve Months)', amount:20500, term:'Yearly',discount:25,actions:''}
    ];
    this.FeeStructureCols = [
      { field: 'name', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      {field: 'actions', header: 'Actions'}
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
    this.getFranchiseData();
  }
  hideBasicDialog() {
    this.displayBasic = false;
    this.displayBasic1 = false;
    this.displayBasic2 = false;
    this.firstForm.reset();
    this.secondForm.reset();
    this.ThridForm.reset();
  }
  showBasicDialog1() {
    this.displayBasic1 = true;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;    
  }

  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.franchiseId = atob(params['params'].id);
      this.franchiseName = (params['params'].name);
      this.getFranchiseInfo(this.franchiseId);
      console.log('url params----', this.franchiseName);
      this.getFranchiseData();
    });
    this.loadStatisticsChart();

    this.firstForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      phone: new FormControl('', [Validators.required]),
      website_address :new FormControl(''),
      landmark: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      pincode :new FormControl(''),
      country :new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      status :new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
    });
    this.secondForm = new FormGroup({  
      contact_title :new FormControl('',[Validators.required]),
      contact_name:new FormControl('',[Validators.required]),
      contact_email: new FormControl('',[Validators.required, Validators.email]),
      contact_phone :new FormControl('',[Validators.required]),
    });
    this.ThridForm = new FormGroup({  
      fee_structure :new FormControl('',[Validators.required])
    });
    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
    this.getMasterDropdown('status');
    this.getFeeStructureDropdown();
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
  getMasterDropdown(masterKey): any{
    var params = new HttpParams()
                  .set('master_key',masterKey)
                  .set('dropdown',"true")
    return this.masterservices.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        if(masterKey == 'state')
          this.state =  res.data.data;
        if(masterKey == 'city')
          this.city =  res.data.data;
        if(masterKey =='country')
          this.country =res.data.data;
        if(masterKey =='status'){
          this.status =res.data.data;
          this.firstForm.controls['status'].setValue(res.data.data[0]);
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  getFeeStructureDropdown(){
    var params = new HttpParams().set('status',1+'');
    this._feeService.getList(params).subscribe(res=>{
      if(res.status){
        this.FeeStructureList = res.data.data;
      }
    });
  }
  getFranchiseInfo(franchiseId){
    var params = new HttpParams().set('franchise_id',franchiseId);
    this._service.getFranchiseInfo(params).subscribe(res => {
      if(res.status){
        this.franchiseObj = res.data.data[0];
        this.franchiseExtraInfo = res.data;        
      }
    });
  }
  firstFormSubmit(){
    this.submitted1=false;
    if(this.firstForm.valid){
      var obj={};
      obj = this.firstForm.value;
      obj['country'] = this.firstForm.value.country.value;
      obj['state'] = this.firstForm.value.state.value;
      obj['city'] = this.firstForm.value.city.value;
      obj['status'] = this.firstForm.value.status.value;
      obj['franchise_id'] = this.franchiseObj.franchise_id;
      this._service.addUpdate(obj).subscribe(res=>{
        if(res.status){
          this.submitted1 = true;
          this.getFranchiseInfo(this.franchiseObj.franchise_id); 
          console.log(obj,'****', this.franchiseName);
          if(this.franchiseName === this.firstForm.value.name){
            console.log('*-*-*same name *-*-*-');
          }
        }
      });
      this.hideBasicDialog();
    }
  }
  secondFormSubmit(){
    this.submitted2=false;
    if(this.secondForm.valid){
      console.log('this.secondForm.valid', this.secondForm.value);
      var obj={};
      obj =  this.secondForm.value;
      // obj['contact_title'] = this.secondForm.value.contact_title.value;
      var contactList = this.students;
      contactList[this.secondFormIndex]=obj;
      var params={};
      params['franchise_id']=this.franchiseId;
      params['franchise_contacts']=contactList;
      console.log('***', params);
      this._service.updateFranchiseContacts(params).subscribe(res => {
        if(res.status){
          this.getFranchiseData();
        }
      });      
    }
  }

  getFranchiseData(){
    var param = new HttpParams().set('franchise_id',this.franchiseId);
    this._service.getList(param).subscribe(res => {
      if(res.status){
        this.franchise = res.data.data[0];
        this.students = res.data.data[0].franchise_contact_list;
        this.firstForm.setValue({
          name : this.franchise.franchise_name,
          code : this.franchise.franchise_code,
          contact_person : this.franchise.owner_name,
          phone : this.franchise.contact_number,
          website_address : this.franchise.website_address,
          landmark : this.franchise.landmark,
          email: this.franchise.email,
          pincode : this.franchise.pincode,
          country : this.franchise.country,
          state : this.franchise.state,
          city : this.franchise.city,
          status : this.franchise.status,
          address : this.franchise.address,
        }); 
      }
    });
  }

  editContact(data:any,index:number){
    this.showBasicDialog1();
    console.log(index,'--', data);
    this.secondFormIndex=index;
    this.secondForm.setValue({
      contact_title : data.contact_title,
      contact_name: data.name,
      contact_email: data.contact_email,
      contact_phone :data.contact_phone,
    });
  }
}
