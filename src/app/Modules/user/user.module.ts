import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './Students/student-list/student-list.component';
import { TrainerListComponent } from './Trainers/trainer-list/trainer-list.component';
import { UpdateTrainerComponent } from './Trainers/update-trainer/update-trainer.component';
import { UpdateStudentComponent } from './Students/update-student/update-student.component';
import { AddTrainerComponent } from './Trainers/add-trainer/add-trainer.component';
import { AddStudentComponent } from './Students/add-student/add-student.component';
import { UserRoutingModule } from './user-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';



@NgModule({
  declarations: [
    StudentListComponent,
    UpdateTrainerComponent,
    UpdateStudentComponent,
    AddTrainerComponent,
    AddStudentComponent,
    TrainerListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    ButtonModule,
    KeyFilterModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class UserModule { }
