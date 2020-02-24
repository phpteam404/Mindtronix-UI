import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/utils/toaster.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {

  submitted=null;
  constructor(private _router: Router, private _toast: ToasterService) { }

  ngOnInit(): void {
  }
  ticketForm  = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  submit(){
    this.submitted = false;
    if(this.ticketForm.valid){
      this._toast.show('success','Successfully Added');
      this.submitted = true;
      this.goToList();
    }else{
      this._toast.show('warning','Please enter mandatory fields.');
    }
  }
  goToList(){
    this._router.navigate(['ticket']);
  }
}
