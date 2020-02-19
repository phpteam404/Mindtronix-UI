import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent
  },
  {
    path: 'add',
    component: AddSchoolComponent,
    data: {
      braedcrumbs: 'Add'
    }
  },
  {
    path: 'update',
    component: UpdateSchoolComponent,
    data: {
      braedcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
