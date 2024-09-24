import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from './components/loader/loader.service';
import { LoginService } from './components/login';
import { delay } from 'rxjs';
import { CdkDrag, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { MenuService } from './components/menu';
import { Account, AccountService } from './components/account';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('floatingAdvancedSearch') floatingAdvancedSearch!: ElementRef;
  @ViewChild('floatingViewInfo') floatingViewInfo!: ElementRef;
  @ViewChild('dragAdvancedSearch') dragAdvancedSearch!: CdkDrag;
  @ViewChild('dragViewInfo') dragViewInfo!: CdkDrag;

  @ViewChild('drawerLeft') drawerLeft!: MatSidenav;
  @ViewChild('drawerRight') drawerRight!: MatSidenav;
  @HostBinding('class') className = '';
  
  toggleControl = new FormControl(false);
  tabs: Account[] = [];
  selected = new FormControl(0);
  zIndexSerial: number = 0;
  modAcctID = "";
  dragPositionProcessWQ = { x: 0, y: 0 };
  dragPositionAdvanceSearch = { x: 0, y: 0 };
  dragPositionAccountInfo1 = { x: 0, y: 0 };
  showProcessWQ = false;
  showAccountInfo1 = false;
  disableshowProcessWQ = false;
  disableshowAccountInfo1 = false;
  disableshowAdvanceSearch = false;
  zIndexSerialn: string = "0";
  opendSearch = 'true';
  loading$ = this.loader.loading$.pipe(delay(0));
  title = 'ADA App';

  //-------------------agrega julian-------------------//
  showAdvancedSearch = false;
  showAdvancedSearchViewInfo = false;
  isMinimizedAdvancedSearch = false;
  isMinimizedViewInfo = false;
  initialPosition = { top: 10, left: 177 };
  finalPosition: { top: number, left: number } | null = null;

  // Variables para manejar arrastre manual
  initialX = 0;
  initialY = 0;
  offsetX = 0;
  offsetY = 0;

  public VarNombreUser = this.loginService.getUser().domainUserName ?? this.loginService.getUser().loginID ?? "";
  public isLogged = this.loginService.IsSingned();

  constructor(
    public menuService: MenuService,
    public accountService: AccountService,
    private cdr: ChangeDetectorRef,
    public loader: LoaderService,
    public loginService: LoginService
  ) { }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });
    this.menuService.outshowProcessWQ.subscribe((value: boolean) => {
      this.drawerLeft.open();
    });

    this.menuService.outshowAdvanceSearch.subscribe(() => {
      this.openAdvancedSearch();
    });

    this.accountService.accountEmit.subscribe((value: Account) => {
      this.openAdvancedSearchViewInfo();
      this.dragPositionAccountInfo1 = { x: 0, y: 0 };
      this.tabs.push(value);
      if (value.clientRef1 != null) {
        this.showAccountInfo1 = true;
        this.drawerLeft.close();
        this.drawerRight.close();
      }
    });

    this.setupDragEvents();
  }

  setupDragEvents(): void {
    const element = this.floatingAdvancedSearch.nativeElement;

    // Event listener para el mouse down
    element.addEventListener('mousedown', (e: MouseEvent) => {
      this.initialX = e.clientX - this.offsetX;
      this.initialY = e.clientY - this.offsetY;
      this.offsetX = element.getBoundingClientRect().left;
      this.offsetY = element.getBoundingClientRect().top;
    });

    // Event listener para el mouse move
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const currentX = e.clientX - this.initialX;
      const currentY = e.clientY - this.initialY;

      element.style.transform = `translate(${currentX}px, ${currentY}px)`;

      const finalPosition = {
        top: element.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left
      };
      console.log("Posición final:", finalPosition);
    });

    // Listener para actualizar la posición al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
      this.offsetX = element.getBoundingClientRect().left;
      this.offsetY = element.getBoundingClientRect().top;
    });
  }

  onDragStarted(event: CdkDragStart): void {
    const element = event.source.element.nativeElement as HTMLElement;

    this.initialPosition = {
      top: element.getBoundingClientRect().top,
      left: element.getBoundingClientRect().left
    };

    console.log('Arrastre iniciado. Posición inicial actualizada:', this.initialPosition);
  }

  onDragEnded(event: CdkDragEnd, windowType: string): void {
    const element = event.source.element.nativeElement as HTMLElement;

    const finalPosition = {
      top: element.getBoundingClientRect().top,
      left: element.getBoundingClientRect().left
    };

    /*const distanceMoved = finalPosition.top - this.initialPosition.top;
    const minimizationThreshold = 500;
    if (distanceMoved > minimizationThreshold) {
      this.minimizeWindow(windowType);
    }*/
  }

  openAdvancedSearch(): void {
    this.showAdvancedSearch = true;
    //this.isMinimizedAdvancedSearch = false;
    setTimeout(() => {
      this.resetWindowPosition('advancedSearch');
    }, 0);
  }

  openAdvancedSearchViewInfo(): void {
    this.showAdvancedSearchViewInfo = true;
    //this.isMinimizedViewInfo = false;
    setTimeout(() => {
      this.resetWindowPosition('viewInfo');
    }, 0);
  }

  closeAdvancedSearch(): void {
    this.showAdvancedSearch = false;
    this.isMinimizedAdvancedSearch = false;
  }

  closeAdvancedSearchViewInfo(): void {
    this.showAdvancedSearchViewInfo = false;
    this.isMinimizedViewInfo = false;
  }

  minimizeWindow(windowType: string): void {
    if (windowType === 'advancedSearch') {
      //this.showAdvancedSearch = false;
      this.isMinimizedAdvancedSearch = true;
    } else if (windowType === 'viewInfo') {
      //this.showAdvancedSearchViewInfo = false;
      this.isMinimizedViewInfo = true;
    }
  }

  restoreWindow(windowType: string): void {
    let element: HTMLElement;
  
    if (windowType === 'advancedSearch') {
      //this.showAdvancedSearch = true;
      this.isMinimizedAdvancedSearch = false;
      //element = this.floatingAdvancedSearch.nativeElement;
    } else if (windowType === 'viewInfo') {
      //this.showAdvancedSearchViewInfo = true;
      this.isMinimizedViewInfo = false;
      //element = this.floatingViewInfo.nativeElement;
    }
  
    setTimeout(() => {
      if (element) {
        // Obtener las dimensiones de la ventana y de la pantalla
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
  
        console.log('Dimensiones del elemento:', {
          width: elementWidth,
          height: elementHeight
        });
  
        console.log('Dimensiones de la pantalla:', {
          width: screenWidth,
          height: screenHeight
        });
  
        // Calcular posición centrada
        const top = (screenHeight - elementHeight) / 2;
        const left = (screenWidth - elementWidth) / 2;
  
        console.log('Posición calculada (centrada):', { top, left });
  
        // Restaurar la ventana a la posición centrada
        element.style.transform = 'none'; // Quitar cualquier transformación previa
        element.style.top = `${top}px`; // Ajustar la posición vertical centrada
        element.style.left = `${left}px`; // Ajustar la posición horizontal centrada
        element.style.position = 'absolute';
  
        console.log('Posición aplicada al elemento (top y left):', {
          top: element.style.top,
          left: element.style.left
        });
  
        // Forzar el recalculo del rectángulo del elemento después de reposicionar
        const rect = element.getBoundingClientRect();
  
        console.log('Posición recalculada con getBoundingClientRect:', {
          top: rect.top,
          left: rect.left
        });
  
        
      }
    }, 300);
  }
  
  
  

  resetWindowPosition(windowType: string): void {
    let element: HTMLElement;
    let dragInstance: CdkDrag;

    if (windowType === 'advancedSearch') {
      element = this.floatingAdvancedSearch.nativeElement;
      dragInstance = this.dragAdvancedSearch;
    } else {
      element = this.floatingViewInfo.nativeElement;
      dragInstance = this.dragViewInfo;
    }

    element.style.top = `${this.initialPosition.top}px`;
    element.style.left = `${this.initialPosition.left}px`;
    element.style.position = 'absolute';

    dragInstance.reset();
  }

  validateString(value?: number): string {
    return value?.toString() ?? "";
  }

  closeshowProcessWQ() {
    this.drawerLeft.close();
  }

  closeshowAccountInfo1() {
    this.showAccountInfo1 = false;
    this.drawerLeft.close();
    this.drawerRight.close();
  }

  closeshowAdvanceSearch() {
    this.drawerRight.close();
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
}
