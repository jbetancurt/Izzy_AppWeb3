import { ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from './components/loader/loader.service';
import { LoginService } from './components/login';
import { delay } from 'rxjs';
import {CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { MenuService } from './components/menu';
import { Account, AccountService } from './components/account';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {  
  @ViewChild('drawerLeft') drawerLeft!: MatSidenav;
  @ViewChild('drawerRight') drawerRight!: MatSidenav;
  @HostBinding('class') className = '';  
  toggleControl = new FormControl(false);
  tabs : Account[] = [];
  selected = new FormControl(0);
  zIndexSerial: number = 0;
  modAcctID = "";
  dragPositionProcessWQ = {x: 0, y: 0};
  dragPositionAdvanceSearch = {x: 0, y: 0};
  dragPositionAccountInfo1 = {x: 0, y: 0};
  showProcessWQ = false;
  showAccountInfo1 = false;
  showAdvanceSearch = false;
  disableshowProcessWQ = false;
  disableshowAccountInfo1 = false;
  disableshowAdvanceSearch = false;
  zIndexSerialn: string = "0";
  opendSearch = 'true';
  loading$ = this.loader.loading$.pipe(delay(0));
  title = 'ADA App';
  public VarNombreUser = this.loginService.getUser().domainUserName ?? this.loginService.getUser().loginID ?? "";
  public isLogged = this.loginService.IsSingned();
  constructor(
    public menuService : MenuService,
    public accountService : AccountService,
    private cdr: ChangeDetectorRef,
    public loader: LoaderService,
    public loginService : LoginService
  ) {}
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  onDragStarted(event: CdkDragStart): void {
    //if (this.zIndexSerial > Number(event.source.element.nativeElement.style.zIndex))
    //event.source.element.nativeElement.style.zIndex=this.zIndexSerial+"";
    this.zIndexSerial = this.zIndexSerial+1;
    setTimeout(() => {
      event.source.element.nativeElement.style.zIndex = this.zIndexSerial + "";
    });
  }

  

  ngOnInit(): void {
    
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });
    this.menuService.outshowProcessWQ.subscribe((value : boolean) => {
      this.drawerLeft.open();
    });
    
    this.menuService.outshowAdvanceSearch.subscribe((value : boolean) => {
      this.dragPositionAdvanceSearch = {x: 0, y: 0 };
      this.drawerRight.open();
    });

    
    
    this.accountService.accountEmit.subscribe((value : Account) => {
     this.dragPositionAccountInfo1 = {x: 0, y: 0 };
     this.tabs.push((value));
     if (value.clientRef1 != null){
      this.showAccountInfo1 = true;
      this.drawerLeft.close();
      this.drawerRight.close();

     }
    });
  }
  validateString(value? :number) : string{
    return (value?.toString() ?? "");
  }

  closeshowProcessWQ(){
    this.drawerLeft.close();
  }
  closeshowAccountInfo1(){
    this.showAccountInfo1 = false;
    this.drawerLeft.close();
    this.drawerRight.close();
  }
  closeshowAdvanceSearch(){
    this.drawerRight.close();
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
}
