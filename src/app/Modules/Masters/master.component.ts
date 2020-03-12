import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from '../../utils/toaster.service';
import { HttpParams } from '@angular/common/http'
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {ConfirmationService} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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
  Masterslist: any=[];//For List service 
  FirstMaster: any;
  MasterChilds: any;//For Master Childs List Service
  masterChildId: Number;
  isCreate: boolean;
  displayButton:boolean;
  cols:any;
  selectedMaster: Master[];
  displayBasic: boolean;
  submitted=null;

  constructor(private router: Router, 
              private _service: MasterService,
              private _commonService: CommonService,
              private _route: ActivatedRoute,
              private _toast: ToasterService,
              private _confirm: ConfirmationService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    
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
    this.submitted=null;
    this.displayBasic = true;
    if(isCreate){
      this.form.reset();
      this.displayButton = true;
    }
    else this.displayButton = false;

    this.isCreate = isCreate;
    if(!isCreate){
      this.masterChildId = rowData.master_child_id;
      this.form.setValue({
        name:rowData.child_name,
        description: rowData.description
      });
    }
  }
  ChangeMasterParent(event) {
    this.getMasterChilds(event.value.master_key);
    this.selectedMaster = event.value;
  }
  ngOnInit(): void {
    this.getAllMaster ();
  }
  isEmptyTable() {
    return (this.Masterslist.length == 0 ? true : false);
  }
  //This service is to Fill Master Dropdown
  getAllMaster () {
    this._service.getAllMaster().subscribe(res=>{
      if(res.status){
        this.Masterslist = res.data.data;
        if(res.data.data[0].master_key != undefined){
          this.getMasterChilds(res.data.data[0].master_key);
          this.selectedMaster = res.data.data[0];
        }
      }else{}
    });
  }
  //This service is to Get Master childs Based on Selected Master
  getMasterChilds(FirstMaster){
    var params = new HttpParams().set('master_key',FirstMaster);
    this._service.getMasterChilds(params).subscribe(res=>{
      if(res.status){
        this.MasterChilds = res.data.data;
        this.cols = res.data.table_headers;
      }else{}
    });
  }
  submit(){
    this.submitted=false;
    if(this.form.valid){
      var params={};
      params['master_id'] = this.selectedMaster['master_id'];
      params['child_name'] = this.form.value.name.trim();
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
          this.submitted=true;
        }else{
        }
      });
    }
  }
  close(){
    this.form.reset();
    this.displayBasic=false;
  }
  deleteMasterChild(data) {
    this._confirm.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'master_child')
                    .set('id', data.master_child_id)   
        this._commonService.delete(params).subscribe(res=>{
          if(res.status){
            this.getMasterChilds(this.selectedMaster['master_key']);
          }else{}
        });
      },
      reject: () => {}
    });
  }
}
