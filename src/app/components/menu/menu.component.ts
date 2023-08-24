import { Component, Input, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() inTipoMenu: number = 0;
  listMenu1 : Menu[] = this.menuService.MenusXIdPadre(1);
  listMenu3 : Menu[] = this.menuService.MenusXIdPadre(3);
  listMenu4 : Menu[] = this.menuService.MenusXIdPadre(4);
  listMenu7 : Menu[] = this.menuService.MenusXIdPadre(7);

  constructor(public menuService : MenuService ) { }

  ngOnInit(): void {
  }

}
