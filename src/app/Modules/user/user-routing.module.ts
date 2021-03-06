import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../Modules/user/all-users/all-users.module').then(m => m.AllUsersModule),
    data: {
      breadcrumb: 'All Users'
    }
  },
  {
    path: 'all-users',
    loadChildren: () => import('../../Modules/user/all-users/all-users.module').then(m => m.AllUsersModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'All Users'
    }
  }, 
  {
    path: 'students',
    loadChildren: () => import('../../Modules/user/Students/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Students'
    }
  },  
  {
    path: 'online-users',
    loadChildren: () => import('../../Modules/user/OnlineUsers/online-users.module').then(m => m.OnlineUsersModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Online Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
