import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Account, AccountTied } from './';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() outAcctID: EventEmitter<string> = new EventEmitter<string>();
  @Output() accountEmit: EventEmitter<Account> = new EventEmitter<Account>();
  _Account? : Account[];
  urlPage = environment.apiUrl + '/api/Account';
  urlPageXProject = environment.apiUrl + '/api/AccountByProyect';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(
    private httpClient : HttpClient, 
    private loginService : LoginService
    ) { }
  public async list(Option : string, Value : string, clientCode : string) :Promise<Account[]>{
    const categories$ = await this.httpClient.get<Account[]>(this.urlPage + '/' + Option+ '/' + Value+ '/' + clientCode, this.httpOptions);
    return await lastValueFrom(categories$);
  }
  public async List(Option : string, Value : string, clientCode : string): Promise<Account[]>{
    const categories$ = await this.httpClient.get<Account[]>(this.urlPage + '/' + Option+ '/' + Value+ '/' + clientCode, this.httpOptions);
    return await lastValueFrom(categories$);
  }
  
  public async ListTied(Option : number, Value : string, AcctId : number): Promise<any[]>{
    const categories$ = await this.httpClient.get<AccountTied[]>(this.urlPage + '/AccountTied/' + Option+ '/' + Value+ '/' + AcctId, this.httpOptions);
    return await lastValueFrom(categories$);
  }

  public Get(id : string): Observable<Account>{ 
    let url = this.urlPage + "/" + id; 
    //console.log(url);  
    let obj =this.httpClient.get<Account>(url, this.httpOptions);
    return obj;
  }

  public Edit(_Account : Account): Observable<Account>{  
    
    //console.log(this.urlPage + '/' + (_Account.acctID));  
    return this.httpClient.put<Account>(this.urlPage + '/' + (_Account.acctID), _Account, this.httpOptions);
  }

  public Create(_Account : Account): Observable<Account>{    
    return this.httpClient.post<Account>(this.urlPage, _Account, this.httpOptions);
  }
  
  public Insert(_Account : Account): Observable<Account>{    
    return this.httpClient.post<Account>(this.urlPage , _Account, this.httpOptions);
  }
}
