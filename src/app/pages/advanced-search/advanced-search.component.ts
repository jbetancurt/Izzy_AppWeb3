import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  public OpenInfo = false;
  public modAcctID = "";
  public displayAccount = false;
  setAcctID(vAcctID: string) {
    this.modAcctID = vAcctID;
    this.displayAccount = !this.displayAccount;
    this.OpenInfo = this.displayAccount;
    //this.displayAccount = true;
    console.log(vAcctID + "  setAcctID") ;
  }

  constructor() { }
  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  ngOnInit(): void {
  }

}
