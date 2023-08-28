import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login';
import { Status } from './status.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  _Status? : Status[];
  urlPage = environment.apiUrl + '/api/Status';
  httpOptions = { headers : this.loginService.GetHeaters() };


  constructor(
    private httpClient : HttpClient, 
    private loginService : LoginService    
  ) { }

  public List(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.urlPage, this.httpOptions);
  }
}
