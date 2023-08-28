import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './components/loader/loader.service';
import { LoginService } from './components/login';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$ = this.loader.loading$.pipe(delay(0));
  title = 'ADA App';
  public VarNombreUser = this.loginService.getUser().domainUserName ?? this.loginService.getUser().loginID ?? "";
  public isLogged = this.loginService.IsSingned();
  constructor(
    private cdr: ChangeDetectorRef,
    public loader: LoaderService,
    public loginService : LoginService
  ) {}
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
