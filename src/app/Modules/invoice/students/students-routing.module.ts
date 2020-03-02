import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentInvoiceComponent } from './student-invoice/student-invoice.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  {
    path:'',
    component: StudentInvoiceComponent
  },
  {
    path: 'view/:name/:id',
    component: StudentViewComponent,
    data: {
      breadcrumbs: 'View',
      title: 'Student invoice details',
      superParentPath: 'invoices'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
