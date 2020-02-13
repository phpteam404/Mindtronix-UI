import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
    this.user.getUsersList().subscribe(res=>{
      if(res.status){
        console.log('list===', res);
      }
    })
  }

}
