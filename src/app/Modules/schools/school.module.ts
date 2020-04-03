import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BasicModule } from '../basic/basic.module';
import { GrantModule } from '../grant/grant/grant.module';

@NgModule({
  declarations: [
    SchoolListComponent,
    AddSchoolComponent,
    UpdateSchoolComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SchoolRoutingModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    KeyFilterModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    BasicModule.forRoot(),
    GrantModule
  ]
})
export class SchoolModule { }
