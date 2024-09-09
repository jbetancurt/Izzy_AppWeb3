import { Component, OnInit, ViewChild } from '@angular/core';
import { Client, ClientService } from 'src/app/components/client';
import { Letter, LetterQService, RepLetterQ } from 'src/app/components/letter-q';
import { MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-process-letter',
  templateUrl: './process-letter.component.html',
  styleUrls: ['./process-letter.component.scss']
})
export class ProcessLetterComponent implements OnInit {
  titulo = 'Proccess Letter';
  dataSource!: MatTableDataSource<RepLetterQ>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'ClientName',
    'acctID',
    'clientRef1',
    'ptLast',
    'ptFirst',
    'ptMiddle',
    'ptAddress1',
    'ptAddress2',
    'ptCity',
    'ptState',
    'ptZip',
    'gULast',
    'guFirst',
    'guMiddle',
    'guAddress1',
    'guAddress2',
    'guCity',
    'guState',
    'guZip',
    'admit',
    'disch',
    'balance',
    'miscDate1',
    'promiseAmt',
    'promiseDate',
    'iDNumber',
    'miscText1',
    'letterCode',
    'interest',
    'project',
    'userName',
    'userExt',
    'alphaStart',
    'alphaEnd'
  ];
  _Clients : Client[] = [];
  _Letter : Letter[] = [];
  _RepLetterQ : RepLetterQ[] = [];
  _blobFile : Blob = new Blob;
  ZipMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
  page = 1;
  pageSize = 10;
  collectionSize : number =0;
  constructor(
    private _ClientService : ClientService, 
    private _LetterQService : LetterQService
    ) { }

  ngOnInit(): void {
    this.loadClient();
    this.loadListLetter();
  }
  loadClient(): void{
    
    this._LetterQService.ListClient().subscribe(
      data => {
        this._Clients = data;
      },
      err => {
        console.error(err);
      }
    );
  }
  loadListLetter(): void{
    
    this._LetterQService.ListLetter().subscribe(
      data => {
        this._Letter = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  loadReportQ(clientCode : string, LetterCode :string): void{
    if (LetterCode != ""){
      
      this._LetterQService.Rep(clientCode, LetterCode).subscribe(
        data => {
          this._RepLetterQ = data;
          this.dataSource = new MatTableDataSource(data);
          this.collectionSize = this._RepLetterQ.length;
        },
        err => {
          console.error(err);
        }
      );
      
    }
  }
  

  DownloadReportQ(clientCode : string, LetterCode :string): void{
    if (clientCode != "" && LetterCode != ""){
      
      this._LetterQService.download(clientCode, LetterCode).subscribe({
        next: (data : any) => { 
          this._blobFile  = new Blob([data], { type: "application/csv" });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(this._blobFile);
          link.download = clientCode.trim() + "  " + LetterCode.trim() + ".csv";
          //console.log(link.download);
          link.click();
        
        
  
          
        },
        error: (err : string) => { console.error(err); }
      }
      );

    }
  }

}
