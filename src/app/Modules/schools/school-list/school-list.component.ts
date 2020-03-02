import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { CommonService } from 'src/app/services/common.service';
import { ToasterService } from '../../../utils/toaster.service';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  totalRecords: number;
  list: any;
  cols:any;
  constructor(private router: Router,
              private _schoolService: SchoolService, 
              private _commonService: CommonService, 
              private _toasterService: ToasterService, 
              private _route: ActivatedRoute) {
    
    
  }
  ngOnInit(): void {
    this.getschoolList();
    console.log('getList');
  }

  AddNewSchool(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
  EditSchool(data:any){
    this.router.navigate(['update/'+data.name+'/'+btoa(data.id)],{ relativeTo: this._route});
  }
  GoToStudent(event: Event){
    this.router.navigate(['users/students'], {});
  }
  getschoolList(){
    this._schoolService.getschoolList('').subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
      }else{
        this._toasterService.show('error',res.error);
      }
    });
  }
}
