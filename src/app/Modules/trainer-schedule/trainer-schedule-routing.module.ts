import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';

const routes: Routes = [
  {
    path:'',
    component: TrainerListComponent
  },
  {
    path: 'add',
    component: AddTrainerComponent,
    data: {
      breadcrumbs: 'Create Schedule',
      title: 'Trainer'
    }
  },
  {
    //path: 'update/:id',
    path:'update/:name/:id',
    component: UpdateTrainerComponent,
    data: {
      breadcrumbs: 'Update Schedule',
      title: 'Topic'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerScheduleRoutingModule { }
