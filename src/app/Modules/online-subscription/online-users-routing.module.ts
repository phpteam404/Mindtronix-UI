import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineUsersViewComponent} from 'src/app/Modules/online-subscription/online-users-view/online-users-view.component';
import {OnlineUsersListComponent} from 'src/app/Modules/online-subscription/online-users-list/online-users-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
    {
      path: '',
      component: OnlineUsersListComponent,
    },
    {
      path: 'view/:name/:id',
      component: OnlineUsersViewComponent,
      canActivate:[AuthGuard],
      data: {
        breadcrumbs: 'View',
        title:'Online User'
      }
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OnlineUsersRoutingModule { }