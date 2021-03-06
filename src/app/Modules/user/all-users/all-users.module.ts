import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllUsersRoutingModule } from './all-users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { BasicModule } from '../../basic/basic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IsGrantedDirective } from 'src/app/utils/is-granted.directive';
import { GrantModule } from '../../grant/grant/grant.module';

@NgModule({
  declarations: [
    UsersListComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AllUsersRoutingModule,
    ReactiveFormsModule,
    BasicModule.forRoot(),
    GrantModule
  ]
})
export class AllUsersModule { }
