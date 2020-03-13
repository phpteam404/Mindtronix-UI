import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { ToasterService } from 'src/app/utils/toaster.service';
import { FeeService } from 'src/app/services/fee.service';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-view-franchise',
  templateUrl: './view-franchise.component.html',
  styleUrls: ['./view-franchise.component.scss']
})
export class ViewFranchiseComponent implements OnInit {
  contacts: any;
  cols:any;
  FeeList:any=[];
  FeeStructureCols:any=[];
  displayBasic: boolean;
  displayBasic1: boolean;
  displayBasic2: boolean;
  title:any;
  buttonDisabled :boolean;
  header:string;
  revenueMonth:any;
  chart:Chart;
  
  franchise:any={};
  franchiseObj:any={};
  franchiseExtraInfo:any={};
  
  firstForm:FormGroup;
  submitted1=null;
  secondForm:FormGroup;
  submitted2=null;
  thirdForm:FormGroup;
  submitted3=null;
  
  FeeStructureList:any;
  status:any=[];
  state:any=[];
  city:any=[];
  country:any=[];
  franchiseId:any;
  franchiseName:any;

  secondFormCreate:boolean;

  constructor(private _ar: ActivatedRoute,
              private _router: Router,
              private _service: FranchiseService,
              private _cService: CommonService,
              private _toast: ToasterService,
              private _feeService: FeeService,
              private _confirm: ConfirmationService,
              private masterservices:MasterService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
   
    this.cols = [
      { field: 'contact_title_display', header: 'Contact Title' },
      { field: 'contact_name', header: 'Contact Name' },
      { field: 'contact_number', header: 'Contact Phone' },
      { field: 'contact_email', header: 'Contact Email' },
      {field: 'actions', header: 'Actions'}
    ];
    
    this.FeeStructureCols = [
      { field: 'fee_title', header: 'Fee Title' },
      { field: 'amount', header: 'Fee Amount (₹)' },
      { field: 'term', header: 'Term' },
      { field: 'discount', header: 'Discount (%)' },
      {field: 'actions', header: 'Actions'}
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
    this.thirdForm.reset();
  }
  showBasicDialog1(isCreate) {
    this.displayBasic1 = true;
    if(isCreate) {
       this.buttonDisabled =true;
       this.header ="Create Contact Information";
     }
    this.secondFormCreate = isCreate;
    this.submitted2=null;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
    this.submitted3=null;
    /*this.thirdForm.setValue({
      fee_structure:this.FeeList.fee_structure
    });*/
    console.log('prepopulate---', this.franchiseObj.fee_detalis);
  }
 
  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.franchiseId = atob(params['params'].id);
      this.franchiseName = (params['params'].name);
      this.getFranchiseInfo(this.franchiseId);
      this.getFranchiseData();
    });
    this.loadStatisticsChart();

    this.firstForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      contact_person: new FormControl('',[Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
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
      franchise_contact_id :new FormControl(''),
      contact_title :new FormControl('',[Validators.required]),
      contact_name:new FormControl('',[Validators.required]),
      contact_email: new FormControl('',[Validators.required, Validators.email]),
      contact_number :new FormControl('',[Validators.required,Validators.minLength(10) ]),
    });
    this.thirdForm = new FormGroup({  
      fee_structure :new FormControl('',[Validators.required])
    });
    this.getMasterDropdown('state');
    this.getMasterDropdown('city');
    this.getMasterDropdown('country');
    this.getMasterDropdown('status');
    this.getMasterDropdown('contact_type');
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
        if(masterKey =='contact_type')
          this.title =res.data.data;
        if(masterKey =='status'){
          this.status =res.data.data;
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  getFeeStructureDropdown(){
    var params = new HttpParams().set('status',1+'').set('franchise_id',this.franchiseId);
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
        this.contacts = res.data.data[0].franchise_contacts_information;
        this.FeeList = res.data.data[0].fee_detalis;
        this.franchiseExtraInfo = res.data;        
      }
    });
  }

  getCountry(){ return this.firstForm.value.country.value;}
  getState(){ return this.firstForm.value.state.value;}
  getCity(){ return this.firstForm.value.city.value;}
  getStatus(){ return this.firstForm.value.status.value;}

  getContactTitle(){ return this.secondForm.value.contact_title.value; }

  firstFormSubmit(){
    this.submitted1=false;
    if(this.firstForm.valid){
      var obj={};
      obj = this.firstForm.value;
      obj['country'] = this.getCountry();
      obj['state'] = this.getState();
      obj['city'] = this.getCity();
      obj['status'] = this.getStatus();
      obj['franchise_id'] = this.franchiseObj.franchise_id;
      this._service.addUpdate(obj).subscribe(res=>{
        if(res.status){
          this.submitted1 = true;
          this.getFranchiseInfo(this.franchiseObj.franchise_id); 
          if(this.franchiseName === this.firstForm.value.name){
          }else{} //this._router.navigate(['view/'+(this.firstForm.value.name)+'/'+btoa(this.franchiseObj.franchise_id)],{relativeTo:this._ar});
        }
      });
      this.hideBasicDialog();
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  secondFormSubmit(){
    this.submitted2=false;
    if(this.secondForm.valid){
      var obj={};
      obj = this.secondForm.value;
      obj['contact_title'] = this.getContactTitle();
      obj['franchise_id'] = this.franchiseId;
      if(!this.secondFormCreate) obj['franchise_contact_id'] = this.secondForm.value.franchise_contact_id;
      this._service.updateFranchiseContacts(obj).subscribe(res => {
        if(res.status){
          this.submitted1=true;
          this.getFranchiseInfo(this.franchiseId);
          this.hideBasicDialog();
        }
      });
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  getFranchiseData(){
    var param = new HttpParams().set('franchise_id',this.franchiseId);
    this._service.getList(param).subscribe(res => {
      if(res.status){
        this.franchise = res.data.data[0];
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
    this.buttonDisabled =false;
    this.header="Edit Contact Information";
    this.showBasicDialog1(false);
    this.secondForm.setValue({
      franchise_contact_id : (data.franchise_contact_id)?data.franchise_contact_id:'',
      contact_title : data.contact_title,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_number : data.contact_number,
    });
  }

  deleteFranchiseContact(data) {
    this._confirm.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'franchise_contacts')
                    .set('id', data.franchise_contact_id)   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
            this.getFranchiseInfo(this.franchiseId);
          }else{
          }
        });
      },
      reject: () => {}
    });
  }

  thirdFormSubmit(){
    this.submitted3=false;
    if(this.thirdForm.valid){
      var params={};
      var fee=[];
      this.thirdForm.value.fee_structure.forEach(item => {
        fee.push(item.fee_master_id);
      });
      params['fee_master_id'] = fee.toString();
      params['franchise_id'] = this.franchiseId;
      this._service.updateFranchiseFee(params).subscribe(res => {
        if(res.status){
          this.submitted3=true;
          this.getFranchiseInfo(this.franchiseId);
          this.hideBasicDialog();
        }
      })
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }

  deleteFranchiseFee(data) {
    this._confirm.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'franchise_fee')
                    .set('id', data.fee_master_id)   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
            this.getFranchiseInfo(this.franchiseId);
          }else{
          }
        });
      },
      reject: () => {}
    });
  }
  
  isEnabled(){
    if(this.franchiseObj.status == 'active') return true;
    else return false;
  }
  isEmptyTable(){
    if(this.FeeList)
      return (this.FeeList.length == 0 ? true : false);
    else return true;
  }
  isEmptyTable1(){
    if(this.contacts)
      return (this.contacts.length == 0 ? true : false);
    else return true;
  }
}
