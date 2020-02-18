import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';
import { BasicComponent } from 'src/app/basic/basic.component';
import { BasicModule } from '../../basic/basic.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    TrainerListComponent,
    AddTrainerComponent,
    UpdateTrainerComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    TableModule,
    ButtonModule,
    KeyFilterModule,
    InputTextModule,
    InputTextareaModule,
    BasicModule.forRoot()
  ]
})
export class TrainerModule { }
