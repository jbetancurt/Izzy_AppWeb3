import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../../components/account';
import { Client, ClientService } from '../../components/client';

@Component({
  selector: 'app-import-accounts',
  templateUrl: './import-accounts.component.html',
  styleUrls: ['./import-accounts.component.scss']
})
export class ImportAccountsComponent implements OnInit {
  allClients : Client[] = [];
  keyNames : string[] = [];

  constructor(
    private _ClientService : ClientService
    ) { }

  ngOnInit(): void {
    this.loadClient();
    this.keyNames = Object.keys(new Account);
    //console.log(keyNames);
  }
  
  public ChageClient(clientCode : String) : void{

  }
  loadClient(): void{
    
    this._ClientService.List().subscribe({
      next: (data : any) => { 
        this.allClients = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }

}
