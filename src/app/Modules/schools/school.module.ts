import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [
    SchoolListComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    KeyFilterModule
  ]
})
export class SchoolModule { }
