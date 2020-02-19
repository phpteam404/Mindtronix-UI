import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FranchiseInvoiceComponent } from './franchise/franchise-invoice/franchise-invoice.component';
import { OnlineUsersInvoiceComponent } from './online/online-users-invoice/online-users-invoice.component';
import { StudentInvoiceComponent } from './students/student-invoice/student-invoice.component';
const routes: Routes = [
    {
      path: '',
      component: StudentInvoiceComponent,
      canActivate: [AuthGuard],
      data: {
          breadcrumbs: 'Students'
      }
    },  
    {
      path: 'students_invoice',
      component: StudentInvoiceComponent,
      canActivate: [AuthGuard],
      data: {
          breadcrumbs: 'Students'
      }
    },
    {
        path: 'franchise_invoice',
        component: FranchiseInvoiceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Franchise'
        }
    },
    {
        path: 'online_users_invoice',
        component: OnlineUsersInvoiceComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Online Users'
        }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }