import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [
  {
    path:'',
    component: UsersListComponent
  },
  {
    path:'add',
    component: AddUserComponent,
    data: {
      breadcrumbs: 'Add User'
    }
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent,
    data: {
      breadcrumbs: 'Update User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllUsersRoutingModule { }
