import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { BasicModule } from '../basic/basic.module';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    OrderRoutingModule,
    BasicModule.forRoot()
  ]
})
export class OrderModule { }
