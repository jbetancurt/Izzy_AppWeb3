import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicklerComponent } from './tickler.component';

describe('TicklerComponent', () => {
  let component: TicklerComponent;
  let fixture: ComponentFixture<TicklerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicklerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
