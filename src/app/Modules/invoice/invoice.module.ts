import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { BasicModule } from '../basic/basic.module';
@NgModule({
    declarations: [
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