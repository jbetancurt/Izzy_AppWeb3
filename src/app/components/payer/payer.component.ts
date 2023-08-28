import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payer, PayerService } from '.';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {
  displayedColumns: string[] = ['sequence', 'payerName', 'payerContact', 'payerPhone','address','billDateType','action'];
  @Input() inAcctID : string = "";
  pagePayer = 1;
  payer : Payer = new Payer;
  pageSizePayer = 10;
  collectionSizePayer: number = 0;
  addPayerFormGroup! : UntypedFormGroup;
  _Payers : Payer[] = [];
  dataSource!: MatTableDataSource<Payer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: MatDialog,
    private payerService : PayerService
  ) { }

  ngOnInit(): void {
    this.LoadPayer(this.inAcctID);
  }
  
  
  public LoadPayer(acctID : string): void{
    this.payerService.List(acctID).subscribe({
      next: (data : Payer[]) => { 
        console.log(data);
        
        this._Payers = data;
        this.dataSource = new MatTableDataSource(data);
        if (data != null && data.length > 0){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;          
        }
       },
      error: (err : string) => { console.error(err); }
    });
  }
  
  openNewPayer(content: any){
    let newPayer : Payer = new Payer;
    newPayer.acctID = this.inAcctID == "" ?  0 : Number(this.inAcctID);
    newPayer.payerID = 0;
    newPayer.billDate = new Date();
    this.openWindowAddPayer(content, newPayer);

  }
  
  
  openWindowAddPayer(content : any, inPayer : Payer) {
    this.SetFormPayer(inPayer);
    this.modalService.open(content);
  }
  public SetFormPayer(inPayer :  Payer){
    this.addPayerFormGroup = this.formBuilder.group({      
      payerID : [inPayer.payerID],
      acctID : [inPayer.acctID],
      sequence : [inPayer.sequence],
      payerName : [inPayer.payerName ?? ""],
      payerAddress1 : [inPayer.payerAddress1 ?? ""],
      payerAddress2 : [inPayer.payerAddress2 ?? ""],
      payerCity : [inPayer.payerCity ?? ""],
      payerState : [inPayer.payerState ?? ""],
      payerZip : [inPayer.payerZip ?? ""],
      payerContact : [inPayer.payerContact ?? ""],
      payerPhone : [inPayer.payerPhone ?? ""],
      iDNo : [inPayer.iDNo ?? ""],
      groupNo : [inPayer.groupNo ?? ""],
      billDate : [inPayer.billDate],
      billType : [inPayer.billType ?? ""],
      planNumber : [inPayer.planNumber ?? ""],
      groupName : [inPayer.groupName ?? ""],
      planType : [inPayer.planType ?? ""],
      subscriberName : [inPayer.subscriberName ?? ""],
      subscriberDOB : [inPayer.subscriberDOB],
      dateOfInjury : [inPayer.dateOfInjury],
      effectiveDate : [inPayer.effectiveDate],
      referenceNumber : [inPayer.referenceNumber ?? ""],
      authorizationNumber : [inPayer.authorizationNumber ?? ""],
      authorizationDate : [inPayer.authorizationDate]
      //userID: [inPayer.userID, Validators.required],
      //acctID: [inPayer.acctID, Validators.required]
    });
  
  }
  
  
  openEditPayer(content : any, payer : Payer){
    
    this.SetFormPayer(payer);
    this.openWindowAddPayer(content, payer);

  }
  
  SubmitPayer(){
    this.payer = this.addPayerFormGroup.value;
    console.log(JSON.stringify(this.payer));
    if (this.payer.acctID != null && this.payer.acctID > 0){      
      this.payerService.Edit(this.payer).subscribe({
        next: (data : Payer) => { 
          this.payer = data;
          this.LoadPayer((data.acctID ?? "").toString());
          this.modalService.closeAll();
         },
        error: (err : string) => { console.error(err); }
      });
    }
    else{
      this.payerService.Create(this.payer).subscribe({
        next: (data : Payer) => { 
          this.LoadPayer((data.acctID ?? "").toString());
          this.modalService.closeAll();
         },
        error: (err : string) => { console.error(err); }
      });
    }
    //console.log(this.itemMenu.label);
  }

}
