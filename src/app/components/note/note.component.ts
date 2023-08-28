import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LetterQ, LetterQService } from '../letter-q';
import { Note, NoteService, NoteEditComponent } from './';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  newLetterQ : LetterQ = new LetterQ;
  displayedColumns: string[] = ['noteID', 'acctID', 'noteText', 'noteDate','userName'];
  @Input() inAcctID : string = "";
  dataSource!: MatTableDataSource<Note>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _Notes : Note[] = [];

  constructor(
    private _NoteService : NoteService,
    private modalService: MatDialog,
    private _LetterQService : LetterQService
  ) { }

  ngOnInit(): void {
    this.GetNotes(this.inAcctID);
  }
  public GetNotes(acctID : string): void{
    this._Notes = []; 
    this._NoteService.List(acctID).subscribe({
      next: (data : Note[]) => { 
        this._Notes = data;
        this.dataSource = new MatTableDataSource(data);
        if (data != null && data.length > 0){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;          
        }
      },
      error: (err : string) => { console.error(err); }
    });
  }
  openNewNote(){
    const dialogRef = this.modalService.open(NoteEditComponent, {
      width: '80%',
    });
    dialogRef.componentInstance.inAcctID = this.inAcctID;

    dialogRef.afterClosed().subscribe(result => {
      this.GetNotes(this.inAcctID);
      console.log(`Dialog result: ${result}`);
    });
  }

}
