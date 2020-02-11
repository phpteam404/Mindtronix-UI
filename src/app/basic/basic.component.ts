import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utils/local-storage.service';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  sessionUser: any;
  constructor(private ls: LocalStorageService, private router: Router) { }

  ngOnInit() {
    //this.verifyLogin();
    console.log('loaded BasicComponent');
  }
  verifyLogin() {
    this.sessionUser = this.ls.getItem('user', true);
    console.log('this.sessionUser', this.sessionUser);
    //this.router.navigate(['/dashboard']);
  }
}
