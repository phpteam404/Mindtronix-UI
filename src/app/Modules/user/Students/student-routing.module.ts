import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ViewStudentComponent } from './view-student/view-student.component';


const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'add',
    component: AddStudentComponent,
    data: {
      breadcrumbs: 'Create',
      superParentPath: 'users'
    }
  },
  {
    path: 'update/:name/:id?:school_id?:franchise_id',
    component: UpdateStudentComponent,
    data: {
      breadcrumbs: 'Update',
      superParentPath: 'users',
      title: 'Student'
    }
  },
  {
    path: 'view/:name/:id?:school_id?:franchise_id',
    component: ViewStudentComponent,
    data: {
      breadcrumbs: 'View',
      superParentPath: 'users',
      title: 'Student'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
