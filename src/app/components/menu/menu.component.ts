import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';
import { LoginService } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() outshowProcessWQ: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() inTipoMenu: number = 0;
  listMenu1 : Menu[] = this.menuService.MenusXIdPadre(1);
  listMenu3 : Menu[] = this.menuService.MenusXIdPadre(3);
  listMenu4 : Menu[] = this.menuService.MenusXIdPadre(4);
  listMenu7 : Menu[] = this.menuService.MenusXIdPadre(7);

  constructor(public menuService : MenuService,
    public loginService : LoginService,
    public router: Router ) { }

  ngOnInit(): void {
  }

  /**
   * name
   */
  public async ActionSelector(value : string) : Promise<void> {
    if (value === "Exit"){
      await this.loginService.signOut();
    }
    else if (value === "/Hospital/ProcessWorkQComponent"){
      this.menuService.EmitShowProcessWQ();
    }
    else if (value === "/Hospital/AdvancedSearchComponent"){
      
      this.menuService.EmishowAdvanceSearch();
    }
    else{      
      const categories$ = await this.router.navigate([value]);
    }
    
  }

}
