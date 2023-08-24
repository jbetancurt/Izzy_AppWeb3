import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Account, AccountService } from './';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() inAcctID : string = "";
  Account : Account = new Account;
  age = 0;
  statusCodeAlert = false;
  _loaderShow : boolean = false;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;

  constructor(
    public dialog: MatDialog, 
    private _AccountService : AccountService
  ) { }

  ngOnInit(): void {
    if (this.inAcctID != "") {
      this.LoadAccount(this.inAcctID);
    }
  }

  
  ChargeForm(id? : string){
    if (id ?? 0 > 0){
      this.inAcctID = id ?? "0";
      this.dialog.open(
        this.callAPIDialog
      ).afterClosed()
      .subscribe(() => this.refreshParent(id));;
    }
  }
  refreshParent(id? : string){
    //console.log(id ?? 0)
  }

  public LoadAccount(AcctID : string) : void{
    this._loaderShow = true;
    this._AccountService.Get(AcctID).subscribe({
      next: (data : Account) => { 
        this.Account = data;
        var fromDate = this.Account.fromDate ?? new Date();
        var dateOfBirth = this.Account.dateOfBirth ?? new Date();
        var times = new Date(fromDate).getTime() - new Date(dateOfBirth).getTime();
        var diff = Math.abs(times);
        this.age = Math.floor(diff/ (1000 * 3600 * 24) / 365.25);
        this.statusCodeAlert = false;
        if ((this.Account.statusCode ?? "") == "800" || (this.Account.statusCode ?? "") == "900"){
          this.statusCodeAlert = true;
        }
        this._loaderShow = false;
       },
      error: (err : string) => { console.error(err); }
   });
  }
}
