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
      breadcrumbs: 'Add Student'
    }
  },
  {
    path: 'update/:id',
    component: UpdateStudentComponent,
    data: {
      breadcrumbs: 'Update Student'
    }
  },
  {
    path: 'view/:id',
    component: ViewStudentComponent,
    data: {
      breadcrumbs: 'view Student'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
