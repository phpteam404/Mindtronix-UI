import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineUsersListComponent } from './online-users-list/online-users-list.component';
const routes: Routes = [
    {
      path: '',
      component: OnlineUsersListComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OnlineInvoiceRoutingModule { }