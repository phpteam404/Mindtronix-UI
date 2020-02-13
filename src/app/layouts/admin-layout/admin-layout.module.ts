import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { FeeComponent } from 'src/app/fee/fee.component';
import { LearningCenterComponent } from 'src/app/learning-center/learning-center.component';
import { UserComponent } from 'src/app/Modules/user/user.component';
import { FranchiseComponent } from 'src/app/Modules/franchise/franchise.component';
import { PortalManagementComponent } from 'src/app/Modules/portal-management/portal-management.component';
import { ProfilesManagementComponent } from 'src/app/Modules/profiles-management/profiles-management.component';
import { SchoolsComponent } from 'src/app/Modules/schools/schools.component';
import { PaymentManagementComponent } from 'src/app/Modules/payment-management/payment-management.component';
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
    KeyFilterModule
  ],
  declarations: [
    BasicComponent,
    UserComponent,
    FeeComponent,
    FranchiseComponent,
    LearningCenterComponent,
    PortalManagementComponent,
    ProfilesManagementComponent,
    SchoolsComponent,
    PaymentManagementComponent
  ]
})

export class AdminLayoutModule {}
