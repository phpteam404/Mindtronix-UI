import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './Students/add-student/add-student.component';
import { UpdateStudentComponent } from './Students/update-student/update-student.component';
import { TrainerListComponent } from './Trainers/trainer-list/trainer-list.component';
import { AddTrainerComponent } from './Trainers/add-trainer/add-trainer.component';
import { UpdateTrainerComponent } from './Trainers/update-trainer/update-trainer.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../Modules/user/Students/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'Students'
    }
  },  
  {
    path: 'students',
    loadChildren: () => import('../../Modules/user/Students/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'Students'
    }
  },
  {
    path: 'trainers',
    loadChildren: () => import('../../Modules/user/Trainers/trainer.module').then(m => m.TrainerModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'Trainers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
