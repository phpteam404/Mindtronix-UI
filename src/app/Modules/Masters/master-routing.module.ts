import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ContentLevelsComponent } from './content-levels/content-levels.component';
import { TagsComponent } from './tags/tags.component';
import { GradeComponent } from './grade/grade.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';


const routes: Routes = [
  {
    path:'',
    component: CategoriesComponent
  },
  {
    path:'categories',
    component: CategoriesComponent
  },
  {
    path:'content-levels',
    component: ContentLevelsComponent
  },
  {
    path:'tags',
    component: TagsComponent
  },
  {
    path:'grades',
    component: GradeComponent
  },
  {
    path:'sub_categories',
    component: SubCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
