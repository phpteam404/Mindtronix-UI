import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineUsersListComponent } from './online-users-list/online-users-list.component';
import { UpdateOnlineUsersComponent } from './update-online-users/update-online-users.component';


const routes: Routes = [
  {
    path:'',
    component: OnlineUsersListComponent
  },
  {
    path: 'update/:id',
    component: UpdateOnlineUsersComponent,
    data: {
      breadcrumbs: 'Add User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineUsersRoutingModule { }
