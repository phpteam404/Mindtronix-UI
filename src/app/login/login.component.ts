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
  submitted1=null;
  currentUser:any = {};
  forgotPasswordDialog:boolean=false;
  constructor(private ls: LocalStorageService,private authService:AuthenticationService,private router: Router,private _toast: ToasterService) { 
  }

  ngOnInit() {
    if (this.ls.getItem('user')) {
      this.router.navigate([this.ls.getItem('user',true).menu[0].module_url]);
    }
  }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  
  passwordForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit(): any {
    this.submitted=false;
    if (this.form.valid) {
      let params={};
      params = {
        'username': this.form.value.username,
        'password': btoa(this.form.value.password)
      };
      this.authService.login(params).subscribe(res => {
        if (res.status) {
          res.data.access_token = res.access_token;
          res.data.menu = res.menu;
          this.ls.setItem('user', res.data, true);
          this.submitted=true;
          if(res.menu){
            if(res.menu[0].sub_menus.length>0){
              this.router.navigate([res.menu[0].sub_menus[0].module_url]);
            }else this.router.navigate([res.menu[0].module_url]);
          }else this.router.navigate(['/404']);
          
        }
      });
    }else{
      this._toast.show('warning','Invalid User Name and Password!')
    }
  }
  showForgotPassword(flag){
    if(flag)this.submitted1=null;
    this.passwordForm.reset();
    this.forgotPasswordDialog=flag;
  }
  forgotPassword(){
    this.submitted1=false;
    if (this.passwordForm.valid) {
      let params={};
      params = {
        'email': this.passwordForm.value.username
      };
      this.authService.forgotPassword(params).subscribe(res => {
        if(res.status){
          this.submitted1=true;
          console.log('new password :', res.data);
          this.showForgotPassword(false);
        }
      });
    }
  }
}