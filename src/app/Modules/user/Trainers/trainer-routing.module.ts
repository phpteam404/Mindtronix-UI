import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';


const routes: Routes = [
  {
    path: '',
    component: TrainerListComponent
  },
  {
    path: 'add',
    component: AddTrainerComponent,
    data: {
      breadcrumbs: 'Add Trainer'
    }
  },
  {
    path: 'update',
    component: UpdateTrainerComponent,
    data: {
      breadcrumbs: 'Update Trainer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
