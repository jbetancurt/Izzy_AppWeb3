import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Note, NoteService } from '..';
import { Account, AccountService } from '../../account';
import { Action } from '../../action';
import { Letter, LetterQ, LetterQService } from '../../letter-q';
import { LoginService } from '../../login';
import { Status, StatusService } from '../../status';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  objNote : Note  = new Note;
  objLetterQ : LetterQ = new LetterQ;
  objAccount : Account = new Account;
  checkBoxSendLetterEnable = true;
  checkBoxSendLetterMsn = "";
  addNoteFormGroup : UntypedFormGroup = this.formBuilder.group({      
    actionCode : "",
    noteText : "",
    acctID : "",
    noteDate : new Date,
    isCheked : false,
    EditStatus : false,
    letterCode : "",
    letterDate : new Date,
    SelectMailOption :"",
    statusCode : "",
  });
  sendLetter = false;
  EditStatus = false;
  MailRetunred = false;
  _Status : Status[] = [];
  @Input() inAcctID : string = "";
  _Action : Action[] = [];
  lstLetter : Letter[] = [];
  letterDate = new Date;
  MailReturnedOptions = [
    {id : "1", label : "Rec'd mail return moved left no address unable to forward /return to sender"},
    {id : "2", label : "Rec'd mail return not deliverable as addressed, unable to forward, return to sender"},
    {id : "3", label : "Rec'd mail return insufficient address unable to forward"},
    {id : "4", label : "Rec'd mail return no such number unable to forward return to sender"},
    {id : "5", label : "Rec'd mail return no such address unable to forward"},
    {id : "6", label : "Rec'd mail return no such street unable to forward"},
    {id : "7", label : "Rec'd mail return no such number unable to forward"},
    {id : "8", label : "Rec'd mail return attempted not known unable to forward"},
    {id : "9", label : "Rec'd mail return vacant unable to forward"},
    {id : "10", label : "Rec'd mail return insufficient address unable to forward"},
    {id : "11", label : "Rec'd mail return forward time expired unable to forward"},
    {id : "12", label : "Rec'd mail return box closed unable to forward, return to sender"},
    {id : "13", label : "Rec'd mail return unclaimed, unable to forward"},
    {id : "14", label : "Rec'd mail return no mail receptacle, unable to forward"},
    {id : "15", label : "Rec'd mail return refused unable to forward return to sender"},
    {id : "16", label : "Mail return unable to forward"},
    {id : "17", label : "mail return in dispute return to sender"},
    {id : "18", label : "new address updated re-requested letterper usps new address to foward/ updated in ada / re-requested letter"},
    {id : "19", label : "mcd1, //as"},
    {id : "20", label : "per usps new address to foward// updated in ada"},
    {id : "21", label : "Rec'd mail return, return to sender-utf, unable to forward"},
    {id : "22", label : "Rec'd mail return to sender, deceased, unable to forward"},
    {id : "23", label : "Rec'd return mail, returned for better address, unable to forward"},
    {id : "24", label : "Rec'd return mail, return to sender in dispute, unable to forward"},
    {id : "25", label : "Rec'd return mail, return to sender, illegible, unable to forward"},
    {id : "26", label : "Rec'd mail return, unable to deliver as addressed"},
    {id : "27", label : "Rec'd mail return box closed unable to forward return to sender"},
    {id : "28", label : "Rec'd mail return no such number unable to forward, return to sender"},
    {id : "29", label : "Rec'd mail return deceased unable to forward return to sender"},
    {id : "30", label : "Rec'd MAIL RETURN unable to forward RETURN TO SENDER"},
    {id : "31", label : "Rec'd mail return refused unable to forward return to sender"},
    {id : "32", label : "Rec'd mail return unclaimed return to sender"},
    {id : "33", label : "Rec'd mail return in dispute unable to forward"},
    {id : "34", label : "Rec'd mail return box closed unable to forward return to sender"},
    {id : "35", label : "Rec'd mail return forward time exp return to sender"}
  ];

  constructor(
    public datepipe: DatePipe,
    private modalService: MatDialog,
    private formBuilder: UntypedFormBuilder, 
    private _NoteService : NoteService,
    private _LetterQService : LetterQService,
    private _StatusService : StatusService,
    private loginService: LoginService ,
    private accountService: AccountService  
  ) { }

  ngOnInit(): void {
    this.LoadAction();
    this.LoadStatus();
    this.LoadAccount(this.inAcctID);
    this.addNoteFormGroup.patchValue({
      acctID : this.inAcctID
      // formControlName2: myValue2 (can be omitted)
    });
  }

  public LoadStatus(): void{
    this._Status = []; 
    this._StatusService.List().subscribe({
      next: (data : Status[]) => { 
        //console.log(data);
        this._Status = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }
  
  

  public ChangeAction(code : string): void{
    if (this._Action.length > 0){
      let actionLocal = this._Action.filter(x => x.actionCode == code);
      if (actionLocal.length > 0 && actionLocal[0].note){
        this.EditStatus = (actionLocal[0].status ?? "") !="";
        this.addNoteFormGroup.patchValue({
          noteText : actionLocal[0].note, 
          statusCode : actionLocal[0].status,
          acctID : this.inAcctID,
          EditStatus : this.EditStatus
          // formControlName2: myValue2 (can be omitted)
        });
        let noteFG = this.addNoteFormGroup.value;
        //console.log(noteFG);
        //console.log(noteFG.noteText);
      }

    }
  }
  public LoadAccount(id : string): void{
    this.accountService.Get(id).subscribe({
      next: (data : Account) => { 
        //console.log(data);
        this.objAccount = data;
        if (!this.objAccount.address1){
          this.checkBoxSendLetterMsn += "Not address<br>";
        }
        if (!this.objAccount.zip){
          this.checkBoxSendLetterMsn += "Not Zip Code<br>";
        }
        if (!this.objAccount.city){
          this.checkBoxSendLetterMsn += "Not City<br>";
        }
        if (!this.objAccount.state){
          this.checkBoxSendLetterMsn += "Not state<br>";
        }
        
        if (this.objAccount.address1?.toLocaleLowerCase().includes("homeless")){
          this.checkBoxSendLetterMsn += "Homeless<br>";
        }
        this.checkBoxSendLetterEnable = this.checkBoxSendLetterMsn == "";
      },
      error: (err : string) => { console.error(err); }
    });
  }
  
  
  public LoadAction(): void{
    this._Action = []; 
    this._LetterQService.ListAction().subscribe({
      next: (data : Action[]) => { 
        //console.log(data);
        this._Action = data;
      },
      error: (err : string) => { console.error(err); }
    });
  }

  saveNote(theNote : Note){
    this._NoteService.Create(theNote).subscribe({
      next: (data : Note) => { 
        //console.log(JSON.stringify(data));
        //this.modalService.closeAll();
       },
      error: (err : string) => { console.error(err); }
    });
  }
  
  saveAccount(theAccount : Account){
    this.accountService.Edit(theAccount).subscribe({
      next: (data : Account) => { 
        //this.modalService.closeAll();
       },
      error: (err : string) => { console.error(err); }
    });
  }

  SaveLetterQ(theLetterQ : LetterQ){
    this._LetterQService.Create(theLetterQ).subscribe({
      next: (data : LetterQ) => {         
       },
      error: (err : string) => { console.error(err); }
    }); 
  }

  SubmitNote(){
    let noteFG = this.addNoteFormGroup.value;
    this.objNote = new Note();
    if (noteFG.noteText ?? "" != ""){
      this.objNote.acctID = noteFG.acctID;
      this.objNote.noteDate = new Date();
      this.objNote.noteText = noteFG.noteText;
      this.objNote.upload = false;
      this.objNote.userName = this.loginService.getUser().loginID;    
      this.saveNote(this.objNote);
    }
    if (noteFG.isCheked){
      this.objLetterQ.acctID = noteFG.acctID;
      this.objLetterQ.letterCode =noteFG.letterCode;
      this.objLetterQ.letterDate = noteFG.letterDate;
      this.objLetterQ.userName = this.loginService.getUser().loginID;
      this.SaveLetterQ(this.objLetterQ);
      let latest_date =this.datepipe.transform(this.letterDate, 'MM/dd/yyyy');
      this.objNote.noteText = noteFG.letterCode + " LETTER REQUESTED FOR" + latest_date;
      //this.saveNote(this.objNote);
    }
    if (noteFG.EditStatus && (noteFG.statusCode ?? "") != ""){
      this.LoadAccount(this.inAcctID);
      let latest_date =this.datepipe.transform(this.letterDate, 'MM/dd/yyyy');
      this.objNote.noteText = this.objAccount.statusCode + " STATUS CHANGED FROM " + " TO " + noteFG.statusCode;
      this.objAccount.statusCode = noteFG.statusCode;
      //console.log(noteFG.statusCode);
      this.saveAccount(this.objAccount);
      this.saveNote(this.objNote);
    }
    this.modalService.closeAll();
  }
  setMailRetunred(completed: boolean) {
    this.MailRetunred = completed;
  }
  public ChangeMailOption(code : string): void{
    //console.log(code);
    
    if (this.MailReturnedOptions.length > 0){
      let actionLocal = this.MailReturnedOptions.filter(x => x.id == code);
      if (actionLocal.length > 0 && actionLocal[0].label){
        this.addNoteFormGroup.patchValue({
          noteText : actionLocal[0].label
          // formControlName2: myValue2 (can be omitted)
        });
        let noteFG = this.addNoteFormGroup.value;
        //console.log(noteFG);
        //console.log(noteFG.noteText);
      }

    }
  }
  
  setSndLetter(completed: boolean) {
    this.sendLetter = completed;
    if (completed){
      this.lstLetter = [];
      this._LetterQService.ListLetter().subscribe({
        next: (data : Letter[]) => { 
          //console.log(data);
          this.lstLetter = data;
        },
        error: (err : string) => { console.error(err); }
      });
    }
  }

  
  setEditStatus(completed: boolean) {
    this.EditStatus = completed;
  }
  

}


