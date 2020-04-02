import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolInvoiceComponent } from './school-invoice/school-invoice.component';
import { SchoolViewComponent } from './school-view/school-view.component';
import { SchoolCreateComponent} from './school-create/school-create.component';
import { BasicModule } from '../../basic/basic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
@NgModule({
    declarations: [SchoolViewComponent, SchoolInvoiceComponent,SchoolCreateComponent],
    imports: [
      CommonModule,
      SchoolRoutingModule,
      ReactiveFormsModule,
      DialogModule,
      BasicModule.forRoot()
     
    ],
    providers: [DatePipe]
  })
  export class SchoolModule { }