import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MasterRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,

  ]
})
export class MasterModule { }
