import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})


export class NoteService {
  _Note? : Note[];
  lstNotes = '/api/Notes/list';
  urlPage = '/api/Notes';
  httpOptions = { headers : this.loginService.GetHeaters()};

  constructor(private httpClient : HttpClient, private loginService : LoginService) { }

  public async list(acctID : string) :Promise<Observable<Note[]>>{
    return this.httpClient.get<Note[]>(this.lstNotes + '/' + acctID, this.httpOptions);
  }
  public List(acctID : string): Observable<Note[]>{
    return this.httpClient.get<Note[]>(this.lstNotes + '/' + acctID, this.httpOptions);
  }

  public Get(id : string): Observable<Note>{    
    return this.httpClient.get<Note>(this.urlPage + '/' + id, this.httpOptions);
  }

  public Edit(_Note : Note): Observable<Note>{    
    return this.httpClient.put<Note>(this.urlPage + '/' + (_Note.acctID), _Note, this.httpOptions);
  }

  public Create(_Note : Note): Observable<Note>{ 
    console.log(_Note); 
      
    return this.httpClient.post<Note>(this.urlPage, _Note, this.httpOptions);
  }
  
  public Insert(_Note : Note): Observable<Note>{    
    return this.httpClient.post<Note>(this.urlPage , _Note, this.httpOptions);
  }
}
