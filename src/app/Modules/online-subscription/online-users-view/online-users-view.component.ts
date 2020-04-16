import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { OnlineUsersService} from 'src/app/services/online-users.service';
@Component({
  selector: 'app-online-users-view',
  templateUrl: './online-users-view.component.html',
  styleUrls: ['./online-users-view.component.scss']
})
export class OnlineUsersViewComponent implements OnInit {
  userId:any
  userName:any
  onlineusersinfo:any={};
  constructor(private _ar: ActivatedRoute,
              private _router : Router,
              private _service:OnlineUsersService,
              public translate: TranslateService) {
                translate.setDefaultLang(environment.defaultLanguage);
    }

  ngOnInit(): void {
    this._ar.paramMap.subscribe(params => {
      this.userId = atob(params['params'].id);
      this.userName = (params['params'].name);
      this.getonlineusersInfo(this.userId);
    });
  }
  getonlineusersInfo(UserId){
    var params = new HttpParams().set('user_id',UserId);
    this._service.onlineusersInfo(params).subscribe(res =>{
      this.onlineusersinfo =res.data.data[0];
    })
  }
}
