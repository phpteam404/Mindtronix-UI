import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsGrantedDirective } from 'src/app/utils/is-granted.directive';



@NgModule({
  declarations: [IsGrantedDirective],
  exports:[IsGrantedDirective],
  imports: [
    CommonModule
  ]
})
export class GrantModule { }
