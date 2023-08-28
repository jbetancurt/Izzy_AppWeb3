import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login';
import { HomeComponent } from './pages/home/home.component';
import { ChangePasswordComponent } from './pages/change-password';
import { ImportAccountsComponent } from './pages/import-accounts';
import { MedifaxExportComponent } from './pages/medifax-export';
import { ProcessLetterComponent } from './pages/process-letter';
import { TicklerComponent } from './pages/tickler';
import { ProcessWorkQComponent } from './pages/process-work-q';
import { AdvancedSearchComponent } from './pages/advanced-search';
import { ClientRefSearchComponent } from './pages/client-ref-search';
import { PagesComponent } from './pages/pages';
import { UsersComponent } from './pages/users';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'File/ChangePasswordComponent', component: ChangePasswordComponent },
  { path: 'Tools/ImportAccountsComponent', component: ImportAccountsComponent },
  { path: 'Tools/MedifaxExportComponent', component: MedifaxExportComponent },
  { path: 'Tools/ProcessLetterComponent', component: ProcessLetterComponent },
  { path: 'Hospital/TicklerComponent', component: TicklerComponent },
  { path: 'Hospital/ProcessWorkQComponent', component: ProcessWorkQComponent },
  { path: 'Hospital/AdvancedSearchComponent', component: AdvancedSearchComponent },
  { path: 'Hospital/ClientRefSearchComponent', component: ClientRefSearchComponent },
  { path: 'Administration/PagesComponent', component: PagesComponent },
  { path: 'Administration/UsersComponent', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
