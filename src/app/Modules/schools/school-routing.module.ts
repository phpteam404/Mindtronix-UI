import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'add',
    component: AddSchoolComponent,
    data: {
      breadcrumbs: 'Create'
    }
  },
  {
    path: 'update/:name/:id?:franchise_id',
    component: UpdateSchoolComponent,
    data: {
      breadcrumbs: 'Update',
      title: 'School'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
