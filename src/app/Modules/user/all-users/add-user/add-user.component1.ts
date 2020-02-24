import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component1.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserCopyComponent implements OnInit {

  isValidRegFormSubmitted = null;
  phonePattern = '^[0-9-+s()]*$';
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  url = 'https://users-list-a70f5.firebaseio.com/users.json';
  cities: any = ['Ahmadabad', 'Allahabad', 'Azamer', 'Bengaluru', 'Bilaspur', 'Bhopal', 'Chhatarpur', 'Chhindwada', 'Hyderabad'];
  registrationData: any = [];
  usersData: any = [];
  registrationForm = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl(null, Validators.required),
    myEmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
    password: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    isTCAccepted: new FormControl(null, Validators.requiredTrue)
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  register() {
    this.isValidRegFormSubmitted = false;
    if (this.registrationForm.valid) {
      if (this.usersData.length) {
        const lastRecord: any = this.usersData[this.usersData.length - 1];
        this.usersData.id = lastRecord.id + 1;
      } else {
        this.usersData.id = this.usersData.length + 1;
      }
      this.registrationForm.value.id = this.usersData.id;
      this.registrationData = this.registrationForm.value;
      this.http.post(this.url, this.registrationData).subscribe(res => {
        if (res) {
          //
        }
        this.isValidRegFormSubmitted = true;
        this.router.navigate(['/']);
      });
      // this.registrationForm.reset();
    }
  }
}
