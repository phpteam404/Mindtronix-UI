import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseListComponent } from './franchise-list/franchise.component';
import { AddFranchiseComponent } from './add-franchise/add-franchise.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BasicModule } from '../basic/basic.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';

import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFranchiseComponent } from './update-franchise/update-franchise.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ViewFranchiseComponent } from './view-franchise/view-franchise.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'angular-highcharts';
import { DialogModule } from 'primeng/dialog';
import { GrantModule } from '../grant/grant/grant.module';
@NgModule({
  declarations: [
    FranchiseListComponent,
    AddFranchiseComponent,
    UpdateFranchiseComponent,
    ViewFranchiseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    KeyFilterModule,
    FranchiseRoutingModule,
    CdkStepperModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BasicModule.forRoot(),
    MultiSelectModule,
    TabViewModule,
    DialogModule,
    ChartModule,
    GrantModule
  ]
})
export class FranchiseModule { }
