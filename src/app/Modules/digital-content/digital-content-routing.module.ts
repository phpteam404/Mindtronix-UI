import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalContentListComponent } from './digital-content-list/digital-content-list.component';
import { AddDigitalContentComponent } from './add-digital-content/add-digital-content.component';
import { ViewDigitalContentComponent } from './view-digital-content/view-digital-content.component';
import { UpdateDigitalContentComponent } from './update-digital-content/update-digital-content.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path:'',
    component: DigitalContentListComponent
  },
  {
    path:'add',
    component: AddDigitalContentComponent,
    data: {
      breadcrumbs: 'Add'
    }
  },
  {
    path:'view/:id',
    component: ViewDigitalContentComponent,
    data: {
      breadcrumbs: 'View'
    }
  },
  {
    path: 'update/:id',
    component: UpdateDigitalContentComponent,
    data: {
      breadcrumbs: 'Update'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalContentRoutingModule { }
