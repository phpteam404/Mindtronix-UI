import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    StudentListComponent,
    AddStudentComponent,
    UpdateStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    TableModule,
    ButtonModule,
    KeyFilterModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
