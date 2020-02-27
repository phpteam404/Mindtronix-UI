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
      breadcrumbs: 'Add'
    }
  },
  {
    path: 'update/:id',
    component: UpdateSchoolComponent,
    data: {
      breadcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
