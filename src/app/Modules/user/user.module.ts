import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarModule,
    UserRoutingModule,
    DropdownModule    
  ]
})
export class UserModule { }
