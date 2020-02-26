import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalContentRoutingModule } from './digital-content-routing.module';
import { DigitalContentListComponent } from './digital-content-list/digital-content-list.component';
import { AddDigitalContentComponent } from './add-digital-content/add-digital-content.component';
import { UpdateDigitalContentComponent } from './update-digital-content/update-digital-content.component';
import { ViewDigitalContentComponent } from './view-digital-content/view-digital-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModule } from '../basic/basic.module';


@NgModule({
  declarations: [
    DigitalContentListComponent,
    AddDigitalContentComponent,
    UpdateDigitalContentComponent,
    ViewDigitalContentComponent
  ],
  imports: [
    CommonModule,
    DigitalContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BasicModule.forRoot()
  ]
})
export class DigitalContentModule { }