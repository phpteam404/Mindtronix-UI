import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { FeeListComponent } from './fee-list/fee-list.component';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';
import { BasicModule } from '../basic/basic.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeeListComponent,
    AddFeeComponent,
    UpdateFeeComponent
  ],
  imports: [
    CommonModule,
    FeeRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    KeyFilterModule,
    BasicModule.forRoot()
  ]
})
export class FeeModule { }
