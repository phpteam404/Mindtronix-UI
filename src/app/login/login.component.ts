import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../utils/local-storage.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToasterService } from '../utils/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted=null;
  constructor(private ls: LocalStorageService,private authService:AuthenticationService,private router: Router,private _toast: ToasterService) { 
      console.log('loaded LoginComponent');
  }

  ngOnInit() {
    if (this.ls.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  get username(): any { return this.form.get('username'); }
  get password(): any { return this.form.get('password'); }

  currentUser:any = {};

  onSubmit(): any {
    this.submitted=false;
    if (this.form.valid) {
      let params={};
      params = {
        'username': this.form.value.username,
        'password': btoa(this.form.value.password)
      };
      console.log(this.form.value.username);
      console.log(this.form.value.password);
      this.submitted=true;
      this.authService.login(params).subscribe(res => {
        if (res.status) {
          res.data.access_token = res.access_token;
          res.data.menu = res.menu;
          this.ls.setItem('user', res.data, true);
          this.router.navigate(['/dashboard']);
        }
      });
    }else{
      this._toast.show('warning','Invalid User Name and Password!')
    }
  }
}