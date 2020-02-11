import { Routes } from '@angular/router';
import { BasicComponent } from 'src/app/basic/basic.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserComponent } from 'src/app/user/user.component';
import { FeeComponent } from 'src/app/fee/fee.component';
import { LearningCenterComponent } from 'src/app/learning-center/learning-center.component';


export const AdminLayoutRoutes: Routes = [   
    { path: '', component: LearningCenterComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: BasicComponent, canActivate: [AuthGuard]  },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]  },
    { path: 'fee', component: FeeComponent, canActivate: [AuthGuard]  },
    { path: 'learning_center', component: LearningCenterComponent }
];
