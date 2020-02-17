import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './Students/student-list/student-list.component';
import { TrainerListComponent } from './Trainers/trainer-list/trainer-list.component';
import { UpdateTrainerComponent } from './Trainers/update-trainer/update-trainer.component';
import { UpdateStudentComponent } from './Students/update-student/update-student.component';
import { AddTrainerComponent } from './Trainers/add-trainer/add-trainer.component';
import { AddStudentComponent } from './Students/add-student/add-student.component';
import { UserRoutingModule } from './user-routing.module';



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
    UserRoutingModule
  ]
})
export class UserModule { }
