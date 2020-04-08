import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {BreadcrumbsModule} from "ng6-breadcrumbs";

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { BasicComponent } from 'src/app/basic/basic.component';
import { BasicModule } from 'src/app/Modules/basic/basic.module';
import { RoleManagementComponent } from 'src/app/Modules/Roles/role-management/role-management.component';
import { MasterComponent } from 'src/app/Modules/Masters/master.component';
import {TabViewModule} from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProfileComponent } from 'src/app/Modules/profile/profile.component';
import { DashboardComponent } from 'src/app/Modules/dashboard/dashboard.component';
import { OnlineSubscriptionComponent } from 'src/app/Modules/online-subscription/online-subscription.component';
import { StudentDashboardComponent } from 'src/app/Modules/student-dashboard/student-dashboard.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PageNotFoundComponent } from 'src/app/Modules/page-not-found/page-not-found.component';
import { IsGrantedDirective } from 'src/app/utils/is-granted.directive';
import { GrantModule } from 'src/app/Modules/grant/grant/grant.module';
import { NotificationComponent } from 'src/app/Modules/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ConfirmDialogModule,
    MatTooltipModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    PasswordModule,
    FileUploadModule,
    CheckboxModule,
    KeyFilterModule,
    TabViewModule,
    DialogModule,
    MatIconModule,
    BasicModule.forRoot(),
    BsDropdownModule.forRoot(),
    GrantModule
    // BreadcrumbsModule.forRoot()
  ],
  providers:[ConfirmationService],
  declarations: [
    BasicComponent,
    RoleManagementComponent,
    MasterComponent,
    ProfileComponent,
    DashboardComponent,
    OnlineSubscriptionComponent,
    StudentDashboardComponent,
    PageNotFoundComponent,
    NotificationComponent
    // IsGrantedDirective
  ]
})

export class AdminLayoutModule {}
