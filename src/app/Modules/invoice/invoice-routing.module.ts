import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('../../Modules/invoice/students/student-invoice.module').then(m => m.StudentInvoiceModule),
      canActivate: [AuthGuard],
      data: {
          breadcrumbs: 'Students'
      }
    },  
    {
      path: 'students_invoice',
      loadChildren: () => import('../../Modules/invoice/students/student-invoice.module').then(m => m.StudentInvoiceModule),
      canActivate: [AuthGuard],
      data: {
          breadcrumbs: 'Students'
      }
    },
    {
        path: 'franchise_invoice',
        loadChildren: () => import('../../Modules/invoice/franchise/franchise-invoice.module').then(m => m.FranchiseInvoiceModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Franchise'
        }
    },
    {
        path: 'online_users_invoice',
        loadChildren: () => import('../../Modules/invoice/online/online-invoice.module').then(m => m.onlineInvoiceModule),
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