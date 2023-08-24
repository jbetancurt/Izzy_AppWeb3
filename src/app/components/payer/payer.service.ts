import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payer } from './';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})


export class PayerService {
  _Payer? : Payer[];
  lstPayers = '/api/Payers/list';
  urlPage = '/api/Payers';
  
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(private httpClient : HttpClient, private loginService : LoginService) { }

  public async list(acctID : string) :Promise<Observable<Payer[]>>{
    return this.httpClient.get<Payer[]>(this.lstPayers + '/' + acctID, this.httpOptions);
  }
  public List(acctID : string): Observable<Payer[]>{
    return this.httpClient.get<Payer[]>(this.lstPayers + '/' + acctID, this.httpOptions);
  }

  public Get(id : string): Observable<Payer>{    
    return this.httpClient.get<Payer>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_Payer : Payer): Observable<Payer>{    
    return this.httpClient.put<Payer>(this.urlPage + '/' + (_Payer.acctID), _Payer, this.httpOptions);
  }

  public Create(_Payer : Payer): Observable<Payer>{    
    return this.httpClient.post<Payer>(this.urlPage, _Payer, this.httpOptions);
  }
  
  public Insert(_Payer : Payer): Observable<Payer>{    
    return this.httpClient.post<Payer>(this.urlPage , _Payer, this.httpOptions);
  }
}
