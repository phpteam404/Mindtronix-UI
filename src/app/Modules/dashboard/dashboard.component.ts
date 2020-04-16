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
  cols:any;
  revenueMonth:any;
  ticketsInfo:any ={};
  ordersInfo:any={};
  studentsCount:any={};
  lcInvoice:any={};
  ticketList:any ;
  studentInvoice:any ={};
  schoolInvoice:any={};
  prdAssetPath:string = environment.prdAssetPath;

  showOrders:boolean;  
  ordersCardRoles = ["1","7","8","9"];

  showStudents:boolean;
  studentsCardRoles = ["2","5","10"];

  showStudentInvoice:boolean;
  studentInvoiceCardRoles = ["1","2","5","8","9"];

  showLCInvoice:boolean;
  lcInvoiceCardRoles = ["1","2","5","8"];

  showSchoolInvoice:boolean;
  schoolInvoiceCardRoles = ["10"];

  constructor(private _router: Router,
              private _ar: ActivatedRoute,
              public translate: TranslateService,
              private _ls: LocalStorageService,
              private _service:UserService) {
    translate.setDefaultLang(environment.defaultLanguage);
    var curRoleId = this._ls.getItem('user',true).data.user_role_id.toString();
    if(this.ordersCardRoles.includes(curRoleId)){this.showOrders=true;}
    else this.showOrders=false;
    if(this.studentsCardRoles.includes(curRoleId)){this.showStudents=true;}
    else this.showStudents=false;
    if(this.studentInvoiceCardRoles.includes(curRoleId)){this.showStudentInvoice=true;}
    else this.showStudentInvoice=false;
    if(this.lcInvoiceCardRoles.includes(curRoleId)){this.showLCInvoice=true;}
    else this.showLCInvoice=false;
    if(this.schoolInvoiceCardRoles.includes(curRoleId)){this.showSchoolInvoice=true;}
    else this.showSchoolInvoice=false;
    /*this.revenueMonth = [
      {label:'Feb 2020', value:'Feb 2020'},
      {label:'Jan 2020', value:'Jan 2020'},
      {label:'Dec 2019', value:'Dec 2019'},
    ];*/
  }
  ngOnInit(): void {
    this.getDashboard();
  }
  isEmptyTable() {
    return (this.ticketList.length == 0 ? true : false);
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
  viewMoreTickets(){
    this._router.navigate(['/ticket']);
  }
  viewTicketInfo(data:any){
    this._router.navigate(['/ticket/view/'+data.issue_title+'/'+btoa(data.ticket_id)]);
  }
}