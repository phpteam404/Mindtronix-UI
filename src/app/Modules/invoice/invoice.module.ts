import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { BasicModule } from '../basic/basic.module';
import { FranchiseInvoiceComponent } from './franchise/franchise-invoice/franchise-invoice.component';
import { StudentInvoiceComponent } from './students/student-invoice/student-invoice.component';
import { OnlineUsersInvoiceComponent } from './online/online-users-invoice/online-users-invoice.component';
@NgModule({
    declarations: [
      FranchiseInvoiceComponent,
      StudentInvoiceComponent,
      OnlineUsersInvoiceComponent
    ],
    imports: [
      CommonModule,
      InvoiceRoutingModule,
      TableModule,
      InputTextModule,
      ReactiveFormsModule,
      BasicModule.forRoot()
    ]
  })

  export class InvoiceModule { }