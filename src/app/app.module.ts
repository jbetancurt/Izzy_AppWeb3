import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    NoteEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
