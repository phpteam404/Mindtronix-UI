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

  constructor(private _router: Router, private _toast: ToasterService) { }

  ngOnInit(): void {
  }

}
