import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ProcessWorkQService } from './process-work-q.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/components/account';
import { ProcessWorkQRequest } from './process-work-q.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Client, ClientService } from 'src/app/components/client';
import { Status, StatusService } from 'src/app/components/status';
import { LetterQService } from 'src/app/components/letter-q';
import { Project, ProjectService } from 'src/app/components/project';
import { AccountTiedComponent } from 'src/app/components/account/account-tied/account-tied.component';

@Component({
  selector: 'app-process-work-q',
  templateUrl: './process-work-q.component.html',
  styleUrls: ['./process-work-q.component.css']
})
export class ProcessWorkQComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  _Clients : Client[] = [];
  allClients : Client[] = [];
  _ClientsMaster : Client[] = [];
  allClientsMaster : Client[] = [];
  _Status : Status[] = [];
  _Project : Project[] = [];
  public OpenInfo = false;
  public modAcctID = "";
  public displayAccount = false;
  title = "Procces Work Q";
  allAccounts : Account[] = [];
  allAccountsFilter : Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  displayedColumns: string[] = ['Account', 'Name', 'Client_code', 'projectCode', 'clientRef1', 'fromDate', 'balanceDue', 'Status_Code', 'nextReview', 'admitAge', 'gender', 'SSN', 'DOB','Address', 'Phone','RP_Name', 'Service_Code','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  page = 1;
  pageSize = 10;
  collectionSize: number = 0;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  @Output() outAcctID: EventEmitter<string> = new EventEmitter<string>();



  SearchForm = new FormGroup({
    clientCode: new FormControl(""),
    masterCode: new FormControl(""),
    cLientOrMaster: new FormControl("0", [Validators.required]),
    nextReview: new FormControl(null),
    finClassCode: new FormControl(""),
    statusCode: new FormControl([""]),
    placementDate: new FormControl(null),
    balanceDue: new FormControl(0),
    projectCode: new FormControl([""]),
  });
  
  GetAgeFrom(FromDate? : Date, dob? :Date) : string{
    let retString = "";
    if (FromDate && dob){
      let timeDiff = Math.abs(new Date(FromDate).getTime() - new Date(dob).getTime());
      let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      if (age && age > 0){
        retString = age.toString();
      }
    }
    return retString;
  }

  
  loadClient(): void{
    this._ClientService.List().subscribe({
      next: (data : Client[]) => { 
        let clientLst = data.filter(x => x.isMaster != true);
        this._Clients = clientLst;
        this.allClients = clientLst;
      },
      error: (err : string) => { console.error(err); }
    });
  }

  
  loadMasterClient(): void{
    this._ClientService.List().subscribe({
      next: (data : Client[]) => { 
        let clientLst = data.filter(x => x.isMaster == true);
        this._ClientsMaster = clientLst;
        this.allClientsMaster = clientLst;
      },
      error: (err : string) => { console.error(err); }
    });
  }
  setAcctID(vAcctID: string) {
    this.modAcctID = vAcctID;
    this.displayAccount = !this.displayAccount;
    this.OpenInfo = this.displayAccount;
    //this.displayAccount = true;
    console.log(vAcctID + "  setAcctID") ;
  }

  constructor(
    public datepipe: DatePipe,
    public dialog: MatDialog, 
    private _ClientService : ClientService,
    private _StatusService : StatusService,
    private _ProjectService : ProjectService,
    private processWorkQService : ProcessWorkQService
  ) { }
  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
  
  public LoadStatus(): void{
    this._Status = []; 
    this._StatusService.List().subscribe({
      next: (data : Status[]) => { 
        //console.log(data);
        this._Status = data.filter(X => Number(X.statusCode ?? "0") <600);
      },
      error: (err : string) => { console.error(err); }
    });
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

  ShowInfo(id? : number){
    console.log(id);
    if (id ?? 0 > 0){
      console.log(id);
      this.outAcctID.emit((id ?? 0).toString());
    }
  }

  ShowAccountTied(id : string){
    const dialogRef = this.dialog.open(AccountTiedComponent, {
      width: '80%',
    });
    dialogRef.componentInstance.inAcctID = id;

    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.AcctIDSelected > 0){

        this.LoadAccounts();
      
      }
      
    });
  }

  
  

  refreshParent(id? : number){
    //console.log(id ?? 0)
  }
  
  public LoadProjects(mastercode : string): void{
    this._Project = []; 
    this._ProjectService.List(mastercode).subscribe({
      next: (data : Project[]) => { 
        //console.log(data);
        this._Project = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }
  ChangeMasterClient(value : string) : void
  {
    this.LoadProjects(value);
  }

  ngOnInit(): void {
    this.loadClient();
    this.loadMasterClient();
    this.LoadStatus();
    if (this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
  }
  
  public LoadAccounts() : void{
    let request :ProcessWorkQRequest = this.SearchForm.value as ProcessWorkQRequest;
    console.log(request);
    
    //this._loaderShow = true;

    this.processWorkQService.List(request).subscribe((data : Account[]) => {
      console.log(data);
      
      this.allAccounts = data;
      this.allAccountsFilter = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.collectionSize = data.length;         
    });
  }

}
