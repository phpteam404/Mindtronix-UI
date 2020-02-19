import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StudentInvoiceRoutingModule } from './student-invoice-routing.module';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
    declarations: [
      StudentListComponent,
    ],
    imports: [
      CommonModule,
      StudentInvoiceRoutingModule,
      TableModule,
      ButtonModule,
      KeyFilterModule,
      InputTextModule,
      InputTextareaModule,
      ReactiveFormsModule
    ]
  })
  export class StudentInvoiceModule { }
