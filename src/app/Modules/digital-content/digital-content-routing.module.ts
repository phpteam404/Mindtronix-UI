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
    component: DigitalContentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'add',
    component: AddDigitalContentComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'view/:id',
    component: ViewDigitalContentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateDigitalContentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalContentRoutingModule { }
