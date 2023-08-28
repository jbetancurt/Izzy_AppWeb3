import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  _Client? : Client[];
  urlPage = environment.apiUrl + '/api/Client';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(private httpClient : HttpClient, private loginService : LoginService) { }

  public async list() :Promise<Observable<Client[]>>{
    return this.httpClient.get<Client[]>(this.urlPage, this.httpOptions);
  }
  public List(): Observable<Client[]>{
    //this.httpClient.get<Client[]>(this.urlPage, this.httpOptions).subscribe(
    //  data => {
    //    this._Client = data;

    //    return data;
    //  }
    //)
    return this.httpClient.get<Client[]>(this.urlPage, this.httpOptions);
  }

  public Get(id : string): Observable<Client>{    
    return this.httpClient.get<Client>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_Client : Client): Observable<Client>{    
    return this.httpClient.put<Client>(this.urlPage + '/' + (_Client.clientCode), _Client, this.httpOptions);
  }

  public Create(_Client : Client): Observable<Client>{    
    return this.httpClient.post<Client>(this.urlPage, _Client, this.httpOptions);
  }
  
  public Insert(_Client : Client): Observable<Client>{    
    return this.httpClient.post<Client>(this.urlPage , _Client, this.httpOptions);
  }
}
