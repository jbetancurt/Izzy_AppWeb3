import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';


import { AccountComponent } from './components/account/account.component';
import { ActionComponent } from './components/action/action.component';
import { ClientComponent } from './components/client/client.component';
import { LetterQComponent } from './components/letter-q/letter-q.component';
import { NoteComponent } from './components/note/note.component';
import { PayerComponent } from './components/payer/payer.component';
import { ProjectComponent } from './components/project/project.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RepLetterQComponent } from './components/rep-letter-q/rep-letter-q.component';
import { RolComponent } from './components/rol/rol.component';
import { StatusComponent } from './components/status/status.component';
import { UsersComponent } from './components/users/users.component';
import { AccountFormComponent } from './components/account/account-form/account-form.component';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { LoginComponent } from './components/login/login.component';

import { BrandComponent } from './components/brand/brand.component';
import { NoteEditComponent } from './components/note/note-edit/note-edit.component';
import { MenuComponent } from './components/menu/menu.component';


import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ImportAccountsComponent } from './pages/import-accounts/import-accounts.component';
import { MedifaxExportComponent } from './pages/medifax-export/medifax-export.component';
import { ProcessLetterComponent } from './pages/process-letter/process-letter.component';
import { TicklerComponent } from './pages/tickler/tickler.component';
import { ProcessWorkQComponent } from './pages/process-work-q/process-work-q.component';
import { AdvancedSearchComponent } from './pages/advanced-search/advanced-search.component';
import { ClientRefSearchComponent } from './pages/client-ref-search/client-ref-search.component';
import { PagesComponent } from './pages/pages/pages.component';
import { SpinnerComponent } from './Interceptors/spinner/spinner.component';
import { HttpLoadingInterceptor } from './Interceptors/http-loading.interceptor';
import { DemographicComponent } from './components/account/demographic/demographic.component';
import { AccountTiedComponent } from './components/account/account-tied/account-tied.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ActionComponent,
    ClientComponent,
    LetterQComponent,
    NoteComponent,
    PayerComponent,
    ProjectComponent,
    PaymentComponent,
    RepLetterQComponent,
    RolComponent,
    StatusComponent,
    UsersComponent,
    AccountFormComponent,
    AccountListComponent,
    LoginComponent,
    BrandComponent,
    NoteEditComponent,
    ChangePasswordComponent,
    ImportAccountsComponent,
    MedifaxExportComponent,
    ProcessLetterComponent,
    TicklerComponent,
    ProcessWorkQComponent,
    AdvancedSearchComponent,
    ClientRefSearchComponent,
    PagesComponent,
    MenuComponent,
    SpinnerComponent,
    DemographicComponent,
    AccountTiedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
