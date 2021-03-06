import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalContentRoutingModule } from './digital-content-routing.module';
import { DigitalContentListComponent } from './digital-content-list/digital-content-list.component';
import { AddDigitalContentComponent } from './add-digital-content/add-digital-content.component';
import { UpdateDigitalContentComponent } from './update-digital-content/update-digital-content.component';
import { ViewDigitalContentComponent } from './view-digital-content/view-digital-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModule } from '../basic/basic.module';
import { MatFileUploadModule } from 'mat-file-upload';
import { ChartModule } from 'angular-highcharts';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EditorModule } from 'primeng/editor';
import { GrantModule } from '../grant/grant/grant.module';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {ClipboardModule} from '@angular/cdk/clipboard';
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
    BasicModule.forRoot(),
    MatFileUploadModule,
    ChartModule,
    DialogModule,
    MultiSelectModule,
    ChipsModule,
    OverlayPanelModule,
    EditorModule,
    GrantModule,
    YouTubePlayerModule,
    ClipboardModule
  ]
})
export class DigitalContentModule { }
