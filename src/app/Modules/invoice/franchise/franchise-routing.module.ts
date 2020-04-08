import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseInvoiceComponent } from './franchise-invoice/franchise-invoice.component';
import { FranchiseViewComponent } from './franchise-view/franchise-view.component';

const routes: Routes = [
  {
    path:'',
    component: FranchiseInvoiceComponent
  },
  {
    path: 'view/:name/:id',
    component: FranchiseViewComponent,
    data: {
      breadcrumbs: 'View',
      title: 'Learning Center invoice details',
      superParentPath: 'invoices'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
