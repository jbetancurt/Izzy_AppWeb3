import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, LoginService } from './index';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : Login = new Login();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = "";
  strpUrl = environment.apiUrl;
  Nombre = '';
  form! : UntypedFormGroup;
  private formSubmitAttempt: boolean = false;

  constructor(
    private router: Router, 
    private loginService: LoginService,
    private fb: UntypedFormBuilder     
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({ 
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.loginService.GetTokenString()!= "") {
      this.isLoggedIn = true;
      this.role = this.loginService.getUser().rol.name ?? "";
      this.isLoggedIn = !!this.loginService.GetTokenString();
      if (this.isLoggedIn){
        this.router.navigate(['/']);
      }
    }
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitAttempt = true;  
      const { userName, password } = this.form.value;
      //console.log(JSON.stringify(this.login));
      this.loginService.login(userName, password).subscribe({
        next: data => {
          this.loginService.saveToken(data.token);
          this.loginService.saveUser(data.user);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.loginService.getUser().rol.name ?? "";
          this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  }
  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

}
