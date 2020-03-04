import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { UpdateEmailTemplateComponent } from './update-email-template/update-email-template.component';
import { BasicModule } from '../basic/basic.module';


@NgModule({
  declarations: [
    EmailTemplateListComponent,
    UpdateEmailTemplateComponent
  ],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    BasicModule.forRoot()
  ]
})
export class EmailTemplateModule { }
