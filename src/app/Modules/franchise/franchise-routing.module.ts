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
      braedcrumbs: 'Add'
    }
  },
  {
    path: 'update/:id',
    component: UpdateFranchiseComponent,
    data: {
      braedcrumbs: 'Update'
    }
  },
  {
    path: 'view/:id',
    component: ViewFranchiseComponent,
    data: {
      braedcrumbs: 'View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
