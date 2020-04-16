import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineUsersInvoiceComponent } from './online-users-invoice/online-users-invoice.component';
import { OnlineUsersViewComponent } from './online-users-view/online-users-view.component';

const routes: Routes = [
  {
    path:'',
    component: OnlineUsersInvoiceComponent
  },
  {
    path: 'view/:name/:id',
    component: OnlineUsersViewComponent,
    data: {
      breadcrumbs: 'View',
      title: 'Online User invoice details',
      superParentPath: 'invoices'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRoutingModule { }
