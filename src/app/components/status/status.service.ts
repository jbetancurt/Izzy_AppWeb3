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

  public ColorByStatus(status : number) : string{
    let color = "8b8787"; 
    if ((status >= 0 && status <= 500) || status === 900){
      color = '8b8787'
    }
    else if (status >= 560 && status <= 590){
      color = 'f78496'
    }
    else if (status === 801 || status === 903 || status === 935){
      color = '6ee96e'
    }
    else if (status === 945|| status === 900){
      color = 'e96e78'
    }
    return '#' + color;
  }
}
