import { Routes } from '@angular/router';
import { BasicComponent } from 'src/app/basic/basic.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleManagementComponent } from 'src/app/Modules/Roles/role-management/role-management.component';
import { MasterComponent } from 'src/app/Modules/Masters/master.component';
import { ProfileComponent } from 'src/app/Modules/profile/profile.component';
import { OnlineSubscriptionComponent } from 'src/app/Modules/online-subscription/online-subscription.component';
import { DashboardComponent } from 'src/app/Modules/dashboard/dashboard.component';
import { StudentDashboardComponent } from 'src/app/Modules/student-dashboard/student-dashboard.component';
import { PageNotFoundComponent } from 'src/app/Modules/page-not-found/page-not-found.component';


export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: BasicComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Dashboard'
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Dashboard'
        }
    },
    {
        path: 'dashboard1',
        component: StudentDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Student Dashboard'
        }
    },
    {
        path: 'users',
        loadChildren: () => import('../../Modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Users'
        }
    },
    {
        path: 'invoices',
        loadChildren: () => import('../../Modules/invoice/invoice.module').then(m => m.InvoiceModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Invoices'
        }   
    },
    {
        path: 'franchise',
        loadChildren: () => import('../../Modules/franchise/franchise.module').then(m => m.FranchiseModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Franchise'
        }
    },
    {
        path: 'fee_management',
        loadChildren: () => import('../../Modules/fee/fee.module').then(m => m.FeeModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Fee Management'
        }
    },
    {
        path: 'ticket',
        loadChildren: () => import('../../Modules/ticket/ticket.module').then(m => m.TicketModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Tickets'
        }
    },{
        path: 'masters',
        component: MasterComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Masters'
        }
    },
    { 
        path: 'role_access',
        component: RoleManagementComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Role Access'
        }
    },
    { 
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Profile'
        }
    },
    { 
        path: 'schools_management',
        loadChildren: () => import('../../Modules/schools/school.module').then(m => m.SchoolModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'School Management'
        }
    },
   
    { 
        path: 'digital_content',
        loadChildren: () => import('../../Modules/digital-content/digital-content.module').then(m => m.DigitalContentModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Digital Content'
        }
    },
    { 
        path: 'online-subscription',
        component: OnlineSubscriptionComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Online Subscription'
        }
    },
    {
        path: 'trainer-schedule',
        loadChildren: () => import('../../Modules/trainer-schedule/trainer-schedule.module').then(m => m.TrainerScheduleModule ),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Trainer Schedule'
        }
    },
    {
        path: 'orders',
        loadChildren: () => import('../../Modules/order/order.module').then(m => m.OrderModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Orders'
        }
    },
    {
        path: 'email-templates',
        loadChildren: () => import('../../Modules/email-template/email-template.module').then(m => m.EmailTemplateModule),
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Email Templates'
        }
    },
    { 
        path: '404',
        component: PageNotFoundComponent,
        data: {
            breadcrumb: '404'
        }
    },
   
];
