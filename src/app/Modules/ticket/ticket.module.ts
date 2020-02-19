import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeRoutingModule } from './ticket-routing.module';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketListComponent
  ],
  imports: [
    CommonModule,
    FeeRoutingModule,
    FileUploadModule,
  ]
})
export class TicketModule { }
