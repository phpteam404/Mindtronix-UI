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
  issue: any;
  submitted=null;
  constructor(private _router: Router, private _toast: ToasterService) {

    this.issue = [
      {label:'Kit Related',value:{id:1,name:'Kit Related'}},
      {label:'Software Related',value:{id:2,name:'Software Related'}},
      {label:'Others',value:{id:1,name:'Others'}}
    ]; 
   }

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
  onUploadClicked(event: Event){
    console.log('event--', event);
  }
  onSelectedFilesChanged(event: Event){
    console.log('event--', event);
  }
}
