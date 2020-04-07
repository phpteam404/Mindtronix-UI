import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineRoutingModule } from './online-routing.module';
import { OnlineUsersInvoiceComponent } from './online-users-invoice/online-users-invoice.component';
import { OnlineUsersViewComponent } from './online-users-view/online-users-view.component';
import { BasicModule } from '../../basic/basic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { GrantModule } from '../../grant/grant/grant.module';
@NgModule({
  declarations: [OnlineUsersInvoiceComponent,OnlineUsersViewComponent],
  imports: [
    CommonModule,
    OnlineRoutingModule,
      ReactiveFormsModule,
      DialogModule,
      BasicModule.forRoot(),
      GrantModule
  ]
})
export class OnlineModule { }
