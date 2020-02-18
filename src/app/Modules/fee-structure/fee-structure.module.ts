import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';
import { FeeRoutingModule } from './fee-routing.module';



@NgModule({
  declarations: [FeeStructureListComponent,
    AddFeeComponent,
    UpdateFeeComponent
  ],
  imports: [
    CommonModule,
    FeeRoutingModule
    
  ]
})
export class FeeStructureModule { }
