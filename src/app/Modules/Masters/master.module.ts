import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OtherMasterComponent } from './other-master/other-master.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [OtherMasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    InputTextModule
  ]
})
export class MasterModule { }
