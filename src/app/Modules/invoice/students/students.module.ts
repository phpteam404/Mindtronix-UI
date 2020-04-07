import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentInvoiceComponent } from './student-invoice/student-invoice.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { BasicModule } from '../../basic/basic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { GrantModule } from '../../grant/grant/grant.module';
@NgModule({
  declarations: [StudentViewComponent, StudentInvoiceComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    BasicModule.forRoot(),
    GrantModule
   
  ],
  providers: [DatePipe]
})
export class StudentsModule { }
