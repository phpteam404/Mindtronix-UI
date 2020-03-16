import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FeeRoutingModule } from './ticket-routing.module';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModule } from '../basic/basic.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatFileUploadModule } from 'mat-file-upload';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    TicketListComponent,
    TicketInfoComponent,
    ViewTicketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeeRoutingModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    KeyFilterModule,
    InputTextModule,
    InputTextareaModule,
    MatFileUploadModule,
    FormsModule,
    BasicModule.forRoot(),
    DialogModule
  ],
  providers: [DatePipe]
})
export class TicketModule { }
