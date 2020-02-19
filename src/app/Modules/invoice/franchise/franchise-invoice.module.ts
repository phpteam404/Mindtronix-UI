import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FranchiseInvoiceRoutingModule } from './franchise-invoice-routing.module';
import { FranchiseListComponent } from './franchise-list/franchise-list.component';
@NgModule({
    declarations: [
        FranchiseListComponent,
    ],
    imports: [
      CommonModule,
      FranchiseInvoiceRoutingModule,
      TableModule,
      ButtonModule,
      KeyFilterModule,
      InputTextModule,
      InputTextareaModule,
      ReactiveFormsModule
    ]
  })
  export class FranchiseInvoiceModule { }