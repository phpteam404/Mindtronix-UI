import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineUsersRoutingModule } from './online-users-routing.module';
import { OnlineUsersViewComponent } from 'src/app/Modules/online-subscription/online-users-view/online-users-view.component';
import { OnlineUsersListComponent } from 'src/app/Modules/online-subscription/online-users-list/online-users-list.component';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { BasicModule } from '../basic/basic.module';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
    declarations: [
        OnlineUsersListComponent,
        OnlineUsersViewComponent
    ],
    imports: [
        CommonModule,
        OnlineUsersRoutingModule,
        ButtonModule,
        TabViewModule,
        KeyFilterModule,
        InputTextModule,
        BasicModule.forRoot(),
      ]
    })
    export class OnlineUserModule { }