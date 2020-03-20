import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { TooltipModule } from 'primeng/tooltip';
// import { DatexPipe } from 'src/app/customPipesDirectives/_pipe/datex.pipe';

const BasicModuleImports = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    DialogModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    PasswordModule,
    TooltipModule,
    FileUploadModule,
    CheckboxModule,
    KeyFilterModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
    // DatexPipe
]

@NgModule({
  declarations: [],
  imports: [
    BasicModuleImports
  ],
  exports:[
    BasicModuleImports
  ],
  providers:[ConfirmationService,DatePipe]
})
export class BasicModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasicModule
    };
  }
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,environment.prdAssetPath+'/assets/i18n/');
}