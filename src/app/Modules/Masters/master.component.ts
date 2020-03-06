import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from '../../utils/toaster.service';
import { HttpParams } from '@angular/common/http'
import { FormGroup, Validators, FormControl } from '@angular/forms';

interface Master {
  master_name: string,
  master_id: string,
  master_key: string,
  description: string
}
@Component({
  selector: 'app-other-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  Masterslist: any;//For List service 
  FirstMaster: any;
  MasterChilds: any;//For Master Childs List Service
  masterChildName: string;
  masterChildDescription: string;
  masterChildId: Number;
  masterArray: any;
  isCreate: boolean;
  loading: boolean = false;
  name:string = '';
  description:string = '';

  cities: any;
  cars: any;
  cols:any;
  selectedMaster: Master[];
  displayBasic: boolean;

  submitted=null;
  constructor(private router: Router, 
              private _service: MasterService,
              private _commonService: CommonService,
              private _route: ActivatedRoute,
              private _toast: ToasterService) { 
    
    
    this.cols = [
      { field: 'child_name', header: 'Master Name' },
      { field: 'description', header: 'Master Description' },
      { field: 'action', header: 'Actions' }
    ];
  }
  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('')
  });
  showBasicDialog(rowData,isCreate) {
    if(isCreate)this.form.reset();
    this.displayBasic = true;
    console.log('selectedMaster rowData', rowData);
    this.isCreate = isCreate;
    if(!isCreate){
      this.masterChildId = rowData.master_child_id;
      this.form.setValue({
        name:rowData.child_name,
        description: rowData.description
      });
    }
  }
  postMaster(isCreate){
    this.loading = true;
    // console.log('postMaster add', Add);
    if(isCreate){
      this.masterArray = {master_id:this.selectedMaster['master_id'],child_name:this.masterChildName,description:this.masterChildDescription};
    }else{
      this.masterArray = {master_id:this.selectedMaster['master_id'],child_id:this.masterChildId,child_name:this.masterChildName,description:this.masterChildDescription};
    }
    this._service.postMasterChild(this.masterArray).subscribe(res=>{
      if(res.status){
        this.getMasterChilds(this.selectedMaster['master_key']);
        this.displayBasic = false;
        this.loading = false;
      }else{
        this._toast.show('error',res.error);
        this.loading = false;
      }
    });
  }
  ChangeMasterParent(event) {
    this.getMasterChilds(event.value.master_key);
    this.selectedMaster = event.value;
  }
  onChangeMaster(input){
      this.masterChildName = input;
  }
  onChangeMasterDesc(input){
      this.masterChildDescription = input;
  }
  AddMaster(event: Event){
    // console.log('Adding Master');
  }
  ngOnInit(): void {
    this.getAllMaster ();
  }

  //This service is to Fill Master Dropdown
  getAllMaster () {
    this.loading = true;
    this._service.getAllMaster().subscribe(res=>{
      if(res.status){
        this.Masterslist = res.data.data;
        if(res.data.data[0].master_key != undefined){
          this.getMasterChilds(res.data.data[0].master_key);
          this.selectedMaster = res.data.data[0];
        }
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }

  //This service is to Get Master childs Based on Selected Master
  getMasterChilds(FirstMaster){
    var params = new HttpParams().set('master_key',FirstMaster);
    this.loading = true;
    this._service.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        this.MasterChilds = res.data.data;
        this.cols = res.data.table_headers;
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }
  
  deleteMasterChild(rowData){
    this.loading = true;
    // console.log('deleteMasterChild rowData', rowData); 
    var params = new HttpParams()
                  .set('tablename','master_child')
                  .set('id',rowData.master_child_id)   
    this._commonService.delete(params).subscribe(res=>{
      if(res.status){
        this.getMasterChilds(this.selectedMaster['master_key']);
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }

  submit(){
    this.submitted=false;
    if(this.form.valid){
      var params={};
      params['master_id'] = this.selectedMaster['master_id'];
      params['child_name'] = this.form.value.name;
      params['description'] = this.form.value.description;
      if(!this.isCreate){
        params['child_id']=this.masterChildId;
      }
      // console.log('post params--', params);
      this._service.postMasterChild(params).subscribe(res=>{
        if(res.status){
          this.getMasterChilds(this.selectedMaster['master_key']);
          this.form.reset();
          this.displayBasic = false;
          this.loading = false;
          this.submitted=true;
        }else{
          this._toast.show('error',res.error);
          this.loading = false;
        }
      });
    }
  }
  close(){
    this.form.reset();
    this.displayBasic=false;
  }
}
