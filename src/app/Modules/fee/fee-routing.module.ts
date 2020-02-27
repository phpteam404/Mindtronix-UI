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
      breadcrumbs: 'Add'
    }
  },
  {
    path: 'update/:id',
    component: UpdateFeeComponent,
    data: {
      breadcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
