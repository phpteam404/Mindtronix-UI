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
    component: AddUserComponent
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllUsersRoutingModule { }
