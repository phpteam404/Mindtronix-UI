import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseInvoiceComponent } from './franchise-invoice/franchise-invoice.component';
import { FranchiseViewComponent } from './franchise-view/franchise-view.component';
import { BasicModule } from '../../basic/basic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [FranchiseInvoiceComponent,FranchiseViewComponent],
  imports: [
    CommonModule,
    FranchiseRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    BasicModule.forRoot()
  ]
})
export class FranchiseModule { }
