import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    // {
    //   path: '',
    //   component: StudentInvoiceComponent,
    //   canActivate: [AuthGuard],
    //   data: {
    //       breadcrumb: 'Students'
    //   }
    // },  
    // {
    //   path: 'students_invoice',
    //   component: StudentInvoiceComponent,
    //   canActivate: [AuthGuard],
    //   data: {
    //       breadcrumb: 'Students Invoice'
    //   }
    // },
    // {
    //     path: 'franchise_invoice',
    //     component: FranchiseInvoiceComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //         breadcrumb: 'Franchise Invoice'
    //     }
    // },
    // {
    //     path: 'online_users_invoice',
    //     component: OnlineUsersInvoiceComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //         breadcrumb: 'Online Users Invoice'
    //     }
    // },

    // {
    //     path: '',
    //     loadChildren: () => import('../../Modules/invoice/students/students.module').then(m => m.StudentsModule),
    //     canActivate: [AuthGuard],
    //     data: {
    //       breadcrumb: 'Students Invoice'
    //     }
    //   },
    {
        path: 'students_invoice',
        loadChildren: ()=> import('../../Modules/invoice/students/students.module').then(m=> m.StudentsModule),
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Students Invoice'
        }
      },
      {
        path: 'franchise_invoice',
        loadChildren: () => import('../../Modules/invoice/franchise/franchise.module').then(m => m.FranchiseModule),
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Franchise Invoice'
        }
      }, 
      {
        path: 'online_users_invoice',
        loadChildren: () => import('../../Modules/invoice/online/online.module').then(m => m.OnlineModule),
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Online Users Invoice'
        }
      }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }