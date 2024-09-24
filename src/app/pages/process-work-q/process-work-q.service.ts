import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/components/account';
import { LoginService } from 'src/app/components/login';
import { environment } from 'src/environments/environment';
import { ProcessWorkQRequest } from './process-work-q.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessWorkQService {
  urlPage = environment.apiUrl + '/api/Account/AccountWorkQ';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(
    private httpClient : HttpClient, 
    private loginService : LoginService
    ) { }
  public async List(request :ProcessWorkQRequest): Promise<Account[]>{
    const categories$ = await this.httpClient.post<Account[]>(this.urlPage, JSON.stringify(request), this.httpOptions);

    return await lastValueFrom(categories$);
  }

  public async EditAccount(account: Account): Promise<Account> {
    const editedAccount$ = await this.httpClient.put<Account>(`${this.urlPage}/${account.acctID}`, JSON.stringify(account), this.httpOptions);
    return await lastValueFrom(editedAccount$);
  }
}
