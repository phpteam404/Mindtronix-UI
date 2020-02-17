import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseListComponent } from './franchise-list/franchise.component';
import { AddFranchiseComponent } from './add-franchise/add-franchise.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BasicModule } from '../basic/basic.module';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';

import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFranchiseComponent } from './update-franchise/update-franchise.component';

@NgModule({
  declarations: [
    FranchiseListComponent,
    AddFranchiseComponent,
    UpdateFranchiseComponent
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
    BasicModule.forRoot()
  ]
})
export class FranchiseModule { }
