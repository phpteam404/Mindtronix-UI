import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './utils/http-interceptor.service';
import { AppHttpClientService, AppHttpClientCreator } from './utils/app-http-client.service';
import { ErrorHandlerService } from './utils/error-handler.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import {TableModule,} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { BasicModule } from './Modules/basic/basic.module';
import { DialogModule } from 'primeng/dialog';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    BsDropdownModule.forRoot(),
    BasicModule.forRoot(),
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: AppHttpClientService,
      useFactory: AppHttpClientCreator,
      deps: [HttpClient]
    },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,environment.prdAssetPath+'/assets/i18n/');
}
