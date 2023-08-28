import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PaymentService {
  _Payment? : Payment[];
  lstPayments = environment.apiUrl + '/api/Payments/list';
  urlPage = environment.apiUrl + '/api/Payments';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(private httpClient : HttpClient, private loginService : LoginService) { }

  public async list(acctID : string) :Promise<Observable<Payment[]>>{
    return this.httpClient.get<Payment[]>(this.lstPayments + '/' + acctID, this.httpOptions);
  }
  public List(acctID : string): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(this.lstPayments + '/' + acctID, this.httpOptions);
  }

  public Get(id : string): Observable<Payment>{    
    return this.httpClient.get<Payment>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_Payment : Payment): Observable<Payment>{    
    return this.httpClient.put<Payment>(this.urlPage + '/' + (_Payment.acctID), _Payment, this.httpOptions);
  }

  public Create(_Payment : Payment): Observable<Payment>{    
    return this.httpClient.post<Payment>(this.urlPage, _Payment, this.httpOptions);
  }
  
  public Insert(_Payment : Payment): Observable<Payment>{    
    return this.httpClient.post<Payment>(this.urlPage , _Payment, this.httpOptions);
  }
}
