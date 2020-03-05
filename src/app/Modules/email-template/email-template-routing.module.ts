import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { UpdateEmailTemplateComponent } from './update-email-template/update-email-template.component';


const routes: Routes = [
  {
    path:'',
    component: EmailTemplateListComponent
  },
  {
    path:'update/:name/:id',
    component: UpdateEmailTemplateComponent,
    data: {
      breadcrumbs: 'Update',
      title: 'Email Template'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
