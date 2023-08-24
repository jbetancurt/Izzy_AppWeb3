import { Component, Input, OnInit } from '@angular/core';
import { Client, ClientService } from '../../client/';
import { Project, ProjectService } from '../../project/';
import { Account, AccountService } from '../../account/';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {  
  @Input() inAcctID: string = "";
  allClients : Client[] = [];
  ListProjects : Project[] = [];
  Account : Account = new Account;
  addAccount : Account = new Account;
  formImportAccount : UntypedFormGroup = new UntypedFormGroup({});
  searchTerm?: string;
  age? : number;

  titulo = 'Edit Account Information';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe, 
    private activatedRoute: ActivatedRoute,  
    private _ProjectService : ProjectService,    
    private _AccountService : AccountService, 
    private _ClientService : ClientService
  ) { }

  public LoadAccount(AcctID : string) : void{
    
    this._AccountService.Get(AcctID).subscribe({
      next: (data : any) => { 
        this.Account = data;
        this.SetForm(this.Account);
        
        this.loadClient();
        this.LoadProjects(this.Account.clientCode ?? '');
        
      },
      error: (err : string) => { console.error(err); }
    });
  }

  

  public resetForm() {
    this.Account.userID = -1;
    this.Account.acctID = -1;
    this.Account.projectCode = "";
    this.Account.masterCode = "";
    this.Account.clientCode = "";
    this.Account.postDate = new Date;
    this.Account.placementDate = new Date;
    this.Account.firstName = "";
    this.Account.lastName = "";
    this.Account.middleName = "";
    

    this.SetForm(this.Account);
  }
  public ChargeForm(account : any | Account){
    //alert(JSON.stringify(users));   
    this.resetForm();
    this.SetForm(account);
  }
  public NewFormUser(){
    let account : Account = new Account;
    account.acctID = -1;
    //alert(JSON.stringify(account));
    this.SetForm(account);
  }

  public SetForm(account :  Account){   
    console.log(JSON.stringify(account)); 
    if (this.Account.dateOfBirth && this.Account.fromDate)
    {
      var diff = Math.abs(new Date(this.Account.fromDate).getTime() - new Date(this.Account.dateOfBirth).getTime());
      this.age = Math.floor(diff/ (1000 * 3600 * 24) / 365.25);
    }
    this.formImportAccount = this.formBuilder.group({
      userID: [account.userID, Validators.required],
      acctID: [account.acctID, Validators.required],
      masterCode: [account.masterCode, Validators.required],
      clientCode: [account.clientCode, Validators.required],
      projectCode: [account.projectCode, Validators.required],
      postDate: [account.postDate, Validators.required],
      placementDate: [account.placementDate, Validators.required],
      firstName: [account.firstName, Validators.required],
      middleName: [account.middleName],
      lastName: [account.lastName, Validators.required],
      //statusCode: [account.statusCode, Validators.required],
      address1: [account.address1, Validators.required],
      address2: [account.address2],
      submitDate: [account.submitDate],
      autoClose: [account.autoClose],
      city: [account.city],
      state: [account.state],
      zip: [account.zip],
      lastBillDate: [account.lastBillDate],
      phone1: [account.phone1],
      phone2: [account.phone2],
      socialSec: [account.socialSec],
      idNumber: [account.idNumber],
      gender: [account.gender],
      dateOfBirth: [this.datePipe.transform(account.dateOfBirth ?? new Date(), 'yyyy-MM-ddTHH:mm')],
      clientRef1: [account.clientRef1, Validators.required],
      serviceCode: [account.serviceCode, Validators.required],

      rpUseOnLtr: [account.rpUseOnLtr],
      rpLastName: [account.rpLastName],
      rpFirstName: [account.rpFirstName],
      rpMiddleName: [account.rpMiddleName],
      rpAddress1: [account.rpAddress1],
      rpAddress2: [account.rpAddress2],
      rpCity: [account.rpCity],
      rpState: [account.rpState],
      rpZip: [account.rpZip],
      rpCountry: [account.rpCountry],
      rpPhone1: [account.rpPhone1],
      rpSocialSec: [account.rpSocialSec],
      rpDateOfBirth: [this.datePipe.transform(account.rpDateOfBirth ?? new Date(), 'yyyy-MM-ddTHH:mm')],
      relationship: [account.relationship],
      employerName: [account.employerName],
      empAddress1: [account.empAddress1],
      empAddress2: [account.empAddress2],
      empCity: [account.empCity],
      empState: [account.empState],
      empZip: [account.empZip],
      empPhone: [account.empPhone],
      fromDate: [this.datePipe.transform(account.fromDate ?? new Date(), 'yyyy-MM-ddTHH:mm')],
      totalCharges: [account.totalCharges],
      toDate: [this.datePipe.transform(account.toDate ?? new Date(), 'yyyy-MM-ddTHH:mm')],
      priorPayments: [account.priorPayments],
      finClassCode: [account.finClassCode],
      priorAdjustments: [account.priorAdjustments],
      assignedAmount: [account.assignedAmount],
      payments: [account.payments],
      lastBillType: [account.lastBillType],
      adjustments: [account.adjustments],
      balanceDue: [account.balanceDue],
      miscText1: [account.miscText1],
      miscText2: [account.miscText2]

    });
  }
  ngOnInit(): void {
    this.resetForm();
    this.activatedRoute.params.subscribe(params => {
      this.SetForm(this.Account);
      let paramid = params['id'];
      this.LoadAccount(this.inAcctID == "" ? paramid : this.inAcctID);
    });
  }

  loadClient(): void{
    this._ClientService.List().subscribe({
      next: (data : any) => { 
        this.allClients = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }

  EditAccount() : void{
    console.log("sub");
    // ç
    this.addAccount = this.formImportAccount.value;
    console.log(JSON.stringify(this.addAccount));
    console.log(this.addAccount.rpDateOfBirth);
    console.log(this.Account.dateOfBirth);
  }
  
  LoadProjects(ClientCode : string) : void{
    this._ProjectService.List(ClientCode).subscribe({
      next: (data : any) => { 
        this.ListProjects = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }

  CopyToRP(){
    this.Account.rpDateOfBirth = this.Account.dateOfBirth;

    this.formImportAccount.patchValue({
      rpLastName: [this.Account.lastName],
      rpFirstName: [this.Account.firstName],
      rpMiddleName: [this.Account.middleName],
      rpAddress1: [this.Account.address1],
      rpAddress2: [this.Account.address2],
      rpCity: [this.Account.city],
      rpState: [this.Account.state],
      rpZip: [this.Account.zip],
      rpPhone1: [this.Account.phone1],
      rpSocialSec: [this.Account.socialSec],
      rpDateOfBirth: [this.Account.dateOfBirth != null ? this.Account.dateOfBirth : null]
    });
  }

}


