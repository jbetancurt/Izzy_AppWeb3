import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { LetterQ, LetterQService } from '.';

@Component({
  selector: 'app-letter-q',
  templateUrl: './letter-q.component.html',
  styleUrls: ['./letter-q.component.css']
})
export class LetterQComponent implements OnInit {
  _LetterQ : LetterQ[] = [];
  displayedColumns: string[] = ['requestID', 'letterCode', 'acctID', 'letterDate','userName'];
  @Input() inAcctID : string = "";
  dataSource!: MatTableDataSource<LetterQ>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private modalService: MatDialog,
    private _LetterQService : LetterQService
  ) { }

  ngOnInit(): void {
    this.LetterQ(this.inAcctID);
    console.log(this.inAcctID);
  }
  public LetterQ(acctID : string): void{
    this._LetterQ = []; 
    this._LetterQService.List(acctID).subscribe({
      next: (data : any) => { 
        this._LetterQ = data;
        this.dataSource = new MatTableDataSource(data);
        if (data != null && data.length > 0){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;          
        }
      },
      error: (err : string) => { console.error(err); }
    });
  }

}
