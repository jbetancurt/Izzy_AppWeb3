import { EventEmitter, Injectable, Output } from '@angular/core';
import { Menu } from '.';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  @Output() outshowProcessWQ: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() outshowAdvanceSearch: EventEmitter<boolean> = new EventEmitter<boolean>();
  lstMenu : Menu[] = [
    {id : 1, idPadre : 0, name : "File", value : ""},
    {id : 2, idPadre : 0, name : "Edit", value : ""},
    {id : 3, idPadre : 0, name : "Tools", value : ""},
    {id : 4, idPadre : 0, name : "Hospital", value : ""},
    {id : 5, idPadre : 0, name : "Process", value : ""},
    {id : 6, idPadre : 0, name : "Reports", value : ""},
    {id : 7, idPadre : 0, name : "Administration", value : ""},
    {id : 8, idPadre : 1, name : "Disable Idle Lockout", value : ""},
    {id : 9, idPadre : 1, name : "Change Password", value : "/File/ChangePasswordComponent"},
    {id : 10, idPadre : 1, name : "Exit", value : "Exit", isAction : true},
    //{id : 11, idPadre : 2, name : "Copy", value : ""},
    {id : 12, idPadre : 3, name : "Import Accounts", value : "/Tools/ImportAccountsComponent"},
    {id : 13, idPadre : 3, name : "Medifax Export", value : "/Tools/MedifaxExportComponent"},
    {id : 14, idPadre : 3, name : "Process Letter", value : "/Tools/ProcessLetterComponent"},
    {id : 15, idPadre : 4, name : "Tickler", value : "/Hospital/TicklerComponent"},
    {id : 16, idPadre : 4, name : "Process Work Q", value : "/Hospital/ProcessWorkQComponent"},
    {id : 17, idPadre : 4, name : "Advanced Search", value : "/Hospital/AdvancedSearchComponent"},
    {id : 18, idPadre : 4, name : "Client Ref Search", value : "/Hospital/ClientRefSearchComponent"},
    //{id : 19, idPadre : 5, name : "Process 1", value : ""},
    //{id : 20, idPadre : 6, name : "Reports 1", value : ""},
    //{id : 21, idPadre : 6, name : "Reports 2", value : ""},
    {id : 22, idPadre : 7, name : "Pages", value : "/Administration/PagesComponent"},
    //{id : 23, idPadre : 7, name : "Mapper Clients", value : ""},
    //{id : 24, idPadre : 7, name : "Roles", value : ""},
    {id : 25, idPadre : 7, name : "Users", value : "/Administration/UsersComponent"}
  ];

  constructor(
    
  ) { }

  public EmitShowProcessWQ(){
    this.outshowProcessWQ.emit(true);
  }
  public EmishowAdvanceSearch(){
    this.outshowAdvanceSearch.emit(true);
  }
  
  public MenusXIdPadre(idPadre : number): Menu[]{    
    return this.lstMenu.filter(
      m => m.idPadre === idPadre);
  }
  public NombresMenusXIdPadre(idPadre : number): string{   
    var Menus =  this.lstMenu.filter(
      m => m.idPadre === idPadre);
    if (Menus.length > 0){
      return "menu" + Menus[0].idPadre.toString();
    }
    return "menu0";
  }

}
