import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('../../Modules/user/Students/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'Students'
    }
  }, */
  {
    path: '',
    loadChildren: () => import('../../Modules/user/all-users/all-users.module').then(m => m.AllUsersModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'All Users'
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
  },
  {
    path: 'all-users',
    loadChildren: () => import('../../Modules/user/all-users/all-users.module').then(m => m.AllUsersModule),
    canActivate: [AuthGuard],
    data: {
        breadcrumbs: 'All Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
