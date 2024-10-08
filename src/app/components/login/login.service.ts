import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { Users } from '../users/';
import { Login } from './'
import { environment } from 'src/environments/environment';
const urlPage = environment.apiUrl + '/api/Authenticate';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: HttpClient,
    public router: Router
    ) { }

  async signOut(): Promise<void> {
    window.sessionStorage.clear();
    await window.location.reload();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: Users): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): Users {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return new Users();
  }

  async login(username: string, password: string) : Promise<any> {
    var login = new Login();
    login.password = password;
    login.userName = username;
    const categories$ = await this.http.post(urlPage, login, httpOptions);
    return await lastValueFrom(categories$);
  }
  public IsSingned() : boolean{
    let isLoged = (this.GetTokenString() ?? "") != "";
    if (!isLoged){
      //this.router.navigate(['/login']);
    }
      return isLoged;
  }

  public GetTokenString() : string{
    let token = window.sessionStorage.getItem(TOKEN_KEY) ?? "";
    return token;
  }
  public GetBearerTokenString() : string{
    return "Bearer " + this.GetTokenString();
  }

  public GetHeaters() : HttpHeaders{
    return new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': this.GetBearerTokenString()
      }
    )
  }

  public GetHeaterDonwloadCSV() : HttpHeaders{
    return new HttpHeaders(
      {
        'Content-Type':'application/csv; charset=utf-8',
        'Authorization': this.GetBearerTokenString()
      }
    )
  }
}
