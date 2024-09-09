import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment, PaymentService } from '.';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() inAcctID : string = "";
  _Payments : Payment[] = [];
  pagePayment = 1;
  pageSizePayment = 10;
  collectionSizePayment: number = 0;
  dataSource!: MatTableDataSource<Payment>;
  displayedColumns: string[] = ['paymentID', 'acctID', 'postDate', 'remitDate','payerName','paymentType','amount', 'fee', 'note'];

  constructor(
    private paymentService : PaymentService
  ) { }

  ngOnInit(): void {
    //console.log(this.inAcctID)
    this.LoadPayment(this.inAcctID);
  }
  public LoadPayment(acctID : string): void{
    this.paymentService.List(acctID).subscribe({
      next: (data : Payment[]) => { 
        this._Payments = data;
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
