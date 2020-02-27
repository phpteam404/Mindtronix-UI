import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeListComponent } from './fee-list/fee-list.component';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';


const routes: Routes = [
  {
    path:'',
    component: FeeListComponent,
  },
  {
    path: 'add',
    component: AddFeeComponent,
    data: {
      breadcrumbs: 'Create'
    }
  },
  {
    path: 'update/:name/:id',
    component: UpdateFeeComponent,
    data: {
      breadcrumbs: 'Update',
      title: 'Fee Structure'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
