import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {delay} from 'rxjs/operators';
import { LoadingIndicatorService } from '../loading-indicator.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent    {
  isBusy = false;
  subscription :any = null;
  spinnerActive = false;

  constructor(
    public spinnerHandler: LoadingIndicatorService,
    private cdr: ChangeDetectorRef
  ) {
  }
  
  ngOnInit(): void {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
    this.cdr.detectChanges();
  };
  
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

}
