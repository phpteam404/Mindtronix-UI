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
      braedcrumbs: 'Create Schedule'
    }
  },
  {
    path: 'update/:id',
    component: UpdateTrainerComponent,
    data: {
      braedcrumbs: 'Update Schedule'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerScheduleRoutingModule { }
