import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './Students/add-student/add-student.component';
import { StudentListComponent } from './Students/student-list/student-list.component';
import { UpdateStudentComponent } from './Students/update-student/update-student.component';
import { TrainerListComponent } from './Trainers/trainer-list/trainer-list.component';
import { AddTrainerComponent } from './Trainers/add-trainer/add-trainer.component';
import { UpdateTrainerComponent } from './Trainers/update-trainer/update-trainer.component';

const routes: Routes = [
 
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    data: {
      braedcrumbs: 'Add Student'
    }
  },
  {
    path: 'update-student',
    component: UpdateStudentComponent,
    data: {
      braedcrumbs: 'Update Student'
    }
  },
  {
    path: 'trainers',
    component: TrainerListComponent
  },
  {
    path: 'add-trainer',
    component: AddTrainerComponent,
    data: {
      braedcrumbs: 'Add Trainer'
    }
  },
  {
    path: 'update-trainer',
    component: UpdateTrainerComponent,
    data: {
      braedcrumbs: 'Update Trainer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
