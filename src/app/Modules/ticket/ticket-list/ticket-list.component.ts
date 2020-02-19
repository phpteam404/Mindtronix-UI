import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  constructor(private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  AddNewTicket(event: Event){
    this.router.navigate(['info'], {relativeTo: this._route});
  }
}
