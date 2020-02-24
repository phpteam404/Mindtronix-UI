import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineUsersRoutingModule } from './online-users-routing.module';
import { OnlineUsersListComponent } from './online-users-list/online-users-list.component';
import { UpdateOnlineUsersComponent } from './update-online-users/update-online-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BasicModule } from '../../basic/basic.module';


@NgModule({
  declarations: [
    OnlineUsersListComponent,
    UpdateOnlineUsersComponent
  ],
  imports: [
    CommonModule,
    OnlineUsersRoutingModule,
    ReactiveFormsModule,
    BasicModule.forRoot()
  ]
})
export class OnlineUsersModule { }
