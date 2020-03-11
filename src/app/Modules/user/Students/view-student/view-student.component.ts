import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  studentObj:any={};
  constructor(private _ar: ActivatedRoute, 
              private _service: UserService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      var id = atob(params['params'].id);
      this.getStudentInfo(id);
    });
  }

  getStudentInfo(studentId){
    var params = new HttpParams().set('user_id',studentId);
    this._service.getStudentInfo(params).subscribe(res=>{
      if(res.status){
        console.log('info---', res);
        this.studentObj = res.data.data[0];
        this.studentObj['last_invoice_amount'] = res.data.last_invoice_amount;
        this.studentObj['student_history'] = res.data.student_history;
      }
    })
  }

}
