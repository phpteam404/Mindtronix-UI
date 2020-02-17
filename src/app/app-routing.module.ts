import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BasicComponent } from './basic/basic.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

console.log('AppRoutingModule--');
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    // loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
