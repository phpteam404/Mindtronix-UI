import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { ToasterService } from '../../utils/toaster.service';

interface Master {
  master_name: string,
  master_id: string
  master_key: string
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
  cities: any;
  cars: any;
  cols:any;
  cities2: Master[];
  selectedMaster: Master[];
  displayBasic: boolean;
  name = 'Grade';
  description = 'Grade';
  constructor(private router: Router, 
              private _service: MasterService,
              private _route: ActivatedRoute,
              private _toast: ToasterService) { 
    
    
    this.cols = [
      { field: 'child_name', header: 'Master Name' },
      { field: 'description', header: 'Master Description' },
      { field: 'action', header: 'Actions' }
    ];
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  ChangeModelLable(event) {
    this.getMasterChilds(event.value.master_key);
  }
  AddMaster(event: Event){
    console.log('Adding Master');
  }
  ngOnInit(): void {
    this.getAllMaster ();
    this.getMasterChilds(this.FirstMaster);
  }

  //This service is to Fill Master Dropdown
  getAllMaster () {
    this._service.getAllMaster().subscribe(res=>{
      if(res.status){
        this.Masterslist = res.data;
        if(res.data[0].master_key != undefined){
          // this.FirstMaster = res.data[0].master_key;
          this.getMasterChilds(res.data[0].master_key);
        }
      }else{
        this._toast.show('error',res.error);
      }
    });
  }

  //This service is to Get Master childs Based on Selected Master
  getMasterChilds(FirstMaster){
    this._service.getMasterChilds(FirstMaster).subscribe(res=>{
      if(res.status){
        this.MasterChilds = res.data.data;
      }else{
        this._toast.show('error',res.error);
      }
    });
  }
  
}
