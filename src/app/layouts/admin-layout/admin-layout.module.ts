import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { BasicComponent } from 'src/app/basic/basic.component';
import { UserComponent } from 'src/app/user/user.component';
import { FeeComponent } from 'src/app/fee/fee.component';
import { LearningCenterComponent } from 'src/app/learning-center/learning-center.component';
// import { BasicComponent } from 'src/app/basic/basic.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    // BasicComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    BasicComponent,
    UserComponent,
    FeeComponent,
    LearningCenterComponent
  ]
})

export class AdminLayoutModule {}
