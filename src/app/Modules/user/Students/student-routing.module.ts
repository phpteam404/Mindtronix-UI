import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentListComponent } from './student-list/student-list.component';


const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'add',
    component: AddStudentComponent,
    data: {
      braedcrumbs: 'Add Student'
    }
  },
  {
    path: 'update',
    component: UpdateStudentComponent,
    data: {
      braedcrumbs: 'Update Student'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
