import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterQ, Letter, RepLetterQ } from './';
import { Client } from '../client';
import { LoginService } from '../login/login.service';
import { Action } from '../action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LetterQService {
  _LetterQ? : LetterQ[];
  lstLetterQs = environment.apiUrl + '/api/LetterQ/list';
  urlPage = environment.apiUrl + '/api/LetterQ';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(
    private httpClient : HttpClient, 
    private loginService : LoginService
  ) { }
  public ListClient() :Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.urlPage + '/ListClient', this.httpOptions);
  }

  public ListAction() :Observable<Action[]>{
    return this.httpClient.get<Action[]>(this.urlPage + '/ListAction', this.httpOptions);
  }

  public ListLetter() :Observable<Letter[]>{
    return this.httpClient.get<Letter[]>(this.urlPage + '/ListLetter', this.httpOptions);
  }
  public async list(acctID : string) :Promise<Observable<LetterQ[]>>{
    return this.httpClient.get<LetterQ[]>(this.lstLetterQs + '/' + acctID, this.httpOptions);
  }

  
  public List(acctID : string): Observable<LetterQ[]>{
    return this.httpClient.get<LetterQ[]>(this.lstLetterQs + '/' + acctID, this.httpOptions);
  }

  public Get(id : string): Observable<LetterQ>{    
    return this.httpClient.get<LetterQ>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_LetterQ : LetterQ): Observable<LetterQ>{    
    return this.httpClient.put<LetterQ>(this.urlPage + '/' + (_LetterQ.acctID), _LetterQ, this.httpOptions);
  }

  public Create(_LetterQ : LetterQ): Observable<LetterQ>{
    return this.httpClient.post<LetterQ>(this.urlPage, _LetterQ, this.httpOptions);
  }
  
  public Insert(_LetterQ : LetterQ): Observable<LetterQ>{    
    return this.httpClient.post<LetterQ>(this.urlPage , _LetterQ, this.httpOptions);
  }
  
  
  public Rep(clientCode : string, LetterCode : string): Observable<LetterQ[]>{
    if (clientCode == ""){
      clientCode = "__";
    }
    //alert(this.urlPage + '/Rep/' + LetterCode + '/' + clientCode);
    return this.httpClient.get<LetterQ[]>(this.urlPage + '/Rep/' + LetterCode + '/' + clientCode, this.httpOptions);
  }
  
  public download(clientCode : string, LetterCode : string){    
    return this.httpClient.get(this.urlPage + '/RepDownload/' + LetterCode + '/' + clientCode, 
    {
      headers : new HttpHeaders({
        'Content-Type':'application/csv; charset=utf-8',
        'Authorization': 'Bearer ' + this.loginService.GetTokenString() 
      }),
      responseType: 'text'
    });
  }
  
}
