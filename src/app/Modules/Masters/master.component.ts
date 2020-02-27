import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from '../../utils/toaster.service';
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
  master_child_name: string;
  master_child_description: string;
  master_child_id: Number;
  masterArray: any;
  Add: boolean;
  loading: boolean = false;
  name = '';
  description = '';

  cities: any;
  cars: any;
  cols:any;
  selectedMaster: Master[];
  displayBasic: boolean;
  constructor(private router: Router, 
              private _service: MasterService,
              private _common_service: CommonService,
              private _route: ActivatedRoute,
              private _toast: ToasterService) { 
    
    
    this.cols = [
      { field: 'child_name', header: 'Master Name' },
      { field: 'description', header: 'Master Description' },
      { field: 'action', header: 'Actions' }
    ];
  }
  showBasicDialog(rowData,bool) {
    this.displayBasic = true;
    console.log('showBasicDialog bool', !bool);
    console.log('selectedMaster ', this.selectedMaster);
    console.log('selectedMaster rowData', rowData);
    this.Add = bool;
    if(bool){
      this.master_child_name = '';
      this.master_child_description = '';
    }else{
      this.master_child_name = rowData.child_name;
      this.master_child_description = rowData.description;
      this.master_child_id = rowData.master_child_id;
    }
  }
  postMaster(Add){
    this.loading = true;
    console.log('postMaster add', Add);
    if(Add){
      this.masterArray = {master_id:this.selectedMaster['master_id'],child_name:this.master_child_name,description:this.master_child_description};
    }else{
      this.masterArray = {master_id:this.selectedMaster['master_id'],child_id:this.master_child_id,child_name:this.master_child_name,description:this.master_child_description};
    }
    this._service.postMasterChild(this.masterArray).subscribe(res=>{
      if(res.status){
        this.getMasterChilds(this.selectedMaster['master_key']);
        this.displayBasic = false;
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }
  ChangeMasterParent(event) {
    this.getMasterChilds(event.value.master_key);
    this.selectedMaster = event.value;
  }
  onChangeMaster(input){
      this.master_child_name = input;
  }
  onChangeMasterDesc(input){
      this.master_child_description = input;
  }
  AddMaster(event: Event){
    console.log('Adding Master');
  }
  ngOnInit(): void {
    this.getAllMaster ();
  }

  //This service is to Fill Master Dropdown
  getAllMaster () {
    this.loading = true;
    this._service.getAllMaster().subscribe(res=>{
      if(res.status){
        this.Masterslist = res.data;
        if(res.data[0].master_key != undefined){
          this.getMasterChilds(res.data[0].master_key);
          this.selectedMaster = res.data[0];
        }
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }

  //This service is to Get Master childs Based on Selected Master
  getMasterChilds(FirstMaster){
    this.loading = true;
    this._service.getMasterChilds(FirstMaster).subscribe(res=>{
      if(res.status){
        this.MasterChilds = res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }
  
  deleteMasterChild(rowData){
    this.loading = true;
    console.log('deleteMasterChild rowData', rowData);    
    this._common_service.delete('master_child',rowData.master_child_id).subscribe(res=>{
      if(res.status){
        this.getMasterChilds(this.selectedMaster['master_key']);
      }else{
        this._toast.show('error',res.error);
      }
      this.loading = false;
    });
  }
}
