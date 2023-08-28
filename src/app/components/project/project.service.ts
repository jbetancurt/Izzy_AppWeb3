import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  _Project? : Project[];
  urlPage = environment.apiUrl + '/api/Project';
  httpOptions = { headers : this.loginService.GetHeaters()};
  
  constructor(private httpClient : HttpClient, private loginService : LoginService) { }

  public async list(ClientCode : string) :Promise<Observable<Project[]>>{
    return this.httpClient.get<Project[]>(this.urlPage + '/' + ClientCode, this.httpOptions);
  }
  public List(ClientCode : string): Observable<Project[]>{
    //this.httpClient.get<Project[]>(this.urlPage + '/' + ClientCode, this.httpOptions).subscribe(
    //  data => {
    //    this._Project = data;

    //    //console.log(this._Project);
    //    return data;
    //  }
    //)
    return this.httpClient.get<Project[]>(this.urlPage + '/' + ClientCode, this.httpOptions);
  }

  public Get(id : string): Observable<Project>{    
    return this.httpClient.get<Project>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_Project : Project): Observable<Project>{    
    return this.httpClient.put<Project>(this.urlPage + '/' + (_Project.clientCode), _Project, this.httpOptions);
  }

  public Create(_Project : Project): Observable<Project>{    
    return this.httpClient.post<Project>(this.urlPage, _Project, this.httpOptions);
  }
  
  public Insert(_Project : Project): Observable<Project>{    
    return this.httpClient.post<Project>(this.urlPage , _Project, this.httpOptions);
  }
}
