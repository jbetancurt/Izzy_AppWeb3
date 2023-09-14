import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Account, AccountTied } from '../account.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { Login } from '../../login';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-account-tied',
  templateUrl: './account-tied.component.html',
  styleUrls: ['./account-tied.component.css']
})
export class AccountTiedComponent implements OnInit {
  reactiveForm = new FormGroup({
    textOption: new FormControl(1, [Validators.required]),
  });
  dataSource!: MatTableDataSource<AccountTied>;
  @Input() inAcctID: string = "";
  AccountObj : Account = new Account;
  AccountTiedList : AccountTied[] = [];
  collectionSize: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public AcctIDSelected = 0;
  
  displayedColumns: string[] = [
    'acctid', 'acctName', 'proximity','acctAddress', 'acctCity', 'socialsec',
    'dateOfBirth','acction'];
  
  
  constructor(
    private modalService: MatDialog,
    public datepipe: DatePipe,
    public dialog: MatDialog, 
    private _AccountService : AccountService
  ) { }
  ngOnInit(): void {
    this.LoadAccount(this.inAcctID);
    if (this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      this.reactiveForm.setValue({
        textOption: 1,
       
      });
    }
  }
  

  public LoadAccount(AcctID : string) : void{
    this._AccountService.Get(AcctID).subscribe({
      next: (data : Account) => { 
        this.AccountObj = data;
        if (this.AccountObj.socialSec){
          this.searchSelectionChange(1);
          this.reactiveForm.setValue({
            textOption: 1,
           
          });
        }
        else{
          
          this.reactiveForm.setValue({
            textOption: 2,
           
          });
          this.searchSelectionChange(2);
        }
        
       },
      error: (err : string) => { console.error(err); }
   });
  }

  searchSelectionChange(Option : any){
    
    let numeId = Number(this.inAcctID);
    if ((this.AccountObj.acctID ?? 0 > 0) && numeId > 0)
    {
      if (Number(Option) === 1){
        console.log(this.AccountObj.socialSec);
        this.loadAccountTied(Number(Option),this.AccountObj.socialSec ?? "++++",numeId);
      }
      else if (Number(Option) === 2 || Number(Option) === 3){
        let name = (this.AccountObj.firstName ?? "") + (this.AccountObj.middleName ?? "") + (this.AccountObj.lastName ?? "");
        if (!name || name === ""){
          name = "++++"
        }
        console.log(name);
        this.loadAccountTied(Number(Option),name,numeId);
      }
    }
    
  }
  
  loadAccountTied(Option : number, Value : string, AcctId : number): void{
        
    this._AccountService.ListTied(Option , Value , AcctId ).subscribe({
      next: (data : any) => { 
        
        this.AccountTiedList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.collectionSize = data.length;
        
      },
      error: (err : string) => { console.error(err); }
    });
  } 

  SetAccountId(id : number){
    if (id ?? 0 > 0){
      this.AcctIDSelected = (id ?? 0);
      this.modalService.closeAll();
    }  
  }

}
