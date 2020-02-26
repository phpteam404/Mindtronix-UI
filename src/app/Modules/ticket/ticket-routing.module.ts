import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';


const routes: Routes = [
  {
    path:'',
    component: TicketListComponent
  },
  {
    path: 'info',
    component: TicketInfoComponent,
    data: {
      braedcrumbs: 'Create Ticket'
    }
  },
  {
    path: 'view/:id',
    component: ViewTicketComponent,
    data: {
      braedcrumbs: 'View Ticket History'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
