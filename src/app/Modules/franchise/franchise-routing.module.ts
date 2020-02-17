import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseListComponent } from './franchise-list/franchise.component';
import { AddFranchiseComponent } from './add-franchise/add-franchise.component';
import { UpdateFranchiseComponent } from './update-franchise/update-franchise.component';

const routes: Routes = [
  {
    path: '',
    component: FranchiseListComponent
  },
  {
    path: 'add',
    component: AddFranchiseComponent,
    data: {
      braedcrumbs: 'Add'
    }
  },
  {
    path: 'update',
    component: UpdateFranchiseComponent,
    data: {
      braedcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
