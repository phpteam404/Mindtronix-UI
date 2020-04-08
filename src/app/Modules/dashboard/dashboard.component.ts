import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService} from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cities: any;
  cars: any;
  ordercols:any;
  cols:any;
  revenueMonth:any;
  ticketsInfo:any ={};
  ordersInfo:any={};
  studentsCount:any={};
  lcInvoice:any={};
  ticketList:any ;
  studentInvoice:any ={};
  schoolInvoice:any={};
  enableOrders:boolean;
  enableStudents:boolean;
  enableSchoolInvoice:boolean;
  prdAssetPath:string = environment.prdAssetPath;

  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              public translate: TranslateService,
              private _ls: LocalStorageService,
              private _service:UserService) {
                translate.setDefaultLang(environment.defaultLanguage);
    this.cities = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
    this.cars = [
      {issueId:'#MI000001', name:'prasad', date:'01-02-2020', email:'prasad@gmail.com', phone:'9977342112', status:'Closed',amount:'₹ 1,000'},
      {issueId:'#MI000002', name:'pavan', date:'07-02-2020', email:'pavan@gmail.com', phone:'7623342012', status:'Open',amount:'₹ 10,000'},
      {issueId:'#MI000003', name:'raju', date:'02-02-2020', email:'raju@gmail.com', phone:'9977012232', status:'Pending',amount:'₹ 7,000'},
      {issueId:'#MI000004', name:'rakhi', date:'04-02-2020', email:'rakhi@gmail.com', phone:'9977342112', status:'Closed',amount:'₹ 3,000'},
      {issueId:'#MI000005', name:'rani', date:'05-02-2020', email:'rani@gmail.com', phone:'7766556291', status:'Pending',amount:'₹ 6,000'}
     
    ];
    this.ordercols = [
      
      { field: 'issueId', header: 'Order ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Contact Email' },
      { field: 'phone', header: 'Contact Number' },
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
      { field: 'status', header: 'Status' }
    ];
    // this.revenueMonth = [
    //   {label:'Feb 2020', value:'Feb 2020'},
    //   {label:'Jan 2020', value:'Jan 2020'},
    //   {label:'Dec 2019', value:'Dec 2019'},
    // ];
  }
  ngOnInit(): void {
    this.getDashboard();
    this.roleBasedOrders();
    this.roleBasedInvoice();
  }
  isEmptyTable() {
    return (this.ticketList == 0 ? true : false);
  }

  getDashboard(){
    this._service.adminDashboard().subscribe(res =>{
      if(res.status){
         this.ticketsInfo =res.data.ticket;
         this.studentInvoice = res.data.student_invoice;
         this.ordersInfo = res.data.orders;
         this.studentsCount = res.data.students;
         this.lcInvoice = res.data.lc_invoice;
         this.schoolInvoice = res.data.school_invoice;
         this.ticketList = res.data.ticket_list;
         this.cols= res.table_headers;
      }
    });
  }

  PreviousList(){
    this._router.navigate(['/ticket'], {relativeTo: this._ar});
  }

  viewTicketInfo(data:any){
    this._router.navigate(['/ticket/view/'+data.issue_title+'/'+btoa(data.ticket_id)], {relativeTo: this._ar});
  }
  roleBasedOrders(){
    var roleName = this._ls.getItem('user',true).data.user_role_name;
    if(roleName=="LC Owner" || roleName=="Learning Center Head" || roleName=="School Admin") {
      this.enableOrders=false;
      this.enableStudents= true;
    } 
    else {
       this.enableOrders=true;
       this.enableStudents=false;
    }
  }
  
  roleBasedInvoice(){
    var schoolAdmin = this._ls.getItem('user',true).data.user_role_name;
    if(schoolAdmin=="School Admin"){
      this.enableSchoolInvoice=true;
    }
    else{
      this.enableSchoolInvoice=false;
    }
  }
}