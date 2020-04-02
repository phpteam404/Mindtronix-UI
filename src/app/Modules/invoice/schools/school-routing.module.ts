import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolCreateComponent} from 'src/app/Modules/invoice/schools/school-create/school-create.component';
import {SchoolInvoiceComponent} from 'src/app/Modules/invoice/schools/school-invoice/school-invoice.component';
import {SchoolViewComponent} from 'src/app/Modules/invoice/schools/school-view/school-view.component';

const routes: Routes = [
    {
      path:'',
      component: SchoolInvoiceComponent
    },
    {
      path: 'view/:name/:id',
      component: SchoolViewComponent,
      data: {
        breadcrumbs: 'View',
        title: 'School invoice details',
        superParentPath: 'invoices'
      }
    },
    {
        path:'add',
        component: SchoolCreateComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
export class SchoolRoutingModule { }