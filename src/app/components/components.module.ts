import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RemoveUnderScorePipe } from '../customPipesDirectives/_pipe/remove-under-score.pipe';
import { ApplyUnderScorePipe } from '../customPipesDirectives/_pipe/apply-under-score.pipe';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    RemoveUnderScorePipe,
    ApplyUnderScorePipe
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    RemoveUnderScorePipe,
    ApplyUnderScorePipe
  ]
})
export class ComponentsModule { }
