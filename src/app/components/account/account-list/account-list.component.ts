import { Component, OnInit, EventEmitter, ViewChild, TemplateRef, Output } from '@angular/core';
import { Account, AccountService, AccountFormComponent } from '../index';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { Client, ClientService } from '../../client';
import { AccountTiedComponent } from '../account-tied/account-tied.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit  {
  SearchForm = new FormGroup({
    SelectClient: new FormControl("0", [Validators.required]),
    SelectOptions: new FormControl(1, [Validators.required]),
    textValue: new FormControl("", [Validators.required]),
  });
  dataSource!: MatTableDataSource<Account>;
  displayedColumns: string[] = ['Client_code', 'clientRef1', 'Account', 'SSN', 'DOB','Name', 'Address', 'Phone','RP_Name', 'Status_Code', 'Service_Code','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() outAcctID: EventEmitter<string> = new EventEmitter<string>();
  _Accounts : Account[] = [];
  allAccounts : Account[] = [];
  _Clients : Client[] = [];
  allClients : Client[] = [];
  searchTerm: string = "";
  page = 1;
  pageSize = 10;
  collectionSize: number = 0;
  currentRate = 8;
  modAcctID : string = "";
  searchValue : string = ''; 
  disabledButton : boolean = true;
  listOption = [{
    value: 1,
    label: "SSN"
  }, {
    value: 2,
    label: "Full Name"
  }, {
    value: 3,
    label: "First Name"
  }, {
    value: 4,
    label: "Last Name"
  }, {
    value: 5,
    label: "Client Reference"
  }, {
    value: 6,
    label: "Phone"
  }, {
    value: 7,
    label: "Address"
  }, {
    value: 8,
    label: "Rp Full Name"
  }, {
    value: 9,
    label: "Service Code"
  }, {    
    value: 10,
    label: "Account Number"
  }];

  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;

  constructor(
    public datepipe: DatePipe,
    public dialog: MatDialog, 
    private _ClientService : ClientService,
    private _AccountService : AccountService
  ) { }

  ngOnInit(): void {
    this.loadClient();
    if (this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
  }

  public ChageValues(clientCode : String, optios : string, value : String) : void{
    this.disabledButton = value == "" || optios == '';
    this._Accounts = [];
    this.allAccounts = [];
    this.collectionSize = 0; 
    this.searchValue = value.toUpperCase();
    
  }

  loadClient(): void{
    
    this._ClientService.List().subscribe({
      next: (data : any) => { 
        this._Clients = data;
        this.allClients = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }
  public ChageOptions(clientCode : String, optios : string, value : String) : void{
    this.searchValue = '';
    console.log(value);
    
    this.disabledButton = value == "" || optios == '';
    this._Accounts = [];
    this.allAccounts = [];
    this.collectionSize = 0; 
  }

  search(e: any): void {
    console.log((new Date).toDateString());
    
    let value = (<HTMLTextAreaElement>e.target).value;
    this._Accounts = this.allAccounts.filter(
        (val) => (((val.clientCode ?? "").trim() ?? "")
        + (val.projectCode ?? "")
        + (val.socialSec ?? "")
        + (val.clientRef1 ?? "")
        + (val.dateOfBirth  == null ? "" : this.datepipe.transform(val.dateOfBirth, 'MM/dd/yyyy'))
        + (val.firstName ?? "")
        + (val.middleName ?? "")
        + (val.lastName ?? "")
        
        + (val.rpFirstName ?? "")
        + (val.rpMiddleName ?? "")
        + (val.rpLastName ?? "")
        
        + (val.address1 ?? "")
        + (val.address2 ?? "")
        + (val.city ?? "")
        + (val.phone1 ?? "")
        + (val.serviceCode ?? "")
        
        + (val.rpFullName ?? "")
      ).toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
    );
    //this.dataSource 
    this.dataSource = new MatTableDataSource(this._Accounts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.collectionSize = this._Accounts.length;
    
  }


  refreshParent(id? : number){
    //console.log(id ?? 0)
  }

  ShowInfo(id? : number){
    if (id ?? 0 > 0){
      this.outAcctID.emit((id ?? 0).toString());
    }
  }

  ChargeForm(id? : number){
    if (id ?? 0 > 0){
      this.modAcctID = (id ?? 0).toString();
      this.dialog.open(
        this.callAPIDialog, {
          width: '80%',
        }
      ).afterClosed()
      .subscribe(() => this.refreshParent(id));;
    }
  }
  public LoadAccounts(Option : string, Value :string, clientCode : string) : void{
    //this._loaderShow = true;
    this._AccountService.List(Option,Value, clientCode).subscribe((data : Account[]) => {
      this.allAccounts = data;
        this._Accounts = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.collectionSize = data.length;         
    });
    

  }

  ShowAccountTied(id : string){
    const dialogRef = this.dialog.open(AccountTiedComponent, {
      width: '80%',
    });
    dialogRef.componentInstance.inAcctID = id;

    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.AcctIDSelected > 0){
        this.SearchForm.setValue({
          SelectClient: "0",
          SelectOptions: 10,
          textValue: dialogRef.componentInstance.AcctIDSelected.toString(),
         
        });
        this.LoadAccounts("10", dialogRef.componentInstance.AcctIDSelected.toString(), "0");
      
      }
      
    });
  }
  
  public ChageClient(clientCode : String, optios : string, value : String) : void{
    //this.searchValue = '';
    this.disabledButton = value == "" || optios == '';
    this._Accounts = []; 
    this.allAccounts = [];
    this.collectionSize = 0; 
  }
}
