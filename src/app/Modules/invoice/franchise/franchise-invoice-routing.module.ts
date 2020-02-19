import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseListComponent } from './franchise-list/franchise-list.component';

const routes: Routes = [
    {
      path: '',
      component: FranchiseListComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FranchiseInvoiceRoutingModule { }