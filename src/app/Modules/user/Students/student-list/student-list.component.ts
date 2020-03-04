import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { ToasterService } from 'src/app/utils/toaster.service';
import { SchoolService } from 'src/app/services/school.service';
import { FranchiseService } from 'src/app/services/franchise.service';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent} from 'primeng/api';

interface Filter {
  label: string,
  value: string
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  cities: any;
  cars: any;
  submitted:null;
  cols: any[];
  totalRecords: number; 
  loading: boolean;
  selectedRange:any;
  schools:Filter[];
  selectedSchool:Filter[];
  franchise:Filter[];
  selectedFranchise:Filter[];
  studentsList:any;

  constructor(private router: Router, private _route: ActivatedRoute,
              private _toast: ToasterService,
              private userService:UserService,
              private schoolService:SchoolService,private franchiseService:FranchiseService) {
    
    this.cols = [
      { field: 'student_name', header: 'Student Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'school_name', header: 'School' },
      { field: 'franchise_name', header: 'Franchise' },
      { field: 'contact_email', header: 'Contact Email' },
      { field: 'phone_no', header: 'Contact Number' },
      { field: 'last_login', header: 'Last Login' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];

    this.getStudentsList();
    this.getFranchiseList();
  }
  getFranchiseList(){ //this service is for getting franchise dropdown through service
    this.franchiseService.getFranchiseDropDowns({}).subscribe(res=>{
      if(res.status){
        this.franchise = res.data.data;
     }
  });
  }
  getStudentsList() { //this service is for getting schools dropdown through service
    this.schoolService.getSchoolsDropDowns({}).subscribe(res=>{
      if(res.status){
        this.schools = res.data.data;
     }
   });
  }
 
  ngOnInit(): void {
    this.getStudentsList();
    this.getFranchiseList();
  }

  AddNewStudent(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }

  EditStudent(data:any){
    this.router.navigate(['update/'+data.student_name+'/'+btoa(data.user_id)],{ relativeTo: this._route});
  }
  viewStudent(data:any){
    this.router.navigate(['view/'+data.name+'/'+btoa(data.id)],{ relativeTo: this._route});
  }

  DeleteStudent(data:any){
     var params = new HttpParams()
        .set('id', data.user_id)
        .set('tablename', 'user');
     this.userService.deleteStudent(params).subscribe(res=>{
       console.log('res info',res);
      if(res.status){
        //this._toast.show('success','res.message');
        this.getList();
      }
     });
  }
  loadStudentsLazy(event: LazyLoadEvent) {
    this.loading =true;
    var sortOrder= (event.sortOrder==1) ? "ASC" : "DESC";
    var params = new HttpParams()
      .set('start', event.first+'')
      .set('number', event.rows+'');
    if (event.sortField) {
      params = params.set('sort', event.sortField);
      params = params.set('order', sortOrder);
    }
    if (event.globalFilter) {
      params = params.set('search', event.globalFilter);
    }
    if(event.filters['contains']){
      params =params.set('school_id',event.filters['contains'].value.value);
    }
    if(event.filters['equals']){
      params =params.set('franchise_id',event.filters['equals'].value.value);
    }
    this.userService.getStudentsList(params).subscribe(res=>{
      if(res.status){
        //this.cols = res.data.table_headers;
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
  }
   
   getList(){
    this.userService.getStudentsList({}).subscribe(res=>{
      if(res.status){
        this.studentsList = res.data.data;
        this.totalRecords = res.data.total_records;
        this.loading = false;
      }
    });
   }
}
