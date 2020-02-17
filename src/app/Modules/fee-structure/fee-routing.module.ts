import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { AddFeeComponent } from './add-Fee/add-Fee.component';
import { UpdateFeeComponent } from './update-Fee/update-Fee.component';

const routes: Routes = [
  {
    path: '',
    component: FeeStructureListComponent
  },
  {
    path: 'add',
    component: AddFeeComponent,
    data: {
      braedcrumbs: 'Add'
    }
  },
  {
    path: 'update',
    component: UpdateFeeComponent,
    data: {
      braedcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
