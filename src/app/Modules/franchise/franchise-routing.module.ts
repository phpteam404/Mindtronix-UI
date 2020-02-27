import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseListComponent } from './franchise-list/franchise.component';
import { AddFranchiseComponent } from './add-franchise/add-franchise.component';
import { UpdateFranchiseComponent } from './update-franchise/update-franchise.component';
import { ViewFranchiseComponent } from './view-franchise/view-franchise.component';

const routes: Routes = [
  {
    path: '',
    component: FranchiseListComponent
  },
  {
    path: 'add',
    component: AddFranchiseComponent,
    data: {
      breadcrumbs: 'Add Franchise'
    }
  },
  {
    path: 'update/:id',
    component: UpdateFranchiseComponent,
    data: {
      breadcrumbs: 'Update Franchise'
    }
  },
  {
    path: 'view/:name/:id',
    component: ViewFranchiseComponent,
    data: {
      breadcrumbs: 'View Franchise'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
