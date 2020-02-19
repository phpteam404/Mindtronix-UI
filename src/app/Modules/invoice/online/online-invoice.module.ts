import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OnlineInvoiceRoutingModule } from './online-invoice-routing.module';
import { OnlineUsersListComponent } from './online-users-list/online-users-list.component';

@NgModule({
    declarations: [
        OnlineUsersListComponent,
    ],
    imports: [
      CommonModule,
      OnlineInvoiceRoutingModule,
      TableModule,
      ButtonModule,
      KeyFilterModule,
      InputTextModule,
      InputTextareaModule,
      ReactiveFormsModule
    ]
  })
  export class onlineInvoiceModule { }