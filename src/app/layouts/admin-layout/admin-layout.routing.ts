import { Routes } from '@angular/router';
import { BasicComponent } from 'src/app/basic/basic.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LearningCenterComponent } from 'src/app/learning-center/learning-center.component';
import { FranchiseComponent } from 'src/app/Modules/franchise/franchise.component';
import { PortalManagementComponent } from 'src/app/Modules/portal-management/portal-management.component';
import { UserComponent } from 'src/app/Modules/user/user.component';
import { ProfilesManagementComponent } from 'src/app/Modules/profiles-management/profiles-management.component';
import { SchoolsComponent } from 'src/app/Modules/schools/schools.component';
import { PaymentManagementComponent } from 'src/app/Modules/payment-management/payment-management.component';
import { DigitalContentUploadComponent } from 'src/app/Modules/digital-content-upload/digital-content-upload.component';


export const AdminLayoutRoutes: Routes = [   
    { path: '', component: LearningCenterComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: BasicComponent, canActivate: [AuthGuard]  },
    { path: 'user-management', component: UserComponent, canActivate: [AuthGuard]  },
    { path: 'franchise', component: FranchiseComponent, canActivate: [AuthGuard]  },
    { path: 'profile-management', component: ProfilesManagementComponent, canActivate: [AuthGuard]  },
    { path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard] },
    { path: 'payment-management', component: PaymentManagementComponent, canActivate: [AuthGuard] },
    { path: 'digital-content-upload', component: DigitalContentUploadComponent, canActivate: [AuthGuard] },
    { path: 'portal-management', component: PortalManagementComponent, canActivate: [AuthGuard] }
];
