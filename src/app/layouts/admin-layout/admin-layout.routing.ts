import { Routes } from '@angular/router';
import { BasicComponent } from 'src/app/basic/basic.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PortalManagementComponent } from 'src/app/Modules/portal-management/portal-management.component';
import { ProfilesManagementComponent } from 'src/app/Modules/profiles-management/profiles-management.component';
import { PaymentManagementComponent } from 'src/app/Modules/payment-management/payment-management.component';
import { RoleManagementComponent } from 'src/app/Modules/Roles/role-management/role-management.component';
import { MasterComponent } from 'src/app/Modules/Masters/master.component';


export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: BasicComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Dashboard'
        }
    },
    {
        path: 'dashboard',
        component: BasicComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Dashboard'
        }
    },
    {
        path: 'users',
        loadChildren: () => import('../../Modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Users'
        }
    },
    {
        path: 'invoices',
        loadChildren: () => import('../../Modules/invoice/invoice.module').then(m => m.InvoiceModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Invoices'
        }   
    },
    {
        path: 'franchise',
        loadChildren: () => import('../../Modules/franchise/franchise.module').then(m => m.FranchiseModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Franchise'
        }
    },
    {
        path: 'fee_management',
        loadChildren: () => import('../../Modules/fee/fee.module').then(m => m.FeeModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Fee Management'
        }
    },
    {
        path: 'ticket',
        loadChildren: () => import('../../Modules/ticket/ticket.module').then(m => m.TicketModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Tickets'
        }
    },{
        path: 'masters',
        component: MasterComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Masters'
        }
    },
    { 
        path: 'role_access',
        component: RoleManagementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Role Access'
        }
    },
    { 
        path: 'profile-management',
        component: ProfilesManagementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Profiles Management'
        }
    },
    { 
        path: 'schools_management',
        loadChildren: () => import('../../Modules/schools/school.module').then(m => m.SchoolModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'School Management'
        }
    },
    { 
        path: 'payment-management',
        component: PaymentManagementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Payment Management'
        }
    },
    { 
        path: 'digital_content',
        loadChildren: () => import('../../Modules/digital-content/digital-content.module').then(m => m.DigitalContentModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Digital Content'
        }
    },
    { 
        path: 'portal-management',
        component: PortalManagementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumbs: 'Portal Management'
        }
    },
   
];
