import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';



@NgModule({
  declarations: [FeeStructureListComponent,
    AddFeeComponent,
    UpdateFeeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeeStructureModule { }
