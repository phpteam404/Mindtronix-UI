import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerScheduleRoutingModule } from './trainer-schedule-routing.module';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';
import { BasicModule } from '../basic/basic.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AddTrainerComponent, TrainerListComponent, UpdateTrainerComponent],
  imports: [
    CommonModule,
    TrainerScheduleRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    KeyFilterModule,
    BasicModule.forRoot()
  ]
})
export class TrainerScheduleModule { }
