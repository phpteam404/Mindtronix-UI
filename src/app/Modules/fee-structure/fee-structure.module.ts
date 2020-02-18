import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';
import { FeeRoutingModule } from './fee-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BasicModule } from '../basic/basic.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FeeStructureListComponent,
    AddFeeComponent,
    UpdateFeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    KeyFilterModule,
    FeeRoutingModule,
    BasicModule.forRoot()
  ]
})
export class FeeStructureModule { }
